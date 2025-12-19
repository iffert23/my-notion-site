# 사설 SSL 인증서 갱신

---

`@shell`

- v4.0~v5.0.32
`mv /disk/sys/conf/certs /disk/sys/conf/certs.old`
 ㄴ> mv 안된다면 `rm -rf`로 certs랑 certs.old 삭제하기
`/etc/init.d/procmon stop`
`/etc/init.d/httpd stop`
`/etc/init.d/httpd start
/etc/init.d/procmon start`
`kill -USR2 centerd`
—이후 웹 접속
- v5.0.34 이상
`센터# do cert-reissuance` 
`Are you sure to reissue certificate (y/N): y`  // 인증서 재발급 여부 선택
`Are you sure to backup existing certificate (Y/n): y`  // 기존 인증서 백업 여부
`Do you want to start service after reissue certificate? (Y/n): y`  // 서비스 재구동 여부 (httpd / syslogd / gdcid / radius 재구동됨)