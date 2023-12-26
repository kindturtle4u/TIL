# spring-redis
- redis 설치: `brew install redis`
- redis 설치 확인: `redis-server --version`
- redis 실행: `redis-server`
- redis CLI: `redis-cli`
- redis 명령어
```shell
# redis 데이터 생성,수정
set mykey myvalue

# redis 데이터 조회
get mykey
"myvalue"

# redis 데이터 Key 목록 조회
keys *
"mykey"

# redis key 수정
rename mykey mykey2

# redis Key 개수 조회
dbsize

# redis Key(데이터) 삭제
del mykey2

#redis Key(데이터) 전체 삭제
fulushall

hgetall user:{key} # 키값을 기준으로 키-밸류를 조회한다. 

hkeys user:{Key} # 해당 키값의 키들을 출력한다.

hvals user:{key} # 해당 키값의 값들을 출력한다.
```
