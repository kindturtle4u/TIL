> 출처 : 토비의 스프링 3.1 Vol. 2 읽으면서 정리

# 1장 IoC 컨테이너와 DI
## 1.1 IoC 컨테이너 : 빈 팩토리와 애플리케이션 컨텍스트
스프링의 빈 팩토리와 애플리케이션 컨텍스트는 각각 기능을 대표하는 BeanFactory와 ApplicationContext라는
두개의 인터페이스로 정의 되어있다.

ApplicationContext 인터페이스는 BeanFactory 인터페이스를 상속한 서브 인터페이스이다.

### 1.1.1 IoC 컨테이너를 이용해 애플리케이션 만들기
스프링의 설정 메타정보는 XML파일이 아니다.
XML에 담긴 내용을 읽어서 설정 메타 정보로 활용하는건 사실
애플리케이션 컨텍스트는 BeanDefinition으로 만들어진 메타정보를 담은 오브젝트를 사용해 IoC와 DI 작업을 수행한다.

BeanDefinition 인터페이스로 정의되는, IoC 컨테이너가 사용하는 빈 메타정보는 대략 다음과 같다.
- 빈아이디 , 이름 , 별칭 : 빈오브젝트를 구분할 수 있는 식별자
- 클래스 또는 클래스 이름 : 빈으로 만들 POJO 클래스 또는 서비스 클래스 정보
- 스코프 : 싱클톤 , 프로토타입과 같은 빈의 생성 방식과 존재 범위
- 프로퍼티 값 또는 참조 : DI에 사용할 프로퍼티 이름과 값 또는 참조하는 빈의 이름
- 생성자 파라미터 값 또는 참조 : DI에 사용할 생성자 파라미터 이름과 값 또는 참조할 빈의 이름
- 지연된 로딩 여부, 우선 빈 여부,자동와이어링 여부,부모 빈 정보,빈팩토리 이름 등

### 1.1.2 IoC 컨테이너 종류와 사용방법
스프링이 제공하는 ApplicationContext 구현 클래스에는 어떤 종류가 있고 어떻게 사용되는지 좀 더 살펴보자

#### StaticApplicationContext
코드를 통해 빈 메타정보를 등록하기 위해 사용한다.

#### GenericApplicationContext
가장 일반적인 애플리케이션 컨텍스트의 구현 클래스다.

#### GenericXmlApplicationContext
GenericApplicationContext + XmlBeanDefinitionReader

#### WebApplicationContext
스프링 애플리케이션에서 가장 많이 사용 되는 애플리케이션 컨텍스트
웹환경에서 사용할때 필요한 기능이 추가된 어플리케이션 컨텍스트이다.

### 1.1.3 IoC 컨테이너 계층구조
### 1.1.4 웹 애플리케이션의 IoC 컨테이너 구성

#### 프론트 컨트롤러 패턴
많은 웹 요청을 한 번에 받을 수 있는 대표 서블릿을 등록해두고, 공통적인 선행작업을 수행하게 한 후에,
각 요청의 기능을 담당하는 핸들러라고 불리는 클래스를 호출하는 방식으로 개발

#### 루트 애플리케이션 컨텍스트 등록
스프링은 웹어플리케이션 시작과 종료 시 발생하는 이벤트를 처리하는 리스너인 ServletContextListener를 이용한다.

#### ContextLoaderListener
웹애플리케이션이 시작될때 루트 애플리케이션 컨텍스트를 만들어 초기화 하고,
웹 애플리케이션이 종료될 때 컨텍스트를 함께 종료하는 기능을 가진 리스너인

```xml      
<listener>
    <listener-class>org.springframewrok.web.context.ContextLoaderListener</listener-class>
</listener>
```

#### 디폴트 설정
- 애플리케이션 컨텍스트 클래스 : XmlWebAppicationContext
- XML 설정파일 위치 : /WEB-INF/applicationContext.xml

디폴트 설정의 위치 변경
```xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath*:egovframework/spring/context-*.xml</param-value>
</context-param>
```

서블릿 애플리케이션 컨텍스트 등록
- 스프링의 웹 기능을 지원하는 프론트 컨트롤러 서블릿은 DispatcherServlet 이다.
- DispatcherServlet은 서블릿이 초기화 될 때 자신만의 컨텍스트를 생성하고 초기화 한다.
- 동시에 웹 애플리케이션 레벨에 등록된 루트 애플리케이션 컨텍스트를 찾아서 이를 자신의 부모 컨텍스트로 사용한다.

```xml
<servlet>
    <servlet-name>action</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/config/egovframework/springmvc/dispatcher-servlet.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
```

`<servlet-name>`  
네임스페이스 : <servlet-name>-servlet ex) spring-servlet.xml  
'WEB-INF'/ + 서블릿네입스페이스 + '.xml'

`<load-on-startup>`  
서블릿 컨테이너가 등록된 서블릿을 언제 만들고 초기화할지, 또 그 순서는 어떻게 되는지를 지정하는 정수 값이다.  
음의정수 : 서블릿 컨테이너가 정한 임의의 시점  
여래개의 서블릿이 등록되면, 작은수가 먼저 만들어짐

## 1.2 IoC/DI를 위한 빈 설정 메타정보 작성
XML,애노테이션,자바코드 -> BeanDefinition -> IoC 컨테이너 (애플리케이션)

### 1.2.1 빈 설정 메타정보
- beanClassName
- parentName
- factoryBeanName
- factoryMethodName
- scope
- lazyInit
- dependsOn
- autowireCandidate
- primary
- abstract
- autowireMode
- dependencyCheck
- initMethod
- destoryMethod
- propertyValues
- constructorArgumentValues
- annotationMetadata
    
### 1.2.2 빈 등록 방법
- XML : `<bean>` 태그
- XML : 네임스페이스와 전용 태그 (ex : aop)
- 자동인식을 이용한 빈 등록 : 스테레오타입 애노테이션과 빈 스캐너
    * `<context:component-scan>` 이 태그에 의해 등록된 빈 오브젝트가 빈스캐너로 동작하면서 인식된 클래스를 빈으로 등록해준다.
- 자바 코드에 의한 빈 등록 : @Configuration 클래스의 @Bean 메소드
    * @Configuration 의 메타 애노테이션에 @Component가 있기 때문에 빈 스캐너 애노테이션 필터를 통과한다.
- 자바 코드에 의한 빈 등록 : @Bean 메소드
    * @Bean 메소드 안에서 호출하여 생성하는 객체는 싱글톤이 되지 않으므로 사용에 주의
      
#### XML과 빈 스캐닝 혼용
빈 스캐닝은 한 번에 최상위 패키지를 지정해서 하는 것이니 자칫 하면 
양쪽 컨텍스트의 빈 스캐너가 같은 클래스를 중복해서 빈으로 등록해버릴 수 있다.

XML과 빈스캐닝을 함께 사용하는 경우는 XML을 사용하는 애플리케이션 컨텍스트를 기본으로 하고,
다음과 같이 빈 스캐너를 context 스키마의 `<context:component-scan>` 태그를 이용해 등록해주면된다.
    
### 1.2.3 빈 의존관계 설정 방법
- XML : `<property>`, `<constructor-arg>`
- XML : 자동와이어링
    * byName
    * byType
- XML : 네임스페이스와 전용 태그
- 애노테이션 : @Resource
    * `<propeyty>` 선언과 비슷하게 주입할 빈 아이디로 지정하는 방법
    * setter 메소드 
    * 필드
- 애노테이션 : @Autowired/@Inject
    * @Autowired , @Inject 그 의미나 사용법은 거의 동일하다.
    * @Autowired는 스프링 2.5 부터 적용된 스프링 전용 애노테이션
    * @Inject JavaEE6 표준 스펙인 JSR-330(Dependuncy Injection for Java)에 정의 된 것
    * 수정자메소드와 필드
    * 생성자 
    * 일반메소드
    * 컬렉션과 배열
    * 같은 타입의 빈이 하나 이상 존재할때 그 빈들을 모두 DI 받도록 할 수 있다.
    * @Qualifier 타입 외 정보를 추가해서 자동와이어링을 세밀하게 제어할 수 있는 보조적인 방법

### 1.2.4 프로퍼티 값 설정 방법
XML 에서 properties 파일 지정
`<context:property-placeholder location="class:database.properties"/>`

#### SpEL
`<util:properties id="dbprops" location="classpath:database.properties" />`  
`#{dbprops['db.username']}`

### 1.2.5  컨테이너가 자동등록하는 빈
스프링 컨테이너는 초기화 과정에서 몇 가지 빈을 기본적으로 등록해준다.

- ApplicationContext 
- BeanFactory
- ResourceLoader
- ApplicationEventPublisher
- systemProperties
- systemEnvironment

## 1.3 프로토타입과 스코프
기본적으로 스프링의 빈은 싱글톤으로 만들어진다.
때로는 싱글톤이 아닌 다른 방법으로 만들어 사용해야 할 때가 있다.
싱글톤이 아닌 빈은 크게 두가지로 나눌 수 있다. 프로토타입 빈과 스코프 빈이다.

### 1.3.1 프로토타입 스코프
@Scope("prototype")
애노테이션을 이용해 프로토 타입 빈 생성
프로토타입 빈은 코드에서 new로 오브젝트를 생성하는 것 대신하기 위해 사용된다.
new를 사용하지 않는 이유는 프로토타입 빈에서 DI를 할경우 컨텍스트에 생성을 요청하니까
프로토타입 빈이 DI방식으로 사용되는 경우는 매우 드물다.
DL방식으로 사용해야한다는 뜻
      
### 1.3.2 스코프
#### 스코프의 종류  
싱글톤 , 프로토타입 , 요청(request) , 세션(session), 글로벌세션 (globalsession), 애플리케이션(application)

- 싱글톤과 프로토타입을 제외한 네가지 스코프는 모두 웹환경에서만 의미 있다.
- 글로벌세션 스코프는 포틀릿에만 존재하는 글로벌 세션에 저장되는 빈이다.
- 스프링에서는 Scope 인터페이스를 구현해서 새로운 스코프를 작성할 수 있다.(복잡함)
- 스프링 웹 플로우나 제이보스 씸(seam)과 가은 프레임워크를 이용하면 됨

## 1.4 기타 빈 설정 메타정보
### 1.4.1 빈이름
### 1.4.2 빈 생명주기 메소드
초기화 메소드  - @PostConstruct
제거메소드 - @PreDestroy

### 1.4.3 팩토리 빈과 팩토리 메소드
팩토리빈  
생성자 대신 오브젝트를 생성해주는 코드의 도움을 받아서 빈 오브젝트를 생성

## 1.5 스프링 3.1의 IoC 컨테이너와 DI
### 1.5.1 빈의 역활과 구분
#### 애플리케이션 로직 빈
#### 애플리케이션 인프라 빈
#### 컨테이너 인프라 빈

`<context:annotation-config />`  
@Configuration/@Bean, @Autowired , @PostConstruct 설정해준다.

`<context:componet-scan base-package="..." />`  
componet-scan만 선언하면 annotation-config를 포함한다. 
  
### 1.5.2 컨테이너 인프라 빈을 위한 자바 코드 메타정보
자바코드 설정을 사용하는 것이므로 기본적으로 @Configuration이 붙은 클래스가 필요하다.  
@Configuration 클래스는 각각 하나의 XML 파일과 같다고 볼 수 있다.

`@ComponentScan("springbook.learningtest.spring31.ioc.scanner")`  
`<context:component-scan>`

`@EnableTranscationManagement`  
`<tx:annotation-driven/>` 태그와 동일한 기능을 수행한다.   
@Transactional로 트랜잭션 속성을 지정할 수 있게 해주는 AOP 관련 빈을 등록해주는 것이다.

### 1.5.3 웹 애프리케이션의 새로운 IoC 컨테이너 구성
루트 애플리케이션 컨텍스트 등록
```xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath*:egovframework/spring/context-*.xml</param-value>
</context-param>

<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```   

AppConfig 클래스를 빈 설정 메타정보로 해서 루트 어플리케이션 컨텍스트가 생성될도록 해보자.
XML 파일 대신 @Configuration 클래스를 설정정보로 사용한다.

```xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>myproject.config.Appconfig</param-value>
</context-param>

<context-param>
    <param-name>contextClass</param-name>
    <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
</context-param>
```

서블릿 컨텍스트 등록
```xml
<servlet>
    <servlet-name>action</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/config/egovframework/springmvc/dispatcher-servlet.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>      

<servlet>
    <servlet-name>action</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextClass</param-name>
        <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </init-param>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>myproject.config.WebConfig</param-value>
    </init-param>          
</servlet>          
```
### 1.5.4 런타임 환경 추상화와 프로파일
런타임 환경은 애플리케이션 컨텍스트에 새롭게 도입된 개념이다. 컨텍스트 내부에 Environment 인터페이스를
구현한 런타임 환경 오브젝트가 만들어져서 빈을 생성한거나 의존관계를 주입할 때 사용된다.
런타임 환경은 프로파일(profile)과 프로퍼티 소스(property source)로 구성된다.
    
### 1.5.5 프로퍼티 소스
#### 스프링에서 사용되는 프로퍼티의 종류
- 환경변수
- 시스템 프로퍼티
    * JVM 레벨에 정의된 프로퍼티를 말한다.
- JNDI
- 서블릿 컨텍스트 파라미터
```xml
<context-param>
    <param-name>db.username</param-name>
    <param-value>spring</param-value>
</context-param>
```
- 서블릿 컨피그 파라미터
개별 서블릿 컨텍스트에만 영향을 준다.
```xml
<servlet>
    <servlet-name>smart</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>temp.folder</param-name>
        <param-value>/tmp</param-value>
    </init-param>
</servlet>
```
## 1.6 정리
스프링 애플리케이션은 POJO 클래스와 빈 설정 메타정보로 구성된다.
스프링의 빈 등록방법은 크게 XML과 빈 자동인식,자바코드 세가지로 구분할 수 있다.

