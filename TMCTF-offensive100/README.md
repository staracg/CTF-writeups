拉到最下面看到這段
```
window.host=FnBJT9OVUieRCjeTgMPMBe4U.hs;
var m = window.host;
var nl = [0,2,1,12,7,15,5,4,8,16,17,3,9,10,14,11,13,6,0];
var ko="c33367701511b4f6020ec61ded352059";
var ka="61636f697b57b5b7d389db0edb801fc3";
var kq="d2172edf24129e06f3913376a12919a4";
```

c33367701511b4f6020ec61ded352059這段給Google，知道它是MD5，並且明文是654321，而下面兩行解不出來。

先從頭慢慢分析吧，透過JavaScript beautifier，讓那坨噁心的code變成人類能看的
```
if (pass == null || pass.length != 24) {
        alert("Wrong password");
        return;
    };
if (pass.substring(0, 6) != "TMCTF{" || pass.substr(pass.length - 1) != "}") {
        alert("Wrong password");
        return;
    };
```
分析這段code後，知道FLAG括號內有17個字。

```
    for (var i = 0; i < pwbody.length;) {
        h1 += pwbody[nl[++i]];
        h2 += pwbody[nl[++i]];
        h3 += pwbody[nl[++i]];
    };

```
分析這段for循環，知道flag是從h1、h2、h3去混合而成的

```
if (co(m(h1.replace(/(^\s+)|(\s+$)/g, ""))) && ca(m(h3.replace(/(^\s+)|(\s+$)/g, ""))) && cq(m(h2.replace(/(^\s+)|(\s+$)/g, ""))))
```
```
function co(o) {
    return (o === ko);
}

function ca(a) {
    return (a === ka.replace(/6/g, '2').replace(/b/g, 'a').replace(/d/g, '4'));
}

function cq(q) {
    return (q === kq.replace(/1/g, '5').replace(/2/g, '8').replace(/3/g, 'b').replace(/9/g, 'c'));
}
```

接著分析下來，看到這段，正規表達式是在對字串做去空格，
然後會發現function m其實是在對字串做MD5加密，
也可以得知為什麼剛剛那兩行解不出來，因為他的有些字元被替換掉了，所以藉由他提供的code來還原。

```
"61636f697b57b5b7d389db0edb801fc3".replace(/6/g, '2').replace(/b/g, 'a').replace(/d/g, '4')
>"21232f297a57a5a743894a0e4a801fc3"

"d2172edf24129e06f3913376a12919a4".replace(/1/g, '5').replace(/2/g, '8').replace(/3/g, 'b').replace(/9/g, 'c')
>"d8578edf8458ce06fbc5bb76a58c5ca4"
```
再次拿去餵Google知道
- 21232f297a57a5a743894a0e4a801fc3 = admin
- d8578edf8458ce06fbc5bb76a58c5ca4 = qwerty

拿到了ko,ka,kq後，寫了個python，來去解開密碼。
![Alt Text](http://imgur.com/sYFiB1T.png)

- FLAG is TMCTF{q6r4dy5ei2na1twm3}
