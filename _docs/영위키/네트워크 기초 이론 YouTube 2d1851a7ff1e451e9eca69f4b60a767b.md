# 네트워크 기초 이론/YouTube

---

- **참고**
    
    [https://www.youtube.com/watch?v=Bz-K-DPfioE&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=20](https://www.youtube.com/watch?v=Bz-K-DPfioE&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=20)
    
    7강
    MTU : [https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-mtu/](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-mtu/)
    MSS : [https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-mss/](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-mss/)
    

1강

네트워크 OSI 7layer 는 외울 필요가 없다

프로그램단→ 유저, 프로세스

그밑에 커널단 TCP/IP 드라이버

그밑에 하드웨어 → NIC

**소켓** → TCP를 유저모드 어플리케이션 프로세스가 접근할 수 있도록 파일모드로 업그레이드 한 것

중요하대요 웨지 걍 무조건 암기하삼

마무리

냅다 OSI 7layer만 외우려고 애쓰지 말고 TCP/IP를 공부하삼

http 는 7계층

각 계층중에서 식별자가 있음

엑세스 → 맥주소

네트워크 → 아이피

전송단(티씨피) → 포트번호

*숙제 : 위 맥주소, 아이피, 전송단 식별자는 무엇을 위한 식별자인가? 
 ⇒ NIC에 대한 식별자*

2강

MAC주소 : NIC에 대한 식별자
*(MAC주소 변경가능…)*

NIC : 랜카드. 유선/무선
NIC에 IP주소를 여러 개 바인딩(연결)할 수 있음, 컴퓨터 한 대+아이피 여러 개 가능

IP주소 : host에 대한 식별자
*(host? : 인터넷에 연결된 컴퓨터)*

Port번호 : Process 식별자/Service 식별자/Interface 식별자

 

3강

host : 컴퓨터인데 네트워크에 연결되어 있는 컴퓨터.

- 네트워크 이용 주체인 host ⇒ End-point(단말)→peer, server, client
- 네트워크 자체인 host ⇒ Switch : (Router→경로설정), (F/W, IPS→보안스위치)

Network : internet = Router로 이루어진 거대한 집합체, 구성요소 : Router+DNS

4강

IP : host에 대한 식별자. → Internet Protocol

- IPv4 : 32bit ⇒ 43억개, 8bit
- IPv6 : 128bit

192.168.X.X/24 ⇒ host / netmask

5강

Port번호 : process(개발)/service(네트워크)/interface(하드웨어/인프라) 식별자

- 2^16 → 0~65535(0,65535는 쓰면 안됨) ⇒ 2^16-2개

6강

Switch → Switching(경로 선택)

: 여러 가지의 경로 중에서 하나를 골라 패킷을 목적지까지 도착하게 하는 역할

인터넷 경로 사이의 교차로지점=라우터

교차지점에서 목적지까지 효율적으로 가기 위해서 라우터끼리 정보교환을 하며 효율적인 경로를 찾아냄→스위칭→목적지 도착

이정표=라우팅테이블 ⇒경로선택의 근거

인터넷 = 거대한 라우터들의 집합

7강

데이터 단위 정리

User Application Process 단위 : socket → (File+)**Stream** Data (끝을 알 수 없는 일렬로 쭉 늘어진 데이터)

> *커널을 이루는 구성요소 중에서도 '네트워크 프로토콜(보통 TCP나 UDP)' 요소에 대한 추상화된 인터페이스가 '소켓'이다*
> 

Stream Data를 Network로 보낼 때는 잘라서 보냄(Segmention)
→잘린 Data 단위 : **Segment**

Segment를 Internet 단위에서 보낼 때 (인캡슐레이션한 것) : **Packet**

> *Packet의 MTU(Maximum Transmission Unit)→ 최대 1500byte*
> 

만들어진 Packet을 전송할 때 : **Frame** Data로 Encapsulation

> MSS(Maximum Segment Size)는 Packet보다 작다
*MTU - (TCP 헤더 + IP 헤더) = MSS
/Packet이 장치의 MTU를 초과하면 분편화 됨(더 작은 조각으로 나뉨)
/Packet이 MSS를 초과하면 삭제됨*
> 

![Untitled](%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B8%B0%EC%B4%88%20%EC%9D%B4%EB%A1%A0%20YouTube/Untitled.png)

8강

인터페이스 선택의 핵심원리 : 할당된 메트릭값이 작은 인터페이스가 우선순위가 높음

9강~11강 (12강은 회원전용)

티모시 버너스 리: html+http 구상한사람(만들기도 함)

자바스크립트=웹에서 실행됨

web 시스템이 개발될 때 정적인 정보(html+css+사진)에 포함

client web browser 구성요소
1. 구문분석(자료구조→비선형), DOM tree 생성
2. 랜더링(그래픽 랜더링 엔진)
3. 연산주체 스크립트 엔진

13강

LAN과 WAN