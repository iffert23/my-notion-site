# Reject, Deny, Drop 차이

---

Reject : 요청에 대한 거부/불가패킷 날려줌

Drop=Deny : 요청 거부/불가패킷 그런거 없음. 걍 차단

Reject 응답

TCP : RST Flag 이용 (Reset. 바로 연결해제)

ICMP(UDP) : ICMP 응답코드 사용

대표적→ 0(echo reply), 3(destination unreachable), 4(source quench), 11(time exceeded)

- 참고
    
    [https://www.uname.in/51](https://www.uname.in/51)