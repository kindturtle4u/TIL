> 출처 : 토비의 스프링 3.1 Vol. 2 읽으면서 정리

# 4장 스프링 @MVC
애노테이션을 중심으로 한 새로운 MVC의 확장 기능은 @MVC라는 별칭으로도 불린다.

## 4.1 @RequestMapping 핸들러 매핑
@MVC의 가장 큰 특징은 핸들러 매핑과 핸들러 어댑터의 대상이 오브젝트가 아니라 메소드라는 점이다.

### 4.1.1 클래스/메소드 결합 
### 4.1.2 타입 상속과 매핑

## 4.2 @Controller
### 4.2.1 메소드 파라미터의 종류
- HttpServletRequest
- HttpServletResponse
- HttpSession
- WebRequest
    * 서블릿 API에 종속적이지 않은 오브젝트 타입
- NativeWebRequest
    * WebRequest 내부에 감춰진 HttpServletRequest와 같은 환경종속적인 오브젝트를 가져올수있음
- Locale
- InputStream
- Reader
- OutputStream
- Writer
- @PathVariable
- @RequestParam
- @CookieValue
- @RequestHeader
- Map
- Model
- ModelMap

- @ModelAttribute
    * 스프링은 String, int 등은 @RequestParam으로 보고    
      그외의 복잡한 오브젝트는 모두 @ModelAttribute가 생략됬다고 간주한다.   
      컨트롤러가 리턴하는 모델에 파라미터로 전달한 오브젝트를 자동으로 추가 해준다.
- Errors,BindingResult
- SessionStatus
- @RequestBody
    * AnnotationMethodHandlerAdapter에는 HttpMessageConverter타입의 메세지 변환기가 여러개 등록되어있다.      
    @Requestbody가 붙은 파라미터가 있으면 HTTP 요청의 미디어 타입과 파라미터 타입을 먼저 확인한다.
- @CookieValue
- @Valid
    
### 4.2.2 리턴타입의 종류
자동 추가 모델 오브젝트와 자동생성 뷰 이름 메소드 파라미터 중에서 @ModelAttribute를 붙인 모델 오브젝트나 
단순 타입이 아니라서 커맨드 오브젝트로 처리되는 오브젝트라면 자동으로 컨트롤러가 리턴하는 모델에 추가된다.

- Map,Model,ModelMap 파라미터
- @ModelAttribute 메소드
- BindingResult

### 4.2.3 @SessionAttributes와 SessionStatus
- @SessionAttributes    
    * 컨트롤러 메소드가 생성하는 모델정보 중에서 @SessionAttributes에 지정한 이름과 동일한 것이 있다면 이를 세션에 저장해준다.
    * @ModelAttribute가 지정된 파라미터가 있을때 이 파라미터에 전달해줄 오브젝트를 세션에서 가져오는 것이다. 
      세션에 저장된 오브젝트를 가져와 폼에서 전송해준 파라미터만 바인딩한 뒤에 넘겨줌
        
- SessionStatus
    * @SessionAttribute를 사용할때는 더 이상 필요 없는 세션 애트리뷰트를 코드로 제거 해줘야 한다는 점을 잊지말자.
    * SessionStatus.setComplete(); 현재 컨트롤러에 의해 세션에 저장된 정보를 모두 제거해준다.

## 4.3 모델바인딩과 검증
컨트롤러 메소드에 @ModelAttribute가 지정된 파라미터를 @Controller 메소드에 추가하면 크게 세가지 작업이 자동으로 진행된다.
- 파라미터 타입의 오브젝트를 만든다. 
- 준비된 모델 오브젝트의 프로퍼티에 웹 파라미터를 바인딩 해주는 것인다.
- 모델의 값을 검증하는 것이다.

### 4.3.1 PropertyEditor
- 디폴트 프로퍼티 에디터
- 커스텀 프로퍼티 에디터  
    스프링이 디폴트로 등록해서 적용해주는 프로퍼티 에디터는 자바의 기본적인 타입 20여 가지에 불과하다.    
    애플리케이션에서 직접 정의한 타입으로 직접 바인딩을 하고 싶다면, 프로퍼티 에디터를 직접 작성하면된다.        

- @InitBinder   
    @MVC에는 스프링 컨테이너에 정의된 디폴트 프로퍼티 에디터만 등록되어 있다.  
    여기에 커스텀프로퍼티에디터를 추가해서 타입 변환이 필요할 때 사용되도록 만들어야 한다.
   
    * AnnotationMethodHandlerAdapter는 @RequestParam이나 @ModelAttribute,@PathVariable 등 파라미터변수에 바인딩해주는
    작업이 필요한 애노테이션을 만나면 먼저 WebDataBinder를 만든다.
    * 개발자가 직접 만든 커스텀 프로퍼티 에디터를 @RequestParam과 같은 메소드 파라미터 바인딩에 적용하려면
    `WebDataBinder`에 프로퍼티 에디터를 직접 등록해줘야 한다. 
    `@InitBinder`가 붙은 initBinder() 메소드는 메소드는 메소드 파라미터를 바인딩하기 전에 자동으로 호출된다.
    
        ```java
        @InitBinder
        public void initBinder(WebDataBinder dataBinder) { 
            dataBinder.registerCustomEditor(Level.class , new LevlePropertyEditor());  
        }
        ```
- WebBindingInitializer    
`@InitBinder` 메소드에서 추가한 커스텀 프로퍼티 에디터는 메소드가 있는 컨트롤러 클래스 안에서만 동작한다.   
**모든 컨트롤러에 적용이 필요한경우 WebBindingInitializer를 이용하면 된다.**    
    
    ```java
    public class MyWebBindingInitializer implements WebBindingInitializer {
      public void initBinder(WebDataBinder binder , WebRequest request) { 
          binder.registerCustomEditor(Level.class , new LevelPropertyEditor());
      }
    }
    ```
- 프로토타입 빈 프로퍼티 에디터
***프로퍼티 에디터는 싱글톤 빈으로 등록해서 공유해서는 안된다(멀티스레드 환경 적용 불가)***   
프로퍼티 에디터가 다른 빈을 DI받을 수 있도록 자신도 빈으로서 등록되면서 동시에 매선 새로운 오브젝트를 만들어서 사용할 수 
있으려면 프로토타입 스코프의 빈으로 만들어져야 한다.

### 4.3.2 Converter와 Formatter
**스프링 3.0에는 PropertyEditor를 대신할 수 있는 새로운 타입 변환 API가 도입됐다. 바로 `Converter` 인터페이스다.***
멀티스레드 환경에서 안전하게 공유해서 사용가능

- Converter   
양방향 전환 기능을 제공하는 `PropertyEditor`와 다르게 `Converter` 메소드는 소스타입에서 타깃 타입으로의 단반향 변환만 지원한다.

    ```java
    public interface Converter<S, T> {
        T convert(S Source);
    }
    ```
- Formatter와 FormattingConversionService   
스트링 타입의 폼 필드 정보와 컨트롤러 메소드 파라미터 사이에 양방향으로 적용할 수 있도록 두개의 변환 메소드를 갖고 있다.

    * @NumberFormat   
    다양한 타입의 숫자 변환을 지원하는 포멧터다. 문자열로 표현된 숫자를 java.lang.Number 타입의 오브젝트로 상호 변환해준다.
        ```java
        class product {
          @NumberFormat("$###,##0.00")
          BigDecimal price;
        }
        ```
    * @DateTimeFormat   
- 바인딩 기술의 적용 우선순위와 활용전략
    * 사용자 정의 타입의 바인딩을 위한 일괄 적용 : Converter
    * 필드와 메소드 파라미터,애노테이션 드으이 메타정보를 활용하는 조건부 변환 기능 : ConditionalGenericConverter
    * 애노테이션 정보를 활용한 HTTP 요청과 모델 필드 바인딩 : AnnotaionFormatterFactory와 Formatter
    * 특정 필드에만 적용되는 변환 기능 : PropertyEditor
      
### 4.3.3 WebDataBinder 설정항목
WebDataBinder는 HTTP 요청정보를 컨트롤러 메소드의 파라미너타 모델에 바인딩 할때 사용되는 바인딩 오브젝트다.

- allowedField , disallowedFields
- requiredFields
- fieldMarkerPrefix
- fieldDefaultPrefix

### 4.3.4 Validator와 BindingResult, Errors

- Validator   
    스프링에서 범용적으로 사용할 수 있는 오브젝트 검증기를 정의 할 수 있는 API다.   
    @Controller로 HTTP 요청을 @ModelAttribute 모델에 바인딩 할 때 주로 사용된다.   
    비지니스 로직에서 검증로직을 분리하고 싶을 때도 사용할 수 있다.
    ```java
    public interface Validator {
        boolean supports(Class<?> clazz);
        void validate(Object target, Errors errors);
    }
    ```
    스프링에서는 네 가지 방법으로 Validator를 적용할 수 있다.
    
    * 컨트롤러 메소드 내의 코드
        ```java
        @Controller
        public class UserController {
          @Autowired UserValidator validator;
          
          @RequestMapping("/add")
          public void add(@ModelAttribute User user, BindingResult result) {
              this.validator.validate(user, result);
              if (result.hasErrors()) {
                // 오류가 발견되 경우의 작업
              } else {
                  // 오류가 없을 때의 작업  
              }
          }     
        }
        ```   
      
    * Valid를 이용한 자동검증   
        ```java
        @Controller
        public class UserController {
            @Autowired UserValidator validator;
            
            @InitBinder
            public void initBinder(WebDataBinder dataBinder) {
                dataBinder.setValidator(this.validator);
            }
            
            @RequestMapping("/add")
            public void add(@ModelAttribute @Valid User user, BindingResult result) {
            }
        }
        ```
    * 서비스 계층 오브젝트에서 검증        
    * 서비스 계층을 활용하는 Validator
    
- JSR-303 빈 검증 기능    
    모델 오브젝트의 필드에 달린 제약조건 애노테이션을 이용해 검증을 진행할 수 있다.
    ```java
    public class User {
        @NotNull
        String name;
        
        @Min(0)
        int age;
    }
    ```
    EX ) @MemberNo 애노테이션 제약조건 정의     
   ```java
    @Target({ElementType.METHOD, ElementType.FIELD})
    @Retention(RetentionPolicy.RUNTIME)
    @Constraint(validateBy=MemberNoValidator.class)
    public @interface MemberNo {
    
    }   
    ```
  
- BindingResult와 MessageCodeResolver
- MesssageSource

### 4.3.5 모델의 일생
모델은 MVC 아키텍처에서 정보를 담당하는 컴포넌트다.

- 컨트롤러 메소드 부터 뷰까지
    * ModelAndView의 모델 맵   
        @ModelAttribute 오브젝트 뿐만아니라 바인딩과 검증 결과를 담은 BindingResult 타입의 오브젝트도 ModelAndView의 모델 맵에 자동으로 추가된다.
    * WebDataBinder에 기본적으로 등록된 MessageCodedResolver
    * 빈으로 등록된 MessageSource와 LocaleResolver
    * @SessionAttribute 세션 저장 대상 모델 이름
    * 뷰의 EL과 스프링 태그 또는 매크로
    
## 4.4 JSP 뷰와 form 태그
### 4.4.1 EL과 spring 태그 라이브러리를 이용한 모델 출력
- 스프링 SpEL   
    <%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>   
    <spring:eval&gt; 태그를 사용해서 모델이름이 포함된 표현식을 작성하면된다.   
    <spring:eval expression="user.name" />   
    
    SpEL은 오베젝트의 메소드 호출이 가능하다.   
    <spring:eval expression="user.toString()" />
    <spring:eval expression='new java.text.DecimalFormat("###,##0.00").format(user.point)' />   
    
- 지역화 메시지 출력
    <spring:message code="greeting" />
    <spring:message code="greeting" arguments="${user.name}" text="Hi"/> //text 디폴트 메세지 
    
### 4.4.2 spring 태그 라이브러리를 이용한 폼 작성
### 4.4.3 form 태그 라이브러리
- <form:form&gt;
- <form:input&gt;
- <form:label&gt;
- <form:errors&gt;
- <form:hidden&gt;
- <form:password&gt; , <form:textarea&gt;
- <form:checkbox&gt; , <form:checkboxes&gt;
- <form:radiobutton&gt; , <form:radiobuttons&gt;
- 커스텀 UI 태그 만들기
    
## 4.5 메시지 컨버터와 AJAX
메시지 컨버터는 파라미터의 `@RequestBody`와 메소드에 부여한 `@ResponseBody`를 이용해서 쓸 수 있다.

### 4.5.1 메시지 컨버터의 종류
- ByteArrayHttpMessageConverter       
- StringHttpMessageConverter
- FormHttpMessageConverter
- SourceHttpMessageConverter
- Jaxb2RootElementHttpMessageConverter
- MarshallingHttpMessageConverter
- MappingJacksonHttpMessageConverter

## 4.6 MVC 네입스페이스
- <mvc:annotation-driven&gt;   
    애노테이션 방식의 컨트롤러를 사용할때 필요한 DispatcherServlet 전략 빈을 자동으로 등록해준다.
    
    * DefaultAnnotationHandlerMapping
    * AnnotationMethodHandlerAdapter
    * ConfigurableWebBindingInitializer
    * 메시지 컨버터
    * <spring:eval&gt;을 위한 번버전 서비스 노출용 인터셉터      
    * validator
    * conversion-service
    
- <mvc:interceptors&gt;   
    ```xml
    <mvc:interceptors>
        <mvc:interceptor>
            <mvc:mapping path="/admin/*"/>
            <bean class="...AdminInterceptor" />
        <mvc:interceptor>
    </mvc:interceptors>
    ```
- <mvc:view-controller&gt;      

## 4.7 @MVC 확장포인트
### 4.7.1 AnnotaionMethodHandlerAdapter
- SessionAttributeStore
- WebArgumentResolver   
    애플레케이션에 특화된 컨트롤러 파라미터 타입을 추가할 수 있다.
    ```java
    pulbic interface WebArgumentResolver {
        Object UNRESOLVED = new Object();
        Object resolveArgument(MethodParameter methodParameter, NativeWebRequest webRequest ) throws Exception;
    }
    ```    
  메소드 파라미터 정보와 웹 요청정보를 받아서 파라미터 타입과 애노테이션을 참고해 오브젝트를 생성할 수 있으면 이를 리턴하고, 
  아니라면 `UNRESOLVED`를 돌려주면된다.
  
 - ModelAndViewResolver
 
