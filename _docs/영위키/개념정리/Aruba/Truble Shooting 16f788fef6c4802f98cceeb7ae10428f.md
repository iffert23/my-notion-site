# Truble Shooting

---

- 라이선스 업로드 실패
    - 문제 배경 : Ubuntu 18.04→20.04 업그레이드 이후 웹에서 라이선스 업로드 시 업로드 실패
    - 확인된 내용 : 20.04 버전으로 업그레이드 됐음에도 /disk/data/temp 경로의 소유자/그룹이 tomcat8로 존재
    - 조치방법 : `chown tomcat:tomcat /disk/data/temp` 명령 수행
    - 추가 확인 필요 : temp가 아닌 다른 디렉토리의 소유자와 그룹이 tomcat이 아니라 tomcat8이라고 되어있을 수 있음. 그럴 경우 조치방법대로 조치하면 됨.
    소유자/그룹 조회 방법 → `ls -al /disk/data`
- -
    - 문제 배경 : -
    - 확인된 내용 : -
    - 조치방법 : -
    - 추가 확인 필요 : -