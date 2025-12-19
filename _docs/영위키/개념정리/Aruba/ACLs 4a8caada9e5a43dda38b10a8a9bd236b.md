# ACLs

---

**2930f**

**guide →**

[Aruba 2930F  2930M Access Security Guide for ArubaOS-Switch 16.10-a00099393en_us.pdf](ACLs/Aruba_2930F__2930M_Access_Security_Guide_for_ArubaOS-Switch_16.10-a00099393en_us.pdf)

`ip access-list standard [name]
 permit host [IP address] log(선택)`

`mac-access-list standard [name]
 permit host [MAC address] log(선택)`

`interface [num] ip access-group [access-list name] in/out`

`vlan [num]
 mac-access-group [name] in/out`