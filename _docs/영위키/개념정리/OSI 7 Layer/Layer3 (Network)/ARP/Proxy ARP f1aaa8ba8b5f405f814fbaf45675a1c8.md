# Proxy ARP

---

- **참고**
    - [**https://www.cisco.com/c/ko_kr/support/docs/ip/dynamic-address-allocation-resolution/13718-5.html**](https://www.cisco.com/c/ko_kr/support/docs/ip/dynamic-address-allocation-resolution/13718-5.html)
    - [**https://www.juniper.net/documentation/kr/ko/software/junos/multicast-l2/topics/topic-map/proxy-arp.html**](https://www.juniper.net/documentation/kr/ko/software/junos/multicast-l2/topics/topic-map/proxy-arp.html)
- 동일한 서브넷에서 타 노드를 대신해서 ARP Request에 응답하도록 한다는 의미
- 그냥 ARP는 스위치에서 동작하며, 동일한 네트워크 대역에서만 영향을 미치지만, Proxy ARP는 라우터의 라우팅 테이블을 통해서 여러 네트워크 대역의 도달성 확보가 가능하다.
- LAN구간의 여러 노드에 속하는 호스트의 MAC 주소를 찾는 요청이 옴 → 프록시 ARP를 수행하는 서버나 라우터 등등이 자신의 MAC주소를 대신 보내서 [**서브넷 효과**](../TCP%20IP/%EC%84%9C%EB%B8%8C%EB%84%B7%20%ED%9A%A8%EA%B3%BC%204c4fc54a45f1459182e7d7c24dd6f378.md)를 줌

![Untitled](Proxy%20ARP/Untitled.png)

- 가고싶은경로 : 노란색(Host A→Host D)
- 같은 네트워크 아님 → 프록시ARP (초록색)
    - Host A에서 Host D로 갈 때 한번에 못가는데 라우터는 Host D의 위치를 알고 있음
        
        → Host D의 IP와 라우터의 MAC주소로 ARP Reply를 Host A에 대신 보내줌
        
        → 앞으로 Host A에서는 라우터 MAC, 타겟 IP로 ARP를 보냄
        
- 실제경로 : 빨간색
    - 앞으로 Host A쪽에서 Host D로 가는 ARP는 라우터에서 받아서 Host D로 전달함
- no ip proxy-arp 명령어를 사용하면 각 인터페이스에서 비활성화 가능함 (Cisco)
- IP호스트가 기본 게이트웨이로 구성되지 않았거나 라우팅 인텔리전스가 없는 네트워크에서 사용해야 함
- **주요장점**
    - 네트워크의 단일 라우터에 추가 가능
    - 다른 라우터의 라우팅 테이블 방해안함
- **보안문제**
    - 세그먼트에서 ARP 트래픽 양 증가
    - ARP 단점과 동일 (ARP 스푸핑 당할 수 있음)