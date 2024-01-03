# Spring Profile
- `spring.profiles.active`: 기본 Profile설정
- `spring.profiles.group`: 하나의 프로파일을 활성화 하는 것으로 여러 개의 프로파일을 활성화하고 싶을 때 사용할 수 있다.
- `spring.profiles.include`: 설정을 통해 어플리케이션을 실행할 때 profile을 포함하여 실행
- `spring.config.active.on-profile`:  value의 프로파일이 활성화 되었을 때 이하의 설정을 적용한다는 의미가 된다. 설정되지 않은 구간에 작성된 설정들은 default 설정이 되어 모든 프로파일에 적용된다.
  * 하나의 파일에 여러가지 프로파일로 적용하는 경우 사용하면 될듯. (예 datasource, kafaka, secret key 등등) 
  * 파일로 분리하는게 좋은지 하나의 파일에서 분리된걸 사용하는지 뭐가 좋은지 모르겠음.
```yaml
--- # local 설정
spring:
  config:
    activate:
      on-profile: "db-local"

  datasource:
    hikari:
      driver-class-name: org.h2.Driver
      jdbc-url: jdbc:h2:mem://localhost/~/test;
      username: local
      password:

--- # dev 설정
spring:
  config:
    activate:
      on-profile: "db-dev"

  datasource:
    hikari:
      driver-class-name: org.h2.Driver
      jdbc-url: org.mariadb.jdbc.Driver
      username: dev
      password:
```
- `application-{profile}.yaml`: profile을 설정하면 (ex: dev) , application.yaml+ application-dev.yaml 파일 불러옴


## 결론
- 운영환경별 파일분리 (local, dev, prod 등).
- 환경설정이 다른 내용만 분리된 파일에 작성 (datasource 등).
- 공통되는 내용은 그냥 application.yaml에 작성.
