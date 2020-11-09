> 출처 : 토비의 스프링 3.1 Vol. 2 읽으면서 정리

# 5장 AOP와 LTW

## 5.1 애스펙트 AOP
### 5.1.1 프록시 기반 AOP
### 5.1.2 @AspectJ AOP
- AspectJ를 이용하기 위한 준비사항   
<aop:aspectj-autoproxy /&gt; 이 선언은 빈으로 등록된 클래스 중에서 클래스 레벨에 @Aspect가 붙은 것을 모두 애스펙트로 자동 등록해준다.   
AspectJ의 런타임 라이브러리를 클래스패스에 추개해줘야한다.

- @Aspect 클래스와 구성요소
    * 포인트컷: @Pointcut   
    @Pointcut 안에 포인트컷 표현식을 넣어서 정의한다. 
        
    * 어드바이스:@Before, @AfterReturning, @AfterThrowing, @After, @Around
    
- 포인트컷 메소드와 애노테이션
@Pointcut("execution(* sayHello(..))") private void hello();
    * execution()   
    가장 대표적. 접근제한자,리턴 타입, 타입,메소드,파라미터 타입,예외 타입 조건을 조합해서 메소드 단위까지 선택 가능한 가장
    정교한 포인트컷을 만들수있다.
    
    * within()   
    패턴만을 이용해 조인 포인트 메소드를 선택한다.
    @Pointcut(within("com.epril.myproject.dao..*"))
    
    * this, target   
    여러개의 타입을 고를 수 있는 타입 패턴이 아니라 하나의 타입을 지정하는 방식이다.   
    this - 프록시   
    target - 타겟클래스   
    this("springbook.learningtest.spring.aspect.HelloImpl")
    
    * args   
    메소드의 파라미터 타입만을 이용해 포인트컷을 설정할 때 사용한다. execution 지시자의 () 안에 들어가는 파라미터 타입과 동일하다고 보면된다.
    
    * @target , @within
    @target 지시자는 타깃 오브젝트에 특정 애노테이션이 부여된 것을 선정한다.   
    @target(org.springframework.stereotype.Controller)   
    @within은 @target과 유사하게 타깃 오브젝트의 클래스에 애노테이션이 부여된 것을 찾지만, 선택될 조인 포인트인 메소드는 타깃 클래스에서 선언되어 있어야한다.
    
    * @args   
        @DomainObject라는 애노테이션이 붙은 단일 파라미터를 갖는 메소드를 선택하는 포인트컷 표현식이다.   
        @args(com.epril.myproject.annotation.DomainObject)
           
    * @annotation   
        조인포인트 메소드에 특정 애노테이션이 있는 것만 선정하는 지시자다.   
        @annotation(org.springframework.transaction.annotation.Transactional)
    
    * bean   
        빈 이름 또는 아이디를 이용해서 선정하는 지시자, 와일드카드(*) 사용할 수 있다.   
        bean(*Service)
    
    * &&   
        두개의 포인트컷 또는 지시자를 AND 조건으로 결합한다.
    
    * ||, !
        ||는 OR 조건이다. !는 NOT조건이다.
    
- 어드바이스 메소드와 애노테이션
    * @Around   
        프록시를 통해서 타깃 오브젝트의 메소드가 호출되는 전 과정을 모드 담을 수 있는 어드바이스이다.   
        파라미터로는 ProceedingJoinPoint 타입으 오브젝트를 받는다. 이 오브젝트를 이용해 타깃 오브젝트의 메소드를 실행하고 그 결과를 받을 수 있다.            
        ```java
        @Around("myPointcut()")
        public Object doNothing(ProceedingJoinPoint pjp) throws Throwable {
            Object ret = pjp.proceed();
            return ret;
        }
        ```   
        proceed()메소드는 클라이언트가 보낸 파라미터를 그대로 사용해서 타깃 오브젝트의 메소드를 호출하고 그 결과를 돌려준다.   
    
    * @Before   
        타깃 오브젝트의 메소드가 실행되기 전에 사용되는 어드바이스다.
        ```java
        @Before("myPointcut()")
        public void logJoinPoint(JoinPoint jp) {
            System.out.println(jp.getSignature().getDeclaringTypeName());
            System.out.println(js.getSignature().getName());
            for(Object arg : jp.getArgs()) { System.out.println(arg);}
        }       
        ```
        `JoinPoint`의 getSignature()는 조인 포인트인 메소드에 대한 정보를 가진 Signature 오브젝트를 돌려준다.
        
    * @AfterReturning   
        타깃 오브젝트의 메소드가 실행을 마친 뒤 실행되는 어드바이스다. 단, 예외가 발생하지 않고 정상적으로 종료한 경우에만 해당된다.   
        메소드 리턴 값을 참조할 수 있다. 
        ```java
        @AfterReturning(pointcut="myPointcut()", returning="ret")
        public void logReturnValue(Object ret) {
          ...
        }  
        ```    
      
    * AfterThrowing   
        타깃 오브젝트의 메소드를 호출했을 때 예외가 발생하면 실행되는 어드바이스다.
        ```java
        @AfterThrowing(pointcut="dayLayer()" , throwing="ex")
        pulbic void logDAException(DataAccessException ex) {
          ...
        }
        ```
      
    * After   
        메소드 실행이 정상 종료됐을 때와 예외가 발생했을 때 모두 실행되는 어드바이스다. 코드에서 finally를 사용했을 때와 비슷한 용도라고 생각하면된다.
        
- 파라미터 선언과 바인딩
- AspectJ를 이용한 AOP의 학습 방법과 적용 전략

## 5.2 AspectJ와 @Configurable
### 5.2.1 AspectJ AOP
### 5.2.2 빈이 아닌 오브젝트에 DI 적용하기

## 5.3 로드타임 위버(LTW)
## 5.4 스프링 3.1의 AOP와 LTW
## 5.5 정리