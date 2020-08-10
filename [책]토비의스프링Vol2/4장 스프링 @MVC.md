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
자동 추가 모델 오브젝트와 자동생성 뷰 이름 메소드 파라미터 중에서 @ModelAttribute를 붙인 모델 오브젝트나 단순 타입이 아니라서 커맨드 오브젝트로 처리되는 오브젝트라면 자동으로 컨트롤러가 리턴하는 모델에 추가된다.

- Map,Model,ModelMap 파라미터
- @ModelAttribute 메소드
- BindingResult

### 4.2.3 @SessionAttributes와 SessionStatus
- @SessionAttributes    
    * 컨트롤러 메소드가 생성하는 모델정보 중에서 @SessionAttributes에 지정한 이름과 동일한 것이 있다면 이를 세션에 저장해준다.
    * @ModelAttribute가 지정된 파라미터가 있을때 이 파라미터에 전달해줄 오브젝트를 세션에서 가져오는 것이다. 세션에 저장된 오브젝트를 가져와 폼에서 전송해준 파라미터만 바인딩한 뒤에 넘겨줌
        
- SessionStatus
    * @SessionAttribute를 사용할때는 더 이상 필요 없는 세션 애트리뷰트를 코드로 제거 해줘야 한다는 점을 잊지말자.
    * SessionStatus.setComplete(); 현재 컨트롤러에 의해 세션에 저장된 정보를 모두 제거해준다.

## 4.3 모델바인딩과 검증