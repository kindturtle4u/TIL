> 출처 : 토비의 스프링 3.1 Vol.1 읽으면서 정리

# 6장 AOP
AOP는 IoC/DI , 서비스 추상화와 더불어 스프링의 3대 기반 기술의 하나다.  
AOP는 스프링의 기술 중에서 가장 이해하기 힘든 난해한 용어와 개넘을 가진 기술로 악명이 높다.

## 6.1 트랜잭션 코드의 분리
### 6.1.1 메소드 분리
### 6.1.2 DI를 이용한 클래스의 분리

## 6.2 고립된 단위 테스트
### 6.2.1 복잡한 의존관계 속의 테스트
### 6.2.2 테스트 대상 오브젝트 고립시키기
### 6.2.3 단위 테스트와 통합 테스트
- 단위 테스트  
테스트 대상 클래스를 목 오브젝트 등의 테스트 대역을 이용해 의존 오브젝트나 외부의 리소스를 사용하지 않도록 고립시켜서 테스트하는 것

- 통합 테스트    
두개 이상의 성격이나 계층이 다른 오브젝트가 연동하도록 만들어 테스트 하거나, 또는 외부의 DB나 파일, 서비스 등의 리소스가 참여하는 테스트
두개 이상의 단위가 결합해서 동작하면서 테스트가 수행되는 것
    
### 6.2.4 목 프레임워크
Mockito 프레임워크  
간단한 메소드 호출만으로 다이내믹하게 특정 인터페이스를 구현한 테스트용 목 오브젝트를 만들 수 있다.

## 6.3 다이나믹 프록시와 팩토리 빈
### 6.3.1 프록시와 프록시 패턴, 데코레이터 패턴
데코레이터 패턴  
자바 IO 패키지의 InputStream과 OutputStream 구현 클래스는 데코레이터 패턴이 사용된 대표적인 예다.

프록시 패턴  
구조적으로 보자면 프록시와 데코레이터는 유사하다. 다만 프록시는 코드에서 자신이 만들거나 접근할 타깃 클래스 정보를 알고 있는 경우가 많다.
    
### 6.3.2 다이내믹 프록시
자바에는 java.lang.reflect 패키지 안에 프록시를 손쉽게 만들 수 있도록 지원해주는 클래스들이 있다.  
일일이 프록시 클래스를 정의하지 않고도 몇가지 API를 이용해 프록시 처럼 동작하는 오브젝트를 다이내믹하게 생성하는 것이다.  

### 6.3.3 다이내믹 프록시를 이용한 트랜잭션 부가기능
### 6.3.4 다이내믹 프록시를 위한 팩토리 빈
스프링은 내부적으로 리플렉션 API를 이용해서 빈 정의에 나오는 클래스 이름을 가지고 빈 오브젝트를 생성한다.

### 6.3.5 프록시 팩토리 빈 방식의 장점과 한계

## 6.4 스프링의 프록시 팩토리 빈
### 6.4.1 ProxyFactoryBean
스프링은 프록시 오브젝트를 생성해주는 기술을 추상화한 팩토리 빈을 제공해준다.
스프링의 ProxyFactoryBean은 프록시를 생성해서 빈 오브젝트로 등록하게 해주는 팩토리 빈이다.

- 어드바이스 : 타깃이 필요 없는 순수한 부가기능  
부가기능을 담은 오브젝트를 스프링에서는 어드바이스(advice)라고 부른다.  
타깃 오브젝트에 종속되지 않는 순수한 부가기능을 담은 오브젝트  
- 포인트 컷 : 부가기능 적용대상 메소드 선정 방법
- 어드바이저 = 포인트컷(메소드 선정 알고리즘) + 어드바이스(부가기능)
    
### 6.4.2 ProxyFactoryBean 적용

## 6.5 스프링AOP
### 6.5.1 자동 프록시 생성
### 6.5.2 DefaultAdvisorAutoProxyCreator의 적용
### 6.5.3 포인트컷 표현식을 이용한 포인트컷
포인트컷 표현식
AspectJExpressionPointcut 클래스를 사용하면된다.

execution([접근제한자 패턴] 타입패턴 [타입패턴.]이름패턴 (타입패턴 | ".." ,...) [throw 예외 패턴])

- [접근제한자 패턴]
    * public,private 과 같은 접근제한자 , 생략가능
- 타입 패턴 
    * 리턴 값의 타입 패턴
    * 생략 불가능한 필수항목이다.
    * *를 써서 모든 타입을 다 선택하겠다고 해도 된다.
- [타입패턴.]이름패턴 
    * 패키지와 클래스 이름에 대한 패턴. 
    * 생략가능하다. 
    * 사용할때는 .을 두어서 연결해야한다.
    * 이름패턴은 필수 값이다
- (타입패턴 | ".." , ...) 
    * 파라미터의 타입 패턴을 순서대로 넣을 수 있다. 
    * 와일드카드를 이용해서 파라미터 개수에 상관없는 패턴을 만들수 있다.
- [throws 예외 패턴]
    * 예외 이름 패턴

System.out.println(Target.class.getMethod("minus",int.class,int.class));  
public int springbook.learningtest.spring.pointcut.Target.minus(int,int) throws java.lang.RuntimeException  

execution(* minus(int,int))  
리턴 타입은 상관 없이 minus라는 메소드 이름, 두개의 int 파라미터를 가진 모든 메소드를 선정하는 포인트 컷 표현식

execution(* minus(..))  
리턴 타입과 파라미터의 종료,개수에 상관없이 minus라는 메소드 이름을 가진 모든 메소드를 선정하는 포인트컷 표현식

execution(* *(..))  
리턴 타입,파라미터,메소드 이름에 상관없이 모든 메소드 조건을 다 허용하는 포인트 컷 표현식

```xml
<bean id="transcationPointcut" class="org.springframework.aop.aspectj.AspectJExpressionPointcut">
  <property name="expression" value="execution(* *..*ServiceImpl.upgrade*(..))" />
</bean>
```

스프링 개발팀이 제공하는 스프링 지원 툴을 사용하면 아주 간단히 포인트컷이 선정한 빈이 어떤 것인지 한눈에 확인하는 방법이 있다.
    
### 6.5.4 AOP란 무엇인가?
AOP : 애스펙트 지향 프로그래밍
독립적인 모듈화가 불가능한 부가기능을 어떻게 모듈화 할 것인가를 연구해온 사람들은 , 이 부가기능 모듈화 작업은 기존의 객체지향 설계
패러다음과는 구분되는 새로운 특성이 있다고 생각했다. 

애플리케이션의 핵심적인 기능에서 부가적인 기능을 분리해서 애스펙트라는 독특한 모듈로 만들어서 설계하고 개발하는 방법을 
애스펙트 지향 프로그램(Aspect Oriented Programming) 또는 약자로 AOP라고 부른다.

### 6.5.5 AOP 적용기술
스피링은 IoC/DI 컨테이너와 다이내믹 프록시, 데코레이터 패턴 , 프록시 패턴, 자동 프록시 생성 기법, 빈 오브젝트 후처리 조작 기법등
다양한 기술을 조합해 AOP를 지원하고 있다.

### 6.5.6 AOP의 용어
- 타깃 (target)  
타깃은 부가기능을 부여할 대상

- 어드바이스 (advice)  
타깃에게 제공할 부가기능을 담은 모듈이다

- 조인포인트 (join point)  
어드바이스가 적용될 수 있는 위치를 말한다.  
스프링의 프록시 AOP에서 조인 포인트는 메소드의 실행 단계 뿐이다.  
타깃 오브젝트가 구현한 인터페이스의 모든 메소드는 조인 포인트가 된다.  

- 포인트 컷(pointcut)
어드바이스를 적용할 조인포인트를 선별하는 작업 또는 그 기능을 정의한 모듈을 말한다.  

- 프록시 (proxy)  
클라이언트와 타깃 사이에 투명하게 존재하면서 부가기능을 제공하는 오브젝트다.  

- 어드바이저 (advisor)  
어드바이저는 포인트컷과 어드바이스를 하나씩 갖고 있는 오브젝트다.  
어드바이저는 어떤 부가기능(어드바이스)을 어디에(포인트컷) 전달할 것인가를 알고 있는 AOP의 가장 기본이 되는 모듈이다.  

- 애스펙트 (aspect)
OOP의 클래스와 마찬가지로 애스펙트는 AOP의 기본 모듈이다.  
한개 또는 그이상의 포인트컷과 어드바이스의 조합으로 만들어지며 보통 싱글톤 형태의 오브젝트로 존재한다.  
      
### 6.5.7 AOP 네입스페이스
스프링의 프록시 방식 AOP를 적용하려면 최소한 네가지 빈을 등록해야 한다.

- 자동 프록시 생성기  
스프링의 DefaultAdisorAutoProxyCreator 클래스를 빈으로 등록한다.
      
- 어드바이스  
부가기능을 구현한 클래스를 빈으로 등록한다.
      
- 포인트 컷  
스프링의 AspectJExpressionPointcut을 빈으로 등록하고 expression 프로퍼티에 포인트컷 표현식을 넣어주면 된다.

- 어드바이저  
스프링의 DefaultPointcutAdvisor 클래스를 빈으로 등록해서 사용한다.

xmlns:aop=http://www.springframework.org/schema/aop //aop 스키마는 aop네임스페이스를 가지므로 aop접두어를 사용한다.

```xml
<aop:config> <!--AOP설정을 담는 부모 태그다. 필요에 따라 AspectJAdvisorProxyCreator 빈으로 등록해준다.-->
    <aop:pointcut id="transactionPointcut" expression="execution(* *..*ServiceImple.upgrade*(..))" /> <!--expression의 표현식을 프로퍼티로 가진 AspectJExpressionPoincut을 빈으로 등록해준다.-->
    <aop:advisor advice-ref="transactionAdvice" pointcut-ref="transactionPointcut" /> <!--advice와 pointcut의 ref를 프로퍼티로 갖는 DefaultBeanFactoryPointcutAdvisor를 등록해준다.-->
</aop:config>
```
    
## 6.6 트랜잭션 속성
### 6.6.1 트랜잭션 정의
트랜잭션 전파 transcation propagation  
트랜잭션의 경계에서 이미 진행중이 트랜잭션이 있을 때 또는 없을 때 어떻게 동작할 것인가를 결정하는 방식을 말한다.

- PROPAGATION_REQUIRED  
진행 중인 트랜잭션이 없으면 새로 시작,이미 시작된 트랜잭션이 있으면 이에 참여

- PROPAGATION_REQUIRES_NEW  
항상 새로운 트랜잭션을 시작한다.

- PROPAGATION_NOT_SUPPORTED  
트랜잭션 없이 동작하도록 만들수 있다

- 격리수준 isolation level  
적절하게 격리 수준을 조정해서 가능한 한 많은 트랜잭션을 동시에 진행 시키면서도 문제가 발생하지 않게 하는 제어가 필요하다.

- 제한시간  
트랜잭션을 수행하는 제한시간을 설정 할 수 있다.

- 읽기전용  
읽기전용으로 설정해두면 트랜잭션 내에서 데이터를 조작하는 시도를 막아줄 수 있다.  
또한 데이터 액새스 기술에 따라서 성능이 향상될 수도 있다.

### 6.6.2 트랜잭션 인터셉터와 트랜잭션 속성
메소드 이름 패턴을 이용한 트랜잭션 속성 지정  
Properties 타입의 transactionAttributes 프로퍼티는 메소드 패턴과 트랜잭션 속성을 키와 값으로 갖는 컬렉션이다.  

PROPAGATION_NAME, // 트랜잭션 전파방식. 필수항목이다. PROPAGATION_으로 시작한다.  
ISOLATION_NAME, // 격리수준,ISOLATION_으로 시작한다. 생략가능하다. 생략되면 디폴트 격리수준으로 지정된다.  
readOnly, // 읽기전용 항목. 생략 가능하다. 디폴트는 읽기전용이 아니다.  
timeout_NNNN,//제한시간. timout_으로 시작하고 초단위 시간을 뒤에 붙인다. 생략가능하다.  
-Exception1, //체크예외중에서 롤백대상으로 추가할 것을 넣는다. 한개이상 등록할수 있다.  
+Exception2 // 런타임예외지만 롤백시키지 않을 예외를 넣는다. 한개 이상 등록 할 수 있다.  

### 6.6.3 포인트컷과 트랜잭션 속성의 적용 전략
```xml
<tx:advice id="transactionAdvice">
    <tx:attributes>
        <tx:method name="get*" read-only="true" />  <!--get으로 시작하는 메스드에 대해서는 읽기전용 속성을 부여한다. 이메소드가 트랜잭션의 실제 시작위치가 아니라면 읽기전용 속성은 무시된다.-->
        <tx:method name="*" />  <!--get으로 시작하지 않는 나머지 메소드에는 기본 트랜잭션 속성을 지정한다. 순서가 뒤바뀌지 않도록 주의한다.-->
    </tx:attributes>
</tx:attributes>

<aop:config>
    <aop:advisor advice-ref="transactionAdvice" pointcut="bean(*Service)" />
    <aoP:advisor advice-ref="batchTxAdvice" pointcut="execution(a.b.*BatchJob.*.(..))" />
</aop:config>

<tx:advice id="transcationAdvice">
    <tx:attributes>...</tx:attributes>
</tx:attributes>

<tx:advice id="batchTxAdvice">
    <tx:attributes>...</tx:attributes>
</tx:attributes>
```

프록시 방식 AOP는 같은 타깃 오브젝트 내의 메소드를 호출할 때는 적용되지 않는다.  
해결책  
1. 스프링API를 이용해 프록시 오브젝트에 대한 레퍼런스를 가져온뒤에 같은 오브젝트의 메소드 호출도 프록시를 이용하도록 강제하는 방법이다.  
2. AspectJ와 같은 타깃 바이트 코드를 직접 조작하는 방식으로 AOP 기술을 적용하는것이다.  
하지만 그만큼 다른 불편도 뒤따르기 때문에 꼭필요한 경우에만 사용해야한다. AspectJ를 통한 AOP방법은 14장에서 자세히 설명하겠다.

### 6.6.4 트랜잭션 속성 적용

## 6.7 애노테이션 트랜잭션 속성과 포인트 컷
클래스나 메스드에 따라 제각각 속성이 다른, 세밀하게 튜닝된 트랜잭션 속성을 적용해야 하는 경우도 있디.
이런 경우라면 메소드 이름 패턴을 이용해서 일괄적으로 트랜잭션 속성을 부여하는 방식은 적합하지 않다.
세밀한 트랜잭션 속성의 제어가 필요한 경우를 위해 스프링이 제공하는 다른 방법이 있다.
직접 타깃에 트랜잭션 속성정보를 가진 애노테이션을 지정하는 방법이다.

### 6.7.1 트랜잭션 애노테이션 
```java
@Transactional
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Transactional 
```

데체 정책  
스프링은 @Transcational을 적용할때 4단계의 대체(fallback) 정책을 이용하게 해준다.    
1. 타깃메소드의 @Transcational이 찾음  
2. 타깃 클래스의 @Transcational 찾음  
3. 인터페이스의 선언 메소드의 @Transcational이 찾음  
4. 인터페이스의 선언 타입 @Transcational이 찾음  

트랜잭션 애노테이션 사용을 위한 설정  
```xml
<tx:annotation-driven />
```

### 6.7.2 트랜잭션 애노테이션 적용

## 6.8 트랜잭션 지원 테스트
### 6.8.1 선언적 트랜잭션과 트랜잭션 전파 속성
선언적 트랜잭션(decalarative transaction)  
AOP를 이용해 코드 외부에서 트랜잭션의 기능을 부여해주고 속성을 지정할 수 있게 하는 방법

프로그램에 의한 트랜잭션(programmatic transaction)  
TranscationTemplate이나 개별 데이터 기술의 트랜잭션 API르 사용해 직접 코드안에서 사용하는 방법

### 6.8.2 트랜잭션 동기화와 테스트
### 6.8.3 테스트를 위한 트랜잭션 애노테이션

- @Transactional  
테스트에 적용될 경우 트랜잭션을 강제로 롤백시키도록 정의되어있다.
  
- @Rollback  
테스트가 끝나면 자동으로 롤백됨.  
커밋을 원할경우 @Rollback(false)로 설정하면됨
  
- @TransactionConfiguation  
롤백에 대한 공통 속성을 지정. 디폴트 롤백 속성은 false로 해두고 , 테스트 메소드 중 일부만 롤백을 적용하고 싶으면
메소드에 @Rollback을 부여해주면 된다.
  
- @NotTransactional을   
테스트 메소드에 부여하면 클래스 레벨의 @Transactional 설정을 무시하고 트랜잭션을 시작하지 않은 채로 테스트를 진행한다.
스프링 3.0 에서 제거 대상 , @Transcational(propagation=Propagation.NAVER)을 대신 사용

## 6.9 정리
포인트 컷은 AspectJ 포인트 컷 표현식을 사용해서 작성하면 편리하다.  
AOP는 OOP만으로는 모듈화하기 힘든 부가기능을 효과적으로 모듈화하도록 도와주는 기술이다.  
AOP를 이용해 트랜잭션 속성을 지정하는 방법에는 포인트컷 표현식과 메소드 이름패턴을 이용하는 방법과
타깃에 직접 부여하는 @Transcational 애노테이션을 사용하는 방법이 있다.
