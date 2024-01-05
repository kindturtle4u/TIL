> 출처 : 처음배우는 스프링부트2 읽으면서 정리

# 부록C. 스프링 부트 빌드와 배포
## C.1 인텔리제이를 사용하여 빌드하기
오른쪽 탭 Gradle -> Tasks -> build -> build

## C.2 커맨드라인을 사용하여 빌드하기
그레이들 CLI 설치 
맥OS `brew install gradle`

프로젝트빌드 `gradle build`
빌드가 완료되면 /bulid/libs/{프로젝트명}.jar

## C.3 스프링 부트 커맨드라인으로 실행하기(배포하기)
스프링 부트 애플리케이션 구동은 정말 편합니다. 자바 실행명령과 동일하게 애플리케이션 구동이 가능합니다.
'java [ options ] -jar {jar 파일명}.jar [ arguments ]'

`java -Dspring.profiles.active=dev -jar {jar 파일명}.jar`  
OR  
`java -jar {jar 파일명}.jar --spring.profiles.active=dev`

리눅스에서 쉘 파일을 데몬형태로 실행하는 프로그램을 nohup이라고 합니다. 
nohup으로 실행하면 터미널상에서 세션이 끊기더라도 실행은 끊기지 않고 동작합니다.

nohup 은 “no hangups” 라는 의미로, 리눅스/유닉스에서 쉘 스크립트파일을 데몬 형태로 실행시키는 명령어다. 
터미널이 끊겨도 실행한 프로세스는 계속 동작하게 한다.

`$ nohup java -jar sample.jar &`    
& 을 추가 해 백그라운드로 실행시킨다.
