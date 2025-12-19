# IOS Upgrade guide

---

[https://networklessons.com/cisco/ccna-routing-switching-icnd1-100-105/upgrade-cisco-ios-image](https://networklessons.com/cisco/ccna-routing-switching-icnd1-100-105/upgrade-cisco-ios-image)

**use USB** *장비에 USB포트가 있어야 함

[2960X IOS UPGRADE](https://boy-meet-girl.tistory.com/entry/2960X-IOS-UPGRADE)

[[네트워크] 시스코(Cisco) USB로 OS 업그레이드 방법! 로그 까지 총 정리](https://ciscoking.tistory.com/23)

bin 파일이 담긴 USB를 포트에 삽입 시 기본적으로 usbflash0으로 인식

USB에 있는 IOS를 flash에 이동

`show usbfla → tab` → 연결되어있는 usb포트정보가 자동으로 보임

`copy usbflash[]: flash:`

→ 파일명 붙여넣기 → enter

**use TFTP**

[Cisco Switch 3560 IOS Update](https://m.blog.naver.com/tnss11/221345181622)

[Cisco 장비 IOS 업그레이드하기](https://blog.naver.com/novajini/220189504009)

[How to upgrade IOS on 3650 in install mode](https://youtu.be/d9p6zuPDW-s?si=Cf3cbKdQ6gA5ksYz)

TFTP 프로그램 다운로드(서버용)

스위치에 콘솔 및 랜 연결

스위치 `enable` mode 접속

<3650>백본 mgmt 임의 설정 해야함
`ip tftp source-interface g0/0`
`interface gi0/0`
`ip address (임의설정)`
mgmt vrf 설정됐다는 설명창 뜨면 성공
`sh ip int brief`
`ping vrf Mgmt-vrf (같은 대역의 PC IP)`

TFTP IP로 `Ping` (통신확인)

통신 안됐을 시 : 
`interface vlan 1
ip address (PC와 같은 대역)`
혹은 PC ip를 스위치와 같은 대역으로 설정

`copy tftp flash:`

`연결하려는 PC IP`

`불러올 IOS 파일명 복붙`

확인 : `dir flash:` , `dir all`

부팅시 flash될 이미지 파일 지정, 업그레이드, 확인

`conf t`

`boot system flash:(파일명)`

<3650> `software install file flash:(파일명) new force`

`show boot`

`write memory`

`reload`

`show version`

vlan 1에 준 ip 빼기

(write memory 안하고 재부팅하면 되긴 하지만 혹시 모르니까 저장하고 버전 확인하고 ip제거)

`interface vlan 1`

`no ip address`

`shut`

`write memory`

old ios software image delete

`delete flash:(삭제할 이미지 파일 명)`

[Network Configuration Management by ManageEngine Network Configuration Manager](https://www.manageengine.com/network-configuration-manager/configlets/cisco-ios-firmware-upgrade.html)

config TFTP로 복사

copy running-config tftp:

서버(PC) IP

저장할 filename 입력