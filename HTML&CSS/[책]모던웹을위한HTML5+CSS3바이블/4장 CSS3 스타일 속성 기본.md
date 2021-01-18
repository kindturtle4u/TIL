> 출처 : 모던웹을위한 HTML5+CSS3바이블 읽으면서 정리

# 4장 CSS3 스타일 속성 기본
## 4.1 스타일 속성을 공부할 때는
## 4.2 CSS3 단위
### 키워드
### 크기단위
- % : 백분율 단위
- em : 배수 단위
- px : 픽셀

### 색상단위
- `#000000` : HEX 코드 단위
- `rgb(red,green,blue)` : RGB 색상단위
- `rgba(red,green,blue,alpha)` : RGBA 색상단위
- `hsl(hue, saturation, lightness)` : HSL 색상 단위
- `hsla(hue, saturation, lightness, alpha)` : HSLA 색상 단위

### URL 단위

## 4.3 가시 속성
### display 속성
- none : 태그를 화면에서 보이지 않게 만듭니다.
- block : 태그를 block 형식으로 지정합니다.
- inline : 태그를 inline 형식으로 지정합니다.
- inline-block : 태그를 inline-block 형식으로 지정합니다.

inline vs inline-block 차이
- inline 속성은 width, height 속성이 적용되지 않음
- inline 속성은 margin 속성이 div 태그 좌우로만 지정됨

### visibility 속성
- visible : 태그를 보이게 만듭니다.
- hidden : 태그를 보이지 않게 만듭니다. (display : none과 달리 공간은 차지함)
- collapse : table 태그를 보이지 않게 만듭니다. (테이블이 차지하는 영역까지 보이지 않음)

### opacity 속성
0.0 ~ 1.0 사이의 숫자를 입력할 수 있으며 0.0은 투명한 상태 1.0은 불투명한 상태

## 4.4 박스속성
### width 속성과 height 속성
### margin 속성과 padding 속성
- 전체 너비 = width + 2 x (margin + border + padding)
- 전체 높이 = height + 2 x (margin + border + padding)
`margin : [margin-top][margin-right][margin-bottom][margin-left]`
  
### box-sizing 속성
- content-box : 기본값
- border-box : width속성과 height속성이 테두리를 포함한 영역의 크기를 지정하게 만듬

## 4.5 테두리 속성
### border-width 속성과 border-style 속성
- border-width : 테두리의 너비를 지정하는 스타일 속성
- border-style : 테두리의 형태를 지정하는 속성
- border-color : 테두리의 색상을 지정하는 속성

`border: <border-width> || <border-style> || <border-color>`

### border-radius 속성

## 4.6 배경속성
### background-image 속성
- CSS3부터는 여러 개의 배경 이미지 중첩 가능
`background-image : url('a.png'), url('b.png')`
  
### background-size 속성
### background-repeat 속성
### background-attachment 속성
- 어떠한 방식으로 화면에 붙일것인지를 지정하는 스타일 속성
- 기본값 scroll , fiexd 적용시 배경이미지 고정됨

### background-position 속성
- background-position : 키워드;
- background-position : X축크기;
- background-position : X축크기 Y축크기;

## 4.7 폰트 속성
### font-size 속성
### font-family 속성
- 일반적으로 한 단어로 이루어진 폰트는 따옴표를 사요하지 않습니다. 하지만 두단어 이상으로 이루어지는 단어는 따옴표를 반드시 사용해야함
- 개발하고 있는 우리 컴퓨터에는 설치 되어있지만 우리가 개발한 웹 페이지를 사용할 사용자에게는 폰트가 설치되어 있지 않을 수 있습니다.
일반적으로 이러한 문제를 예방하고자 font-family 속성을 여러개 사용합니다. `font-family : 'Time New Roman', Arial;`
- font-family 속성의 가장 마지막 폰트에는 Serif 폰트(명조체), Sans-serif폰트(고딕체), Mono space폰트(고정폭 글꼴)를 적용합니다.
이 폰트들은 웹 브라우저에서 지정하는 폰트로 **generic-family** 폰트라고 부릅니다.
  
### font-style 속성과 font-weight 속성
- 폰트의 기울기 또는 두께를 조정하는 스타일

### line-height 속성
- 글자의 높이를 지정하는 기능보다 글자를 수직 중앙 정렬할 때 사용합니다.

### text-align 속성
- inline 형식을 가지는 요소에는 text-align 속성을 사용할 수 없음

### text-decoration 속성
a 태그에 밑줄이 생기고 글자의 색상이 파란색으로 변경될때 `text-decoration : none;`

## 4.8 위치 속성
- 절대 위치 좌표 : 요소의 X좌표와 Y좌표를 설정해 절대 위치를 지정합니다.
- 상대 위치 좌표 : 요소를 입력한 순서를 통해 상대적으로 위치를 지정합니다.

### position 속성
- static : 태그가 위에서 아래로 순서대로 배치됩니다.
- relative : 초기 위치 상태에서 상하 좌우로 위치를 이동합니다.
- absolute : 절대 위치 좌료를 설정합니다.
- fixed : 화면을 기준으로 절대 위치 좌표를 설정합니다.

### z-index 속성

### 위치 속성과 관련된 공식
- 자손의 position 속성에 absolute 키워드를 적용하면 부모는 height 속성을 사용합니다.
이렇게 하면 부모 태그가 영역을 차지 하게 만들수 있습니다.
- 자손의 position 속성에 absolute 키워드를 적용하면 부모의 position 속성에 relative 키워드를 적용합니다.
이렇게 하면 자손 태그가 부모의 위치를 기준으로 절대 좌표를 설정합니다. 
(absolute는 position: static 속성을 가지고 있지 않은 부모를 기준으로 움직입니다. )

### overflow 속성
- hidden : 영역을 벗어나는 부분을 보이지 않게 만듭니다.
- scroll : 영억을 벗어나는 부분을 스크롤로 만듭니다.

만약 특정한 방향으로 스클롤을 생성할때는 `overflow-x` 속성과 `overflow-y` 속성을 사용합니다.

## 4.9 float 속성
- left : 태그를 왼쪽에 붙입니다.
- right : 태그를 오른쪽에 붙입니다.

### float 속성 개요
float 속성을 사용하면 그림을 글자 위에 띄울 수 있습니다. 원래 float 속성은 이러한 목적으로 만들어 졌찌만
현대에서는 웹 페이지의 레이아웃을 만들 때 더 많이 사용합니다.

### float 속성을 사용한 수평 정렬

### float 속성을 사용한 레이아웃 구성
- 자손에 float 속성을 적용하면 부모의 overflow 속성에 hidden 키워드를 적용해야합니다.
- float다음에 오는 태그의 clear 속성에 both 키워드를 적용해도 마찬가지 기능을 수행할 수 있습니다.
하지만 현대에는 overflow:hidden 속성을 더 많이 사용합니다.
- 이방법을 One True Layout 방식이라고 부릅니다.

## 4.10 clear:both를 사용한 레이아웃
## 4.11 그림자 속성
### text-shadow 속성
글자에 그림자를 부여하는 스타일 속성

### box-shadow 속성
box-shadow 속성은 박스에 그림자를 부여하는 속성입니다.

## 4.12 그레이디언트
그레이디언트는 2가지 이상의 색상을 혼합해서 채색하는 기능입니다.

## 4.13 벤더 프리픽스
`-moz` , `-webkit` 등의 글자가 써 있는데요, 이는 벤디 프리픽스라고 불리는 것입니다.
벤더 프리픽스틑 웹크라우저 공급 업체(마이크로소프트, 모질라, 구글, 애플, 오페라)에서 제공하며,
실험적인 기능이 필요할 때 사용합니다. 과거에는 CSS3 자체가 매우 실험적인 기능이라 벤더 프리픽스를 굉장이 많이 사용해야 
했습니다. 하지만 현재는 대부분의 실험적인 기능이 실제 표준으로 들어가면서 벤더 프리픽스를 많이 사용하지 않아도 되게 바뀌었습니다.

- `-ms-` : 익스플로러
- `-webkit-` : 크롬
- `-moz-` : 파이어폭스
- `-webkit-` : 사파리
- `-webkit-` : 오페라

#### -webket-
웹킷은 애플에서 개발하고 있는 레이아웃 엔진입니다. 오픈소스라서 웹킷을 기반으로 
사파리, 크롬, 오페라 등의 웹 브라우저가 구현되어 있기 때문에 모두 -webkit-이라는 벤더 프리픽스를 사용하는 것입니다.



















