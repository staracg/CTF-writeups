#!/uer/bin/env python
flag = 'x' * 17
ko = '654321'
ka = 'admin'
kq = 'qwerty'


l = [0,2,1,12,7,15,5,4,8,16,17,3,9,10,14,11,13,6,0]
i = 0
j = 0

while i < 18:
    i += 1
    flag = flag[:l[i]] + ko[j] + flag[l[i]+1:]

    i += 1
    flag = flag[:l[i]] + kq[j] + flag[l[i]+1:]

    i += 1
    if (j < 5):
        flag = flag[:l[i]] + ka[j] + flag[l[i]+1:]
        j += 1

print 'TMCTF{' + flag[1:] + '}'
