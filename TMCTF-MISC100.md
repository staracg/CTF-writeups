分析封包題目，丟進wireshark看，看到有ESP協議的封包
```
ESP協議（Encapsulated SecurityPayload，使用較廣）：可以同時提供數據完整性確認、數據加密、防重放等安全特性；ESP通常使用DES、3DES、AES等加密算法實現數據加密，使用MD5或SHA1來實現數據完整性。

reference:https://read01.com/o0kDJ.html
```

之後跟進TCP，看一下還有什麼訊息可以得知
```
Analyze - follow - TCP Stream
```
![Alt Text](http://imgur.com/36WPqSS.png)

看著看著，看到了這段後，就能開始解開ESP啦
```
src 1.1.1.11 dst 1.1.1.10
	proto esp spi 0xfab21777 reqid 16389 mode tunnel
	replay-window 32 flag 20
	auth hmac(sha1) 0x11cf27c5b3357a5fd5d26d253fffd5339a99b4d1
	enc cbc(aes) 0xfa19ff5565b1666d3dd16fcfda62820da44b2b51672a85fed155521bedb243ee
src 1.1.1.10 dst 1.1.1.11
	proto esp spi 0xbfd6dc1c reqid 16389 mode tunnel
	replay-window 32 flag 20
	auth hmac(sha1) 0x829b457814bd8856e51cce1d745619507ca1b257
	enc cbc(aes) 0x2a340c090abec9186c841017714a233fba6144b3cb20c898db4a30f02b0a003d
src 1.1.1.10 dst 1.1.1.11
	proto esp spi 0xeea1503c reqid 16389 mode tunnel
	replay-window 32 flag 20
	auth hmac(sha1) 0x951d2d93498d2e7479c28c1bcc203ace34d7fcde
	enc cbc(aes) 0x6ec6072dd25a6bcb7b9b3b516529acb641a1b356999f791eb971e57cc934a5eb
src 1.1.1.11 dst 1.1.1.10
	proto esp spi 0xd4d2074d reqid 16389 mode tunnel
	replay-window 32 flag 20
	auth hmac(sha1) 0x100a0b23fc006c867455506843cc96ad26026ec0
	enc cbc(aes) 0xdcfbc7d33d3c606de488c6efac4624ed50b550c88be0d62befb049992972cca6
```


```
Preferences - Protocols - ESP
```
把出現的四個選項都打勾，點ESP SAs edit把上面得到的AES、SHA1、spi填進去，
由上面知道加密法是AES-CBC，驗證方法是HMAC-SHA1。
- reference:https://ask.wireshark.org/questions/12019/how-can-i-decrypt-ikev1-andor-esp-packets

![Alt Text](http://imgur.com/H9HnUzB.png)


ESP封包解密後，下「tcp contains flag」篩選一下，看有沒有相關訊息
發現他們在HTTP protocol中傳輸了一張flag.png
![Alt Tex](http://imgur.com/bNaMIl0.png)

最後用wireshark把這張圖片export出來
```
File - Export Objects - HTTP
```
![Alt Text](http://imgur.com/V5MT1Zm.png)

![Alt Text](http://imgur.com/yYqxjH1.png)


得到FLAG。
