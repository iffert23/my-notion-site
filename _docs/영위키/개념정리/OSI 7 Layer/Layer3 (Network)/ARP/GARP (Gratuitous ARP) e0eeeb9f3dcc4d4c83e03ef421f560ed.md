# GARP (Gratuitous ARP)

---

- **참고**
    - [**https://www.netmanias.com/ko/post/blog/5402/arp-ethernet-ip-ip-routing-network-protocol/arp-and-garp-gratuitous-arp**](https://www.netmanias.com/ko/post/blog/5402/arp-ethernet-ip-ip-routing-network-protocol/arp-and-garp-gratuitous-arp)
    - [**https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jooda99&logNo=220702480384**](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jooda99&logNo=220702480384)
    - [**https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=goduck2&logNo=220162690234**](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=goduck2&logNo=220162690234)
- Gratuitous ARP : 나의 MAC주소와 IP를 브로드캐스팅
    - 단어 자체의 의미는 불필요한, 쓸모없는 뭐 이런 뜻
- 출발지IP와 목적지IP가 동일한 ARP 브로드캐스트
- 기능
    1. ARP/MAC Table 갱신
        
        네트워크에 연결됐을 때, 동일 네트워크상의 다른 노드들에게 나의 IP와 MAC 주소를 광고하는 목적
        
        - 이중화 환경에서 액티브장비가 동작하지 않을 경우 스탠바이 장비가 동작을 하고 ARP 요청에 응답하게 되는데 엑티브로 바뀐 스탠바이 장비와 처음 통신할 때는 1.1=BB:BB:BB로 학습해 통신이 가능하지만 기존 장비와 통신하던 장비는 새로 바뀐 액티브 장비의 MAC 주소를 가지고 있기 때문에 동작하지 않는 이전 장비로 패킷을 보내게 됨.
        이를 방지하기 위해서 GARP 패팃을 네트워크로 보내 액티브 장비가 변경되었음을 알
    2. IP주소 충돌 감지
        
        누군가 ARP Reply를 보내온다면 아이피가 충돌된다는 것을 알 수 있음
        
        **충돌 감지 시 사용되는 패킷방식**
        
        ![Untitled](GARP%20(Gratuitous%20ARP)/Untitled.png)
        
    3. HA(고가용성) 용도의 클러스터링, VRRP, HSRP
- Sender IP에 0.0.0.0 채워서 보낼 때 좋은 점
    
    ⇒ GARP를 받은 노드들에서 ARP Table을 Update 하지 않음. 
    
    ⇒ 자기가 해당 IP를 사용하고 있다는 것만 ARP Reply로 알려주면 됨
    
- GARP를 이용해 MAC 테이블을 갱신하는 것은 라우터 이중화 프로토콜인 [VRRP](../../VRRP%2003e35510e0f846fa94ae5539e4915178.md)와 HSRP (라우터 이중화 프로토콜)에 사용하는 방식
- 클러스터링, FHRP(VRRP, HSRP)
실제 MAC 주소를 사용하지 않고 가상 MAC 주소를 사용한다.
네트워크에 있는 스위치 장비의 MAC 테이블 갱신이 목적
    
    ![동작방식](GARP%20(Gratuitous%20ARP)/Untitled%201.png)
    
    동작방식
    
- **보안문제**
    - ARP는 인증을 하지 않음 → GARP를 거짓으로 보냄 → 동일 네트워크상에 있는 모든 노드들의 ARP Cache 정보 변조 가능