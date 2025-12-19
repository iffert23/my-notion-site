import fs from "fs";
import path from "path";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

function log(...args) {
  console.log("[sync]", ...args);
}

// "64fbd567186948089d9f01855a0a7954" 처럼 하이픈 없는 값도 들어오므로 정규화
function normalizeNotionId(id) {
  if (!id) return null;

  // 사용자가 실수로 "영위키_64fb..." 같은 걸 넣은 케이스 방지
  // 마지막 32자리 hex만 뽑아냄
  const m = String(id).match(/[0-9a-fA-F]{32}/);
  const hex32 = m ? m[0].toLowerCase() : null;
  if (!hex32) return null;

  // Notion API는 UUID 형태(하이픈 포함)도 받지만, 32자리도 받습니다.
  // 여기서는 32자리 그대로 사용(안전)
  return hex32;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function titleToSlug(title) {
  // 간단 슬러그(한글도 그대로 폴더/파일명으로 가능하지만, URL 깔끔하게 하려면 변환 추천)
  // 여기서는 한글 유지 + 공백만 - 처리
  return String(title).trim().replace(/\s+/g, "-");
}

// 제외할 페이지(요청: 미팅/교육, 프로젝트 제외)
function shouldExcludeByTitle(title) {
  const t = String(title || "").trim();
  return t === "미팅,교육" || t === "프로젝트";
}

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const ROOT_PAGE_ID = normalizeNotionId(process.env.NOTION_ROOT_PAGE_ID);

if (!NOTION_TOKEN) throw new Error("NOTION_TOKEN 이 없습니다. GitHub Secrets에 추가해 주세요.");
if (!ROOT_PAGE_ID) throw new Error("NOTION_ROOT_PAGE_ID 가 없거나 형식이 잘못되었습니다(32자리 Notion ID 필요).");

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const OUT_DIR = path.join(process.cwd(), "_docs");
ensureDir(OUT_DIR);

async function getPageTitle(pageId) {
  // ✅ pageId는 함수 인자로 이미 정의되어 있음 → 여기서부터 로그 가능
  log("pages.retrieve", pageId);

  const page = await notion.pages.retrieve({ page_id: pageId });

  // title 꺼내기(일반 페이지)
  const titleProp = Object.values(page.properties || {}).find(
    (p) => p.type === "title"
  );
  const title =
    titleProp?.title?.map((t) => t.plain_text).join("")?.trim() || "Untitled";

  return title;
}

async function exportPageToDocs(pageId, title) {
  const safeTitle = title || (await getPageTitle(pageId));
  const slug = titleToSlug(safeTitle);

  // ✅ 로그는 slug/경로 계산 후 찍는 게 의미 있음
  const outPath = path.join(OUT_DIR, `${slug}.md`);
  log("export", { pageId, title: safeTitle, outPath });

  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  // Jekyll front-matter
  const frontMatter = `---\nlayout: page\ntitle: "${safeTitle.replaceAll('"', '\\"')}"\n---\n\n`;

  fs.writeFileSync(outPath, frontMatter + mdString.parent, "utf-8");
}

async function getChildPagesOfRoot(rootPageId) {
  // 루트 페이지 블록 children 조회
  log("blocks.children.list", rootPageId);

  const children = await notion.blocks.children.list({
    block_id: rootPageId,
    page_size: 100,
  });

  // child_page / child_database만 추림
  const pages = [];
  const dbs = [];

  for (const b of children.results) {
    if (b.type === "child_page") pages.push(b);
    if (b.type === "child_database") dbs.push(b);
  }

  return { pages, dbs };
}

async function exportChildDatabase(databaseId) {
  // ✅ databaseId가 여기서 정의되므로 여기서 로그
  log("databases.query", databaseId);

  const res = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
  });

  // DB 안의 각 페이지를 md로 내보내기
  for (const row of res.results) {
    const pageId = normalizeNotionId(row.id);
    if (!pageId) continue;

    const title = await getPageTitle(pageId);
    if (shouldExcludeByTitle(title)) {
      log("skip(database row)", { title, pageId });
      continue;
    }

    await exportPageToDocs(pageId, title);
  }
}

async function main() {
  log("start", { ROOT_PAGE_ID });

  // 1) 루트 페이지 직속 child_page export
  const { pages, dbs } = await getChildPagesOfRoot(ROOT_PAGE_ID);

  for (const p of pages) {
    const pageId = normalizeNotionId(p.id);
    if (!pageId) continue;

    const title = await getPageTitle(pageId);
    if (shouldExcludeByTitle(title)) {
      log("skip(page)", { title, pageId });
      continue;
    }

    await exportPageToDocs(pageId, title);
  }

  // 2) 루트 직속 child_database export
  for (const d of dbs) {
    const databaseId = normalizeNotionId(d.id);
    if (!databaseId) continue;

    await exportChildDatabase(databaseId);
  }

  log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
