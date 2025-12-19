# Private DNS 테스트

---

- 메모 및 참고
    
    참고 링크 : [https://zigispace.net/1189](https://zigispace.net/1189)
    
    애저에 웹앱 만들기 <-- 뭔가 웹앱을 만들긴 함
    private endpoint 붙이고 <-- 붙임
    스토리지도 만들어야함
    vpn 통해서 물리적인(척하는) hyper-V vm에 연결 가능한 환경 구축 <--완료
    dns resolver 만들기 <--완료
    vnet dns 서버정보에 dns resolver의 inbound-end point ip로 DNS 등록 <--완료
    hyper-V 환경의 게스트 머신에서 port53 통신 확인
    hyper-V 환경이랑 windows DNS 서버에서 레코드 등록하(거나수정). (서버 만드는건 팀장님이 해주심)
    애저에 또다른 프라이빗 DNS 만들어서
    애저 웹앱이 DNS 통신할때 windows DNS로 쿼리하고 그 세컨 DNS를 애저 프라이빗 DNS로 바라보게 하는 테스트
    
    ---
    
    vnet 생성 서브넷 다섯개
    
    (vpn gw용, private resolver용 2개, 웹앱용 1개, private DNS Zone용 1개)
    
    DNS private resolver 생성
    
    ---
    
    의문점
    
    1. ~~웹앱은 무슨 역할을 하는 거지~~ → 그냥 사이트 연결되는지 확인용으로 웹앱 페이지 열리면 됨!
    2. ~~vnet에 private endpoint 설정 어떻게 하는거지~~
    
    ---
    
    - IIS 삽질 start → 레알 삽질이었고 진심 필요 없는 절차였음;
        
        ![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image.png)
        
        ![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%201.png)
        
- 전체 테스트 경과 요약
    1. 애저에서 VNET 설정
    2. 애저에서 VPN 설정
    3. 온프렘 환경에 DNS 서버, 클라이언트 각 한 대씩
    4. 애저에서 vnet, webapp(private endpoint 포함), resolver 생성
    5. DNS 서버에 스토리지, 웹앱에 대한 조건부 전달자 (둘 다 목적지 : resolver inbound ip)
    
    ![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%202.png)
    
    1. 설정 결과 → [dns-test-jiyoung-01-gqcjdubwbgf5e2fz.koreacentral-01.azurewebsites.net](http://dns-test-jiyoung-01-gqcjdubwbgf5e2fz.koreacentral-01.azurewebsites.net/) 했을 때 웹앱 창 열림
    2. 웹앱에 사용자 도메인 지정 없이 정방향 조회 영역에 레코드 추가해서 [jyworld.co.kr](http://jyworld.co.kr) 도메인으로 웹앱 연결해보려고 했음 → 안됨
    3. 어떻게든 사용자 정의 도메인 지정하지 않고 내부 사설 도메인으로 웹앱 접근해보려고 IIS 삽질 함(reverse proxy 사용하려고) → 안됨
    4. ms learn에 나와있는 대로 사용자 지정 도메인 없이는 웹앱 접근이 https handshake 이슈로 연결이 불가능하다는 걸 알게 됨
    5. 애저에서 웹앱에 사용자 정의 도메인 지정
    6. 온프렘 클라이언트 PC에서 정상적으로 도메인 접근이 가능하게 됨
    7. 애저에서 스토리지 계정 생성하고 컨테이너 생성, 파일 업로드, 이런저런 설정
    8. 애저 스토리지 계정에서 사용자 지정 도메인 등록
    9. 온프렘 클라이언트 PC에서 정상적으로 스토리지 계정-컨테이너-txt파일 접근 가능하게 됨
    

### VNet

주소 공간 : 100.10.0.0/23

**서브넷**

webapp-private : 서비스 엔드포인트에서 서비스 Microsoft.Web 추가(프라이빗 엔드포인트용)

private-dns01,02 : Microsoft.Network/dnsResolvers에 서브넷 위임

default : Microsoft.Web/serverFarms 서브넷 위임 (Webapp 생성용)

gatewaySubnet : VPN GW용으로 서브넷 용도 설정

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%203.png)

추후 ————————————————————————————————————————

프라이빗 엔드포인트 생성해서 Vnet에 연결함.

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%204.png)

DNS 설정 (private DNS영역은 프라이빗 엔드포인트 생성 시 함께 생성됨)

DNS 서버 사용자 지정으로, DNS Resolver의 Inbound endpoint IP로 설정.

Resolver 설정.

Private DNS 영역 확인 (Webapp, Storage Account Private DNS 등록해서 링크 두 개 생김 그리고 저 링크 이름 좀 예쁘게 설정 하고 싶은데;; 자동생성이라 안되나봄)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%205.png)

서브넷에 Webapp, Storage Account 연결해서 서비스 엔드포인트에 서비스 생성됨

(스토리지에 서브넷 다섯개 다 연결.)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%206.png)

---

************************************************************************************************************

---

## DNS Resolver (DNS 리졸버)

⇒ DNS Private Resolver 생성 버튼 눌러서 Virtual Network 선택. 각 Vnet별로 Resolver는 하나만 가능

- 인바운드 엔드포인트 생성

서브넷 선택하기. 여기서 선택하는 서브넷은 resolver의 인/아웃바운드 엔드포인트에 종속되기 때문에 이외에 다른 용도로 사용할 수 없음

IP address assignment는 Dynamic, Static 상관 없음.

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%207.png)

- 아웃바운드 엔드포인트 생성

인바운드 엔드포인트 만들때랑 똑같이 서브넷 선택하기

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%208.png)

- 룰셋 생성

(여기서 룰셋 생성 안하고 나중에 따로 생성해서 아웃바운드 엔드포인트에 연결해도 됨)

룰셋이 있어야 resolver를 통해서 아웃바운드로 나가게 될 때 어떤 룰을 적용받아 어디로 나갈 것인지 지정할 수 있음

엔드포인트는 무조건 아웃바운드 엔드포인트 말하는것. 한 엔드포인트에 하나의 룰셋만 지정할 수 있음

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%209.png)

룰 추가해도 되고 안해도 됨 (나중에 추가할 수 있음)

**jyworld** jyworld.co.kr. 65.130.1.10:53 **Enabled**

룰 네임 입력하고 쿼리 보낼 도메인 및 해당 도메인의 IP 입력

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2010.png)

---

************************************************************************************************************

---

## App Service (웹앱)

⇒ 그냥 웹앱 만들기로 생성, 사용자 지정 도메인 설정까지

기본 (안전한 고유한 기본 호스트 이름 사용/미사용 선택. 선택하면 주소가 아주 길어짐)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2011.png)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2012.png)

데이터베이스, 배포 다 기본값으로 건너뛰기 하고

네트워킹에서 공용 엑세스 끄기. (완전한 프라이빗 환경을 위해)

Virtual Network 통합 사용, 프라이빗 엔드포인트 사용

가상 네트워크 선택하고 프라이빗 엔드포인트 사용 선택하고 인바운드 서브넷 위에서 만들어뒀던 대로 선택, DNS는 Azure 프라이빗 DNS 영역으로 선택. 신규 생성 시에는 프라이빗 DNS 영역이 없었기 때문에 해당 설정 선택해서 신규 생성했음.

아웃바운드 엑세스 Vnet 통합 사용하고 서브넷 선택.

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2013.png)

이후 모니터링+보안, 태그 패스하고 검토+만들기

**사용자 지정 도메인 설정**

웹앱에 도메인을 통해 접근 시도할 때, 웹앱에 사용자 지정 도메인으로 적용하지 않은 도메인으로 접근하게 되면 무조건 404 오류가 나며 인증서 핸드쉐이크가 실패한다.

웹앱에 접근 자체가 안 됨. 그치만 통신이 되기 때문에 IIS로 프록시 써보고 해도 웹 접근이 안됐다.

인증서의 문제기 때문에 다른 방법으로 해결되지 않음

웹앱에서 사용자 지정 도메인을 추가하기 위해서는 해당 도메인이 Public이어야 하고 웹앱에서 도메인 유효성이 완료되어야만 한다. 그렇지 않으면 도메인 유효성 체크에 실패해서 사용자 지정 도메인을 등록할 수가 없다.

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2014.png)

(도메인은 저 당시 재희님이 찬조해주심 추후에 내 도메인으로 바꿨는데 캡처를 까먹음음)

도메인 관리 사이트에서 <내웹앱이름.azurewebsites.net> 에 대해 CNAME 매핑 후 애저에 해당 도메인을 등록하고 확인 버튼을 누르면

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2015.png)

도메인 유효성 검사에 성공하여 추가버튼이 활성화되고 사용자 정의 도메인이 등록된다.

- 사용자 정의 도메인 등록 후 바인딩까지 마쳐줘야 함

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2016.png)

바인딩 추가 선택 후 App Service 관리 인증서 만들기 - 확인 선택해서 바인딩에 적합한 호스트인지 확인하고 확인버튼 누르면 도메인 등록 완료

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2017.png)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2018.png)

- 클라이언트 PC에서 `https://사용자정의도메인` 입력했을 때 정상적인 웹앱 메인 호출됨

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2019.png)

---

************************************************************************************************************

---

## 프라이빗 엔드포인트(Private Link)

⇒ 프라이빗한 연결을 위해 프라이빗 엔드포인트 생성.

특정 리소스 만들 때 같이 만들어도 됨. 이 부분은 따로 만들었을 때의 방법임

기본 사항(이름 설정이니까 스킵)

- 리소스 선택

Web Service 연결해야 하니까 그거에 맞춰서 리소스 종류 등 선택

리소스는 웹앱을 선택함.

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2020.png)

- 가상 네트워크 선택

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2021.png)

- DNS 설정

((프라이빗 DNS 영역과 통합))을 무조건 해줘야 함.

이게 선택사항인데 필수불가결한거..

추후에 같은 리소스의 프라이빗 링크 연결 시에는 자동으로 레코드 추가됨

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2022.png)

태그 넘기고 검토+만들기 해서 생성한 다음에 레코드 집합에 해당 프라이빗 엔드포인트 정보 있는지 확인 필요함

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2023.png)

추가적으로 리소스 및 프라이빗 엔드포인트 생성 시에 기존에 있는 프라이빗 DNS 영역에 통합될 것 같으면 자동으로 있는 프라이빗 DNS 영역과 통합됨

---

************************************************************************************************************

---

## 스토리지 계정 (스토리지어카운트)

- 구독이랑 리소스 그룹 선택, 나머지 인스턴트 세부 정보 선택

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2024.png)

- 공용 네트워크 엑세스 사용 안함

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2025.png)

- 고급 설정 건너뜀
- 프라이빗 엔드포인트 생성

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2026.png)

- 데이터 보호 설정 건너뜀-필요하면 설정
- 암호화 설정 건너뜀-필요하면 설정

—스토리지 계정 생성 이후—

- 설정-구성에서 Blob 익명 엑세스 허용해줘야 함.(안그러면 테스트가 안됨)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2027.png)

- 컨테이너 생성
- 엑세스 수준 변경

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2028.png)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2029.png)

- 컨테이너에 파일 업로드하려면 공용 엑세스 권한을 허용해줘야 하기 때문에 특정 네트워크만 허용해주는걸로 설정 필요함

아래는 아예 프라이빗 환경을 만들어야겠다고 생각해서 Disable 해둔건데 알고 보니 저걸 Enabled from selected networks로 했어야 했던 거였음

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2030.png)

- 공용 네트워크 엑세스 설정 변경

Vnet 연결은 안했고 IP address만 지금 접속중인 공인IP 넣었고 Exceptions 전부 선택

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2031.png)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2032.png)

설정 완료

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2033.png)

- 사용자 지정 도메인 등록

외부 접근을 위함. jyworld.co.kr 등록해보았지만 등록 안됨.

웹앱에 사용자 지정 도메인 설정할 때와 똑같은 매커니즘인 것으로 보임

(Azure에서 도메인 등록을 확인하는 동안 짧은 가동 중지가 발생합니다. 라고 써있어서 시간 체크용)

11:20 사용자 지정 도메인 업데이트 완료 

11:25 사용자 지정 도메인 정상적

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2034.png)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2035.png)

- 컨테이너에 파일 업로드

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2036.png)

- 온프렘DNS 서버에 조건부 전달자 추가

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%202.png)

- 클라이언트 PC(VPN 연결된 환경)에서 https://사용자지정도메인/컨테이너이름/파일명 입력 후 잘 뜨는지 확인

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2037.png)

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2038.png)

- 내 PC(VPN 연결 안 된 환경)에서 https://사용자지정도메인/컨테이너이름/파일명 입력 시 block

![image.png](Private%20DNS%20%ED%85%8C%EC%8A%A4%ED%8A%B8/image%2039.png)

---

************************************************************************************************************

---