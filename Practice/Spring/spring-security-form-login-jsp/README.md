# JSP 설정
- .../webapp/WEB-INF/jsp 경로 추가
- 설정 파일
```yaml
spring.mvc.view.prefix: /WEB-INF/jsp/
spring.mvc.view.suffix: .jsp
```
- build.gradle 추가
```groovy
implementation group: 'org.glassfish.web', name: 'jakarta.servlet.jsp.jstl', version: '2.0.0'
implementation "org.apache.tomcat.embed:tomcat-embed-jasper"
```
- 
