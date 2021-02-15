> 출처 : 처음배우는 스프링부트2 읽으면서 정리

# 부록B. 자동으로 LiveReload하는 devtools
스프링 부트에서는 서버가 구동되어 있는 상태에서 코드를 변경하면 변경된 코드에 대한 기능을 자동으로 적용하는 devtools를 지원합니다.
기존 스프링에도 비슷한 도구로 Spring Loaded가 있습니다.

devtools는 LiveReload라는 특별한 기능도 제공합니다. LiveReload는 임베디드 서버를 별도로 구동시켜 프론트 코드가 변경되면
브라우저를 자동으로 새로고침해 변경 내역을 실시간으로 반영합니다.

1. build.gradle 의존성 추가  
```groovy
dependencies {
    ...
    compileOnly("org.springframework.boot:spring-boot-devtools")
}
```

2. 인텔리제에서 액션 Ctrl+Shift+ㅁfh 'registry...' 검색 -> 'compiler.automake.allow.when.app.running' 체크  
3. Setting -> Build -> Compiler 설정에서 Build project automatically 키 값을 체크

devtools 설정을 변경하는 두가지 방법  
1. application.yml에서 프로퍼티의 키값을 변경
```yaml
spring:
  devtools:
    livereload:
      enabled:true
```

2. 메임 함수 소스 내에서 프로퍼티의 설정을 변경
```java
public static void main(String[] args) {
    System.setProperty("Spring.devtools.livereload.enabled", "true");
    SpringApplication.run(Application.class, args);
}
```

마지막으로 LiveReload 기능을 사용하려면 해당플러그인을 제공하는 브라우저(크롬,파이어폭스,사파리등) 를 같이 사용해야합니다.

