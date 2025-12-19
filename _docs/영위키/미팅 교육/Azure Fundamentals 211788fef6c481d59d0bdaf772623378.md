# Azure Fundamentals

---

1. Azure
    1. Azure란 : 클라우드 컴퓨팅 서비스 중 하나
    2. 장점 : 자원공유, 사용자 중심의 셀프 서비스, 유연성(오토 스케일링), 사용량 기반 비용 청구(분당 요금, 비용절약)
    3. 보안 및 관리 : 보안 강화하고 리소스를..?머라고요. Azure Active Directory. 
    4. 하이브리드 클라우드 : 온프라미스↔Azure 함께 씀. 민감하거나 그런 서버는 프라이빗에서 관리하고 나머지를 클라우드
    5. 클라우드 서비스, 인프라 서비스 : 컴퓨팅, 네트워킹 등
    6. 플랫폼 서비스 : PaaS, 대부분 Azure에서 관리하고 사용자는 플랫폼을 사용함. AKS, SQLD 등등
    7. IaaS, Paas 제공함
    8. Azure Portal이라는 웹 기반 통합 콘솔 제공
    9. 리소스 관리
        1. Microsoft Entra ID(Azure Active Directory) : 클라우드 기반 ID, 엑세스 관리 서비스. 테넌트 또는 디렉토리라고도 함. 
        2. 구독 : 비용은 구독별로 청구됨. 
            1. 비용청구방식 : 사용한만큼 후불청구(개인), CSP(클루커스랑 계약하고 매니지드 서비스를 클루커스와 함, 사용한만큼), MACC, SCEC
        3. 리소스 그룹 : 리소스들이 모여 있는 그룹. 각 리소스는 반드시 1개의 리소스에 속해 있어야 함
2. Network
    1. 네트워크 리소스
        1. Vnet(Azure Virtual Network.) :  Vnet 설정할 때 다른 네트워크랑 대역이 겹치면 피어링 불가능
        2. NSG(방화벽) : 방화벽 역할. 서브넷, NIC에 할당할 수 있음. 일반적으로 같은 서브넷에 배치되어있는 애들은 서브넷에 할당. 고객 요청에 따라 NIC에도 할당해야 하면 둘 다에 할당해야함. 천개까지만 할당 가능하고, 숫자 낮을 수록 우선순위가 높고 먼저 적용됨 걍 방화벽 정책규칙이넹
        3. Peering : Vnet끼리 연결해서 통신 가능하게 함. 로컬 라우팅 같은 느낌이군. 리소스간의 짧은 대기 시간, 높은 대역폭 사용 가능. 구독이 다르거나 테넌트가 달라도 피어링끼리 통신 연결 가능. 
        4. LB : 기본적으로 해시 기반으로 부하분산, 클라이언트 IP로 설정 가능함. 라운드로빈 안댐. 공용 부하분산(내부↔외부 나가는거 분산), 내부 부하분산(사설IP가 머라고..? 내부에 있는 뭐에 사용될 때 있는거 뭔소리야)
        5. Application GW : PaaS, 규칙 설정에 따라 라우팅 설정 됨. 표준모드(L7), WAF(Azure Waf 사용가능)
            
            ![작동원리](Azure%20Fundamentals/image.png)
            
            작동원리
            
        6. VPN GW : Azure와 온프렘 네트워크 연결함(S2S), Azure와 개별 디바이스를 연결(P2S), 다른 지역이나 구독에 있는 가상 네트워크들을 연결함(Vnet Peering)
        7. Route Table : 네트워크 트래픽 자동 라우팅. 네트워크 와쳐라는걸로 트래픽 볼수있음
        8. Bastion : 브라우저와 Azure Portal을 사용하여 가상머신에 연결할 수 있도록 배포하는 서비스 
            
            ![image.png](Azure%20Fundamentals/image%201.png)
            
3. Computer
    1. Azure Virtual Machine : IaaS 서버를 가상화, 가용성 높임. AvSet : VM의 논리적 그룹
        
        ![고객 사례](Azure%20Fundamentals/image%202.png)
        
        고객 사례
        
        1. VM 크기, 배포 수 제한, VM에서 실행하는 운영체제, VM에 필요한 관련 리소스 확약
        2. NC Type(가상머신에서 AI 사용할 수 있는 타입)
        3. 할당 취소 : 잠시 사용 안하는 VM, CPU 과금 없음
        4. 중지 : OS는 꺼지지만 비용 과금은 계속됨
        5. 사용을 어떻게 하느냐에 따라 사용할 수 있는 가상머신 크기가 다양함
    2. Storage : Azure Disk, Blob Storage, Azure Table, File Share 등등. (pdf 33p)
        1. OS Disk (Windows Drive C,D / Linux sda,sdb) : D Drive에 데이터 넣지 말것. 임시 디스크임
        2. Temporary Disk
        3. Data Disk
        4. 데이터 서비스 : Blob, File, Queue, Table
        5. Storage 중복성. Azure가 데이터 보호하는 방법
        6. Stroage Tool
            1. PowerShell/CLI
            2. Storage Explorer
            3. AzCopy
        7. Azure Blob유형 : 핫, 쿨, 어쩌고
4. Monitor
    1. 클라우드, 온프렘 환경에서 원격 분석 수집, 분석, 작업에 대한 포괄적인 솔루션
    2. 메트릭과 로그로 저장이 되고 데이터를 이용하여 여러 함수 수행
    3. Metric :  시간상 특정 지점에서 시스템의 상태를 숫자값으로 표현, 차트로 표현 가능 (Metric Explorer)
    4. Log : 시간상 특정 지점에서 시스템의 상태를 로그형태로 표현, 테이블 형식, KQL로 로그 조회 (Log Analytics)
    5. DashBoard : 보기.
    6. Alert : 중대한 상황을 사전에 알리고 잠재적으로 시정조치, 실시간 경고 제공. 대상 리소스 선택→신호선택→조건설정→작업(알림)→경고규칙 세부 정보
5. Backup / Restore
    1. 장점 : 온프렘 백업 오프로드(독립적이고 격리된 백업 제공), 손쉬운 확장, 무제한 데이터 전송(데이터 양 제안X, 데이터에 대한 요금부과 X)
    2. 백업 서비스 : Azure Recovery Service(데이터 저장 스토리지 엔터티, Recovery Service Vault를 통해 백업/복구, 모니터링), Disk Snapshot(가상 하드 드라이버 읽기전용 복사본, 전체/중분 스냅샷 가능), VM Capture(가상머신 이미지 생성, 캡처 시 원본 가상머신 사용 불가)
    3. 백업 중복성 복제 유형
    4. 백업 진행방식
        
        ![image.png](Azure%20Fundamentals/image%203.png)
        
    5. 백업 정책 사용 가능
    6. Recovery Service Vault를 사용하여 백업 데이터 시점과 동일하게 복원시킬 수 있음.