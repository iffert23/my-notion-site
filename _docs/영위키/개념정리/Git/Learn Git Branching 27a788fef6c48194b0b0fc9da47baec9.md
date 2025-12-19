# Learn Git Branching

---

- **참고**
    
    [https://learngitbranching.js.org/?locale=ko](https://learngitbranching.js.org/?locale=ko)
    
    *objective*
    

Gti Commit : 디렉토리에 있는 모든 파일에 대한 스냅샷 기록. 근데 커밋할때마다 디렉토리 전체를 복사하는건 아니고 저장소의 이전 버전과 다음 버전의 변경내역(delta라고 한다고 함)을 저장함. 

→ 커밋이라는건 수정된 지금의 바로 이전 버전을 저장해두는거임

Git Branch : 특정 커밋에 대한 참조래퍼런스임. 간단하게는 하나의 커밋과 그 부모 커밋들을 포함하는 작업 내역이고 내 작업을 자잘한 브랜치로 세분화해놓는 게 좋다고 함

git checkout [브랜치명] 명령어로 변경분 커밋하기 전에 새 브랜치로 이동함.

git branch [브랜치명]으로 새 브랜치 만듦

브랜치 합치기 → git merge [합쳐올 브랜치명] 

- `bugFix`라는 새 브랜치를 만듭니다
- `git checkout bugFix`를 입력해 `bugFix` 브랜치로 이동(checkout)합니다.
- 커밋 한 번 하세요
- `git checkout` 명령어를 이용해 `main`브랜치로 돌아갑니다
- 커밋 또 하세요
- `git merge` 명령어로 `bugFix`브랜치를 `main`에 합쳐 넣습니다.
    
    ![image.png](Learn%20Git%20Branching/image.png)
    

git rebase : 나눠져있는 다른 커밋을 한줄로 모아서 볼 수 있도록 함 

![image.png](Learn%20Git%20Branching/image%201.png)

git checkout C1; git checkout main; git commit; git checkout C2

그냥 git checkout C4정도만 해도 HEAD 보이더라.

상대 커밋은 강력한 기능인데, 여기서 두가지 간단한 방법을 소개하겠습니다.

- 한번에 한 커밋 위로 움직이는 `^`
- 한번에 여러 커밋 위로 올라가는 `~<num>`

git checkout main^ ← main 위에 있는 부모를 checkout