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
       