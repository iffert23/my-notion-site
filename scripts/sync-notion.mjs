import fs from "fs";
import path from "path";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const startedAt = Date.now();
const log = (...args) => console.log(`[sync ${Math.floor((Date.now()-startedAt)/1000)}s]`, ...args);

const token = process.env.NOTION_TOKEN;
if (!token) throw new Error("NOTION_TOKEN is missing");

const cfg = JSON.parse(fs.readFileSync("notion-sync.json", "utf8"));
const ROOT = cfg.rootPageId;
const EX = (cfg.excludeTitles || []).map((x) => String(x));

const notion = new Client({ auth: token });
const n2m = new NotionToMarkdown({ notionClient: notion });

const outDir = path.join(process.cwd(), "_docs");
fs.mkdirSync(outDir, { recursive: true });

function frontMatter(title) {
  return `---\nlayout: page\ntitle: ${title}\n---\n\n`;
}

function slugify(title) {
  return title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-가-힣]/g, "")
    .toLowerCase();
}

function shouldExclude(title) {
  return EX.some((k) => title.includes(k));
}

log("pages.retrieve", pageId);
async function getPageTitle(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const props = page.properties || {};
  const titleProp = Object.values(props).find((p) => p.type === "title");
  const title = titleProp?.title?.map((t) => t.plain_text).join("") || "Untitled";
  return title;
}

async function listChildPages(blockId) {
  const pages = [];
  let cursor = undefined;
  
log("blocks.children.list", blockId);
  while (true) {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor
    });

    for (const b of res.results) {
      if (b.type === "child_page") {
        // child_page는 id 자체가 페이지 id로 사용 가능
        pages.push({ id: b.id, title: b.child_page.title });
      }
      // 하위 블록에 children이 있어도 그 안에 child_page가 있을 수 있어서 재귀 탐색
      if (b.has_children) {
        const nested = await listChildPages(b.id);
        pages.push(...nested);
      }
    }

    if (!res.has_more) break;
    cursor = res.next_cursor;
  }

  return pages;
}

async function exportPage(pageId, title) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const md = n2m.toMarkdownString(mdBlocks).parent;

  const slug = slugify(title);
  const file = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(file, frontMatter(title) + md, "utf8");
  console.log("Wrote", file);
  return slug;
}

(async () => {
  const rootTitle = await getPageTitle(ROOT);

  // 루트 페이지도 export(대문용으로 쓰고 싶으면 유지)
  if (!shouldExclude(rootTitle)) {
    await exportPage(ROOT, rootTitle);
  }

  const children = await listChildPages(ROOT);

  for (const p of children) {
    if (shouldExclude(p.title)) {
      console.log("Skip", p.title);
      continue;
    }
    await exportPage(p.id, p.title);
  }
})();
