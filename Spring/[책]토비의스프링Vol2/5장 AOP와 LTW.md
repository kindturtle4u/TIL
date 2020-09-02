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
    *        
    