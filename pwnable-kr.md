# Pwnable.kr
### fd
./fd ``python -c "print 0x1234+1"``
LETMEWIN
FLAG: mommy! I think I know what a file descriptor is!!
### collision
gdb col
```
gdb command:
disassemble check_password
b *0x080484bb
r
r AAAABBBBCCCCDDDDEEEE
info register
c
info register
```
```
python 
hex(0x21DD09EC  - (0x01010101 * 4))
0x1dd905e8
```
./col ``python -c "print '\x01\x01\x01\x01'*4+'\xe8\x05\xd9\x1d'"``

FLAG: daddy! I just managed to create a hash collision :)
