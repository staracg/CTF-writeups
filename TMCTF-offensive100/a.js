function setWindowSize() {
    window.resizeTo(400, 150);
}
setWindowSize();
window.onresize = setWindowSize;

function checkPW(pass) {
    if (pass != null && pass == "close") {
        window.close();
    };
    if (pass == null || pass.length != 24) {
        alert("Wrong password");
        return;
    };
    if (pass.substring(0, 6) != "TMCTF{" || pass.substr(pass.length - 1) != "}") {
        alert("Wrong password");
        return;
    };
    var pwbody = (" " + pass.substring(6, pass.length - 1)).split("");
    var h1 = "",
        h2 = "",
        h3 = "";
    for (var i = 0; i < pwbody.length;) {
        h1 += pwbody[nl[++i]];
        h2 += pwbody[nl[++i]];
        h3 += pwbody[nl[++i]];
    };
    if (co(m(h1.replace(/(^\s+)|(\s+$)/g, ""))) && ca(m(h3.replace(/(^\s+)|(\s+$)/g, ""))) && cq(m(h2.replace(/(^\s+)|(\s+$)/g, "")))) {
        alert("ok!");
        window.close();
    } else {
        alert("Wrong password");
        return;
    };
}

function co(o) {
    return (o === ko);
}

function ca(a) {
    return (a === ka.replace(/6/g, '2').replace(/b/g, 'a').replace(/d/g, '4'));
}

function cq(q) {
    return (q === kq.replace(/1/g, '5').replace(/2/g, '8').replace(/3/g, 'b').replace(/9/g, 'c'));
}
var FnBJT9OVUieRCjeTgMPMBe4U = {};
FnBJT9OVUieRCjeTgMPMBe4U.hs = function(data) {
    function tzh(n) {
        var t1 = (n >>> 0).toString(16);
        return "00000000".substr(0, 8 - t1.length) + t1;
    }

    function ctb(ac) {
        var retval = [];
        for (var i = 0; i < ac.length; i++) {
            retval = retval.concat(str_to_bytes(ac[i]));
        }
        return retval;
    }

    function itb(num) {
        var retval = [];
        for (var i = 0; i < 8; i++) {
            retval.push(num & 0xFF);
            num = num >>> 8;
        }
        return retval;
    }

    function rol(num, places) {
        return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
    }

    function fF(b, c, d) {
        return (b & c) | (~b & d);
    }

    function fG(b, c, d) {
        return (d & b) | (~d & c);
    }

    function fH(b, c, d) {
        return b ^ c ^ d;
    }

    function fI(b, c, d) {
        return c ^ (b | ~d);
    }

    function bti(arr, off) {
        return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off]);
    }

    function str_to_bytes(str) {
        var retval = [];
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) <= 0x7F) {
                retval.push(str.charCodeAt(i));
            } else {
                var tmp = encodeURIComponent(str.charAt(i)).substr(1).split('%');
                for (var j = 0; j < tmp.length; j++) {
                    retval.push(parseInt(tmp[j], 0x10));
                }
            }
        }
        return retval;
    }

    function int128le_to_hex(a, b, c, d) {
        var ra = "";
        var t = 0;
        var ta = 0;
        for (var i = 3; i >= 0; i--) {
            ta = arguments[i];
            t = (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | ta;
            ra = ra + tzh(t);
        }
        return ra;
    }

    function typed_to_plain(tarr) {
        var retval = new Array(tarr.length);
        for (var i = 0; i < tarr.length; i++) {
            retval[i] = tarr[i];
        }
        return retval;
    }
    var databytes = null;
    var type_mismatch = null;
    if (typeof data == 'string') {
        databytes = str_to_bytes(data);
    } else if (data.constructor == Array) {
        if (data.length === 0) {
            databytes = data;
        } else if (typeof data[0] == 'string') {
            databytes = ctb(data);
        } else if (typeof data[0] == 'number') {
            databytes = data;
        } else {
            type_mismatch = typeof data[0];
        }
    } else if (typeof ArrayBuffer != 'undefined') {
        if (data instanceof ArrayBuffer) {
            databytes = typed_to_plain(new Uint8Array(data));
        } else if ((data instanceof Uint8Array) || (data instanceof Int8Array)) {
            databytes = typed_to_plain(data);
        } else if ((data instanceof Uint32Array) || (data instanceof Int32Array) || (data instanceof Uint16Array) || (data instanceof Int16Array) || (data instanceof Float32Array) || (data instanceof Float64Array)) {
            databytes = typed_to_plain(new Uint8Array(data.buffer));
        } else {
            type_mismatch = typeof data;
        }
    } else {
        type_mismatch = typeof data;
    }
    if (type_mismatch) {
        return;
    }

    function _add(n1, n2) {
        return 0x0FFFFFFFF & (n1 + n2);
    }
    return do_digest();

    function do_digest() {
        function updateRun(nf, sin32, dw32, b32) {
            var temp = d;
            d = c;
            c = b;
            b = _add(b, rol(_add(a, _add(nf, _add(sin32, dw32))), b32));
            a = temp;
        }
        var org_len = databytes.length;
        databytes.push(0x80);
        var tail = databytes.length % 64;
        if (tail > 56) {
            for (var i = 0; i < (64 - tail); i++) {
                databytes.push(0x0);
            }
            tail = databytes.length % 64;
        }
        for (i = 0; i < (56 - tail); i++) {
            databytes.push(0x0);
        }
        databytes = databytes.concat(itb(org_len * 8));
        var h0 = 0x67452301;
        var h1 = 0xEFCDAB89;
        var h2 = 0x98BADCFE;
        var h3 = 0x10325476;
        var a = 0,
            b = 0,
            c = 0,
            d = 0;
        for (i = 0; i < databytes.length / 64; i++) {
            a = h0;
            b = h1;
            c = h2;
            d = h3;
            var ptr = i * 64;
            updateRun(fF(b, c, d), 0xd76aa478, bti(databytes, ptr), 7);
            updateRun(fF(b, c, d), 0xe8c7b756, bti(databytes, ptr + 4), 12);
            updateRun(fF(b, c, d), 0x242070db, bti(databytes, ptr + 8), 17);
            updateRun(fF(b, c, d), 0xc1bdceee, bti(databytes, ptr + 12), 22);
            updateRun(fF(b, c, d), 0xf57c0faf, bti(databytes, ptr + 16), 7);
            updateRun(fF(b, c, d), 0x4787c62a, bti(databytes, ptr + 20), 12);
            updateRun(fF(b, c, d), 0xa8304613, bti(databytes, ptr + 24), 17);
            updateRun(fF(b, c, d), 0xfd469501, bti(databytes, ptr + 28), 22);
            updateRun(fF(b, c, d), 0x698098d8, bti(databytes, ptr + 32), 7);
            updateRun(fF(b, c, d), 0x8b44f7af, bti(databytes, ptr + 36), 12);
            updateRun(fF(b, c, d), 0xffff5bb1, bti(databytes, ptr + 40), 17);
            updateRun(fF(b, c, d), 0x895cd7be, bti(databytes, ptr + 44), 22);
            updateRun(fF(b, c, d), 0x6b901122, bti(databytes, ptr + 48), 7);
            updateRun(fF(b, c, d), 0xfd987193, bti(databytes, ptr + 52), 12);
            updateRun(fF(b, c, d), 0xa679438e, bti(databytes, ptr + 56), 17);
            updateRun(fF(b, c, d), 0x49b40821, bti(databytes, ptr + 60), 22);
            updateRun(fG(b, c, d), 0xf61e2562, bti(databytes, ptr + 4), 5);
            updateRun(fG(b, c, d), 0xc040b340, bti(databytes, ptr + 24), 9);
            updateRun(fG(b, c, d), 0x265e5a51, bti(databytes, ptr + 44), 14);
            updateRun(fG(b, c, d), 0xe9b6c7aa, bti(databytes, ptr), 20);
            updateRun(fG(b, c, d), 0xd62f105d, bti(databytes, ptr + 20), 5);
            updateRun(fG(b, c, d), 0x2441453, bti(databytes, ptr + 40), 9);
            updateRun(fG(b, c, d), 0xd8a1e681, bti(databytes, ptr + 60), 14);
            updateRun(fG(b, c, d), 0xe7d3fbc8, bti(databytes, ptr + 16), 20);
            updateRun(fG(b, c, d), 0x21e1cde6, bti(databytes, ptr + 36), 5);
            updateRun(fG(b, c, d), 0xc33707d6, bti(databytes, ptr + 56), 9);
            updateRun(fG(b, c, d), 0xf4d50d87, bti(databytes, ptr + 12), 14);
            updateRun(fG(b, c, d), 0x455a14ed, bti(databytes, ptr + 32), 20);
            updateRun(fG(b, c, d), 0xa9e3e905, bti(databytes, ptr + 52), 5);
            updateRun(fG(b, c, d), 0xfcefa3f8, bti(databytes, ptr + 8), 9);
            updateRun(fG(b, c, d), 0x676f02d9, bti(databytes, ptr + 28), 14);
            updateRun(fG(b, c, d), 0x8d2a4c8a, bti(databytes, ptr + 48), 20);
            updateRun(fH(b, c, d), 0xfffa3942, bti(databytes, ptr + 20), 4);
            updateRun(fH(b, c, d), 0x8771f681, bti(databytes, ptr + 32), 11);
            updateRun(fH(b, c, d), 0x6d9d6122, bti(databytes, ptr + 44), 16);
            updateRun(fH(b, c, d), 0xfde5380c, bti(databytes, ptr + 56), 23);
            updateRun(fH(b, c, d), 0xa4beea44, bti(databytes, ptr + 4), 4);
            updateRun(fH(b, c, d), 0x4bdecfa9, bti(databytes, ptr + 16), 11);
            updateRun(fH(b, c, d), 0xf6bb4b60, bti(databytes, ptr + 28), 16);
            updateRun(fH(b, c, d), 0xbebfbc70, bti(databytes, ptr + 40), 23);
            updateRun(fH(b, c, d), 0x289b7ec6, bti(databytes, ptr + 52), 4);
            updateRun(fH(b, c, d), 0xeaa127fa, bti(databytes, ptr), 11);
            updateRun(fH(b, c, d), 0xd4ef3085, bti(databytes, ptr + 12), 16);
            updateRun(fH(b, c, d), 0x4881d05, bti(databytes, ptr + 24), 23);
            updateRun(fH(b, c, d), 0xd9d4d039, bti(databytes, ptr + 36), 4);
            updateRun(fH(b, c, d), 0xe6db99e5, bti(databytes, ptr + 48), 11);
            updateRun(fH(b, c, d), 0x1fa27cf8, bti(databytes, ptr + 60), 16);
            updateRun(fH(b, c, d), 0xc4ac5665, bti(databytes, ptr + 8), 23);
            updateRun(fI(b, c, d), 0xf4292244, bti(databytes, ptr), 6);
            updateRun(fI(b, c, d), 0x432aff97, bti(databytes, ptr + 28), 10);
            updateRun(fI(b, c, d), 0xab9423a7, bti(databytes, ptr + 56), 15);
            updateRun(fI(b, c, d), 0xfc93a039, bti(databytes, ptr + 20), 21);
            updateRun(fI(b, c, d), 0x655b59c3, bti(databytes, ptr + 48), 6);
            updateRun(fI(b, c, d), 0x8f0ccc92, bti(databytes, ptr + 12), 10);
            updateRun(fI(b, c, d), 0xffeff47d, bti(databytes, ptr + 40), 15);
            updateRun(fI(b, c, d), 0x85845dd1, bti(databytes, ptr + 4), 21);
            updateRun(fI(b, c, d), 0x6fa87e4f, bti(databytes, ptr + 32), 6);
            updateRun(fI(b, c, d), 0xfe2ce6e0, bti(databytes, ptr + 60), 10);
            updateRun(fI(b, c, d), 0xa3014314, bti(databytes, ptr + 24), 15);
            updateRun(fI(b, c, d), 0x4e0811a1, bti(databytes, ptr + 52), 21);
            updateRun(fI(b, c, d), 0xf7537e82, bti(databytes, ptr + 16), 6);
            updateRun(fI(b, c, d), 0xbd3af235, bti(databytes, ptr + 44), 10);
            updateRun(fI(b, c, d), 0x2ad7d2bb, bti(databytes, ptr + 8), 15);
            updateRun(fI(b, c, d), 0xeb86d391, bti(databytes, ptr + 36), 21);
            h0 = _add(h0, a);
            h1 = _add(h1, b);
            h2 = _add(h2, c);
            h3 = _add(h3, d);
        }
        return int128le_to_hex(h3, h2, h1, h0);
    }
};
