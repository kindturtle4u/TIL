# 4장 스프링 @MVC
> 애노테이션을 중심으로 한 새로운 MVC의 확장 기능은 @MVC라는 별칭으로도 불린다.

## 4.1 @RequestMapping 핸들러 매핑
> @MVC의 가장 큰 특징은 핸들러 매핑과 핸들러 어댑터의 대상이 오브젝트가 아니라 메소드라는 점이다.

### 4.1.1 클래스/메소드 결합 
### 4.1.2 타입 상속과 매핑

## 4.2 @Controller
### 4.2.1 메소드 파라미터의 종류
- HttpServletRequest
- HttpServletResponse
- HttpSession
- WebRequest
    > 서블릿 API에 종속적이지 않은 오브젝트 타입
- NativeWebRequest
    > WebRequest 내부에 감춰진 HttpServletRequest와 같은 환경종속적인 오브젝트를 가져올수있음
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
    > 스프링은 String, int 등은 @RequestParam으로 보고    
      그외의 복잡한 오브젝트는 모두 @ModelAttribute가 생략됬다고 간주한다.   
      컨트롤러가 리턴하는 모델에 파라미터로 전달한 오브젝트를 자동으로 추가 해준다.
- Errors,BindingResult
- SessionStatus
- @RequestBody
    > AnnotationMethodHandlerAdapter에는 HttpMessageConverter타입의 메세지 변환기가 여러개 등록되어있다.      
      @Requestbody가 붙은 파라미터가 있으면 HTTP 요청의 미디어 타입과 파라미터 타입을 먼저 확인한다.
- @CookieValue
- @Valid