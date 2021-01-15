> 출처 : 모던웹을위한 HTML5+CSS3바이블 읽으면서 정리

# 11장 CSS 추가 규칙과 반응형 웹
## 11.1 규칙(@-rule)이란?
지금까지 배운 CSS 코드 중에서 코드 11-1의 font-face처럼 @가 붙은 단어를 본 적이 있습니다.
이를 스타일시트 용어로 규칙(@-rule)이라고 부릅니다.

## 11.2 @import 규칙
결과적으로 보면 같아 보일 수 있겠지만, 
사실은 Link 방식을 사용하는 것이 @import 방식을 사용하는 것보다 페이지의 로딩 속도 측면에서 뛰어나다.

> https://www.biew.co.kr/tag/Link%20%EB%B0%A9%EC%8B%9D%20vs%20%40import%20%EB%B0%A9%EC%8B%9D%20%EC%B0%A8%EC%9D%B4

## 11.3 @font-face 규칙
웹 폰트 업체에서 지원하지 않는 폰트는 자체적으로 지원해야 합니다.
@font-face 규칙은 이러한 웹 폰트를 생성할 때 사용하는 규칙입니다.

@font-face규칙
```css
@font-face {
    font-family: 'font name';
    src: url('/content/file.eot');
    src: local('file'), url('/content/file.woff') format('woff'),
        url('/content/file.ttf') format('truetype')
    
}
```

- @font-face 규칙에는 반드시 font-family 속성이 포함되어야 합니다.
- src 속성도 반드시 입력해야 하는 속성이며 폰트를 지정합니다.
- src 속성에는 local()함수와 url()함수를 사용합니다.
- local() 함수는 사용자의 컴퓨터 내부에 잇는 폰트를 선택하는 함수이고
- url() 함수는 사용자의 컴퓨터에 존재하지 않는 폰트를 지정하는 함수 입니다.

```css
@font-face {
    font-family: 'AAA';
    src: local('NanumGothic'),
         url('NanumGothic.eot'),
         url('NanumGothic.ttf'),
         url('NanumGothic.woff');
}

* {
    font-family: 'AAA';
}
```

웹 브라우저 별로 지원하는 폰트가가 다름.

@font-face 규칙의 속성
- font-family: 폰트 이름을 지정합니다.
- src: 폰트 파일을 지정합니다.
- font-weight: 폰트 두께를 지정합니다.
- font-style: 폰트 스타일을 지정합니다.


> 출처: https://webclub.tistory.com/261 [Web Club]

### Web Font Simple Usage(웹 폰트 간단 사용 예제)
```css
@font-face {
    font-family: ng;
    src: url(NanumGothic.eot);
    src: local(※), url(NanumGothic.woff) format(‘woff’)
}

body {
    font-family: '나눔고딕', 'NanumGothic', ng
}
```
- ng(이름은 원하는데로 작성가능)라는 글꼴 이름을 한 번만 선언한 다음 eot 형식과 woff 형식을 순차적으로 참조
- IE6~8은 eot 글꼴만 요청해서 화면에 표시한다(eot 형식을 woff 형식보다 먼저 참조하도록 한다)
- IE 9와 Chrome, Firefox, Safari, Opera는 woff 글꼴만 요청해서 화면에 표시(@font-face 명세에 의해 eot 글꼴에 대한 format('eot') 선언이 없기 때문에 브라우저가 eot 글꼴을 내려받아야 하지만 영리하게도 내려받지 않는다.
- local(※) 값은 외부 자원을 참조하기 이전에 시스템에 설치된 글꼴을 우선 참조할 수 있도록 만들어 준다. 그러나 이코드에서는 IE6~IE8이 local() 값을 처리하지 못하는 특징을 이용하여 woff 글꼴을 추가로 요청하지 않도록 해준다.
- local(※) 값의 괄호 안쪽에 포함된 ※ 기호는 사용자 시스템에 존재하지 않을만한 글꼴을 임의로 지정한 것. 굳이 2byte짜리 특수문자를 사용한 이유는 Mac OS에서 2byte짜리 문자열로 된 시스템 글꼴 이름은 아예 처리하지 않기 때문이다.
- format(‘woff’) 값을 명시적으로 작성하면 이 형식을 지원하는 브라우저만 글꼴을 내려받게 되어 있다. 값은 반드시 홀따옴표 또는 쌍따옴표 안에 있어야 하며 작성하지 않는 경우 지원 여부에 무관하게 모든 형식의 글꼴을 내려받는것이 명세이다. 글꼴을 지원하지 않으면서도 내려받는 상황을 예방하기 위해 이 형식을 지원하는 경우에만 외부 글꼴을 내려받도록 명시적으로 코드를 작성한 것이다. IE 7~8 브라우저는 이 코드를 해석하지 못하기 때문에 woff 글꼴을 추가로 요청하지 않도록 만들지만 여기서 그것이 목적은 아니다.
- 나눔고딕 시스템 글꼴의 이름을 한글과 영문으로 연거푸 두 번 적은 이유는 영문으로만 작성했을 때 제대로 표시하지 못하는 브라우저가 있기 때문이며 한글 이름이 있는 글꼴은 한글과 영문 모두 작성하는 것이 좋다.

### @font-face 실제 사용 예제
```css3
@font-face {
    font-family: 'NanumGothic';
    src: url('fonts/NanumGothic.eot');
    src: url('fonts/NanumGothic.eot?#iefix') format(‘embedded-opentype’), url('fonts/NanumGothic.woff') format(‘woff’), url('fonts/NanumGothic.ttf') format('truetype'), url('fonts/NanumGothic.svg') format('svg');
}
```
- 세 번째 줄은 IE9의 호환성 모드 때문에 필요합니다. 호환성 모드에서 IE9는 IE8처럼 렌더링됩니다. 이 묘한 기능은 IE8(또는 그 이전 버전 IE)의 버그를 고려해 디자인된 웹 사이트가 IE9에서도 제대로 보이도록 하기 위한 것입니다. IE9에서 호환성 모드를 사용하려면 사용자가 의도적으로 해당 모드를 활성화해야 하므로, 호환성 모드를 고려하지 않는다면 아마도 이 줄은 제외시키도 상관없을 것입니다.
- 네 번째 줄부터 두번째 src 속성이 시작됩니다. 첫 폰트 파일이 .eot 파일인데 파일 이름끝에 ?#iefix 가 붙어 있습니다. 이것은 IE6~8까지의 브라우저에 있는 버그때문에 필요합니다. URL의 .eot 다음에 ?#iefix를 붙이지 않으면 해당 폰트는 IE8과 그 하위 버전에서는 제대로 표시되지 않을 것입니다.

tip
서체 파일의 순서는 .eot, .woff, ttf, .svg 의 순으로 하는 것이 좋다.

### 굵은 서체나 이탤릭 서체를 추가하는 방법(Bold, Italic)
```css3
@font-face {
    font-family: 'NanumGothic';
    src: url('fonts/NanumGothicRegular.eot');
    src: url('fonts/NanumGothicRegular.eot?#iefix') format(‘embedded-opentype’), url('fonts/NanumGothicRegular.woff') format(‘woff’), url('fonts/NanumGothicRegular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'NanumGothic';
    src: url('fonts/NanumGothicBold.eot');
    src: url('fonts/NanumGothicBold.eot?#iefix') format(‘embedded-opentype’), url('fonts/NanumGothicBold.woff') format(‘woff’), url('fonts/NanumGothicBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'NanumGothic';
    src: url('fonts/NanumGothicItalic.eot');
    src: url('fonts/NanumGothicItalic.eot?#iefix') format(‘embedded-opentype’), url('fonts/NanumGothicItalic.woff') format(‘woff’), url('fonts/NanumGothicItalic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
}
```
- 위 코드와 같이 세 가지 서체를 전부 지원하려면 @font-face를 세 번 사용해야 합니다.
- 그리고 여기서 주목해야 할 것은 font-family에 적는 이름은 서체의 일반적 이름을 사용하고 font-family의 이름은 모두 항상 같다는 점 입니다.
- 이 방법의 장점은 사용자는 HTML 텍스트에 <em>, <strong> 등의 태그를 적절하게 부여하는 데만 집중하면 서체를 로드하고 사용하는 등의 잡일은 브라우저가 알아서 한다는 것 입니다.

## 11.4 @media 규칙
@media 규칙은 다양한 장치에서 HTML 문서가 적절한 형태를 갖추게 만들어주는 규칙입니다.
media 속성을 사용하면 음성장치 부터 점자는 물론 프린터와 텔레비전에 맞게 스타일시트를 사용할 수 있습니다.

```css
@media screen {
    html {
        height: 100%;
        background: black;
    }
    body {
        color: white; 
        font-family: serif;
    }
}

@media print {
    h1 {
        text-align: center;
        color: red;
        font-family: sans-serif;
    }
}
```

```html
<link rel="stylesheet" href="desktop.css" media="screen" /> 
<link rel="stylesheet" href="print.css" media="print" />
```

## 11.5 반응형 웹
미디어 쿼리는 장치를 구분하는 것은 물론, 장치의 크기나 비율을 구분할 수도 있습니다.

- width : 화면의 너비
- height : 화면의 높이
- device-width : 장치의 너비
- device-height : 장치의 높이
- orientation : 장치의 방향
- device-aspect-ratio : 화면의 비율
- color : 장치의 색상 비트
- color-index : 장치에서 표현 가능한 최대 색상 개수
- monochrome : 흑백 장치의 픽셀당 비트수
- resolution : 장치의 해상도

orientation 속성을 제외한 모든 속성은 min 접두사와 max 접두사를 사용할 수 있습니다.

```css
@media screen and (max-width: 767px) {
    html {
        background: red;
        color: white; font-weight: bold;
    }
}

@media screen and (min-width: 768px) and (max-width: 959px) {
    html {
        background: green;
        color: white; font-weight: bold;
    }
}

@media screen and (min-width: 960px) {
    html {
        background: blue;
        color: white; font-weight: bold;
    }
}
```

## 11.6 화면 방향 전환
미디어 쿼리를 사용하면 디바이스가 수평 상태로 있는지 수직 상태로 있는지도 확인할 수 있습니다.
화면 방향전환을 확인하고 싶다면 orientation 속성을 사용합니다.
orientation 속성에 portrait 키워드 또는 landscape 키워드를 적용하면 디바이스의 방향을 확인할 수 있습니다.















