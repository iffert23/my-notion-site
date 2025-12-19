# Media Live Streaming on AWS

---

생중계 관람.

S3가 머에요 싀앙

AWS Elemental MediaPackage

자산보호. 로그확인 욕구

security 중요함

보안을 어떻게?

1. input부터 보안확인 group (input security group)
    
    로드밸런스 서비스 아님, 영상 하나만 있으면 바로 trans 됨. 어떤 아이피에서 오는 영상을 허용 할 것인지에 따른 방식
    
2. 암호화,영상을 요청하는 쪽에서 (DRM)
    
    인증된 사용자만 볼 수 있음
    
3. CDN
    
    영상 요청 시에 헤더값에 대해 확인하고 영상 제공을 할 지 말 지 선택하는거임
    
    무분별한 호출을 막을 수 있음
    

Cloud Watch 활용 → 뭔 지 알아보기

네트워크가 들어오고 나가는 것에 대해서 파이프라인으로 구성. 실시간으로 확인가능. 모니터링 중요

media live와 함께 활용

IVN 설명→AWS

[https://docs.aws.amazon.com/ko_kr/ivs/latest/userguide/what-is.html](https://docs.aws.amazon.com/ko_kr/ivs/latest/userguide/what-is.html)