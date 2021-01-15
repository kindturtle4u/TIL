> 출처 :  https://heropy.blog/ Sass(SCSS) 완전 정복! 읽으면서 정리

# Sass(SCSS) 완전 정복
## CSS Preprocessor 란?
### 어떻게 사용하나요?
웹에서는 직접 동작하지 않으니 이렇게 작성한 전처리기를 웹에서 동작 가능한 표준의 CSS로 컴파일(Compile)합니다.
전처리기로 작성하고 CSS로 컴파일해서 동작시키는 거죠.

### 컴파일은 어떻게 하나요?
전처리기 종류마다 방법이 조금씩 다르고 여러 방식을 제공합니다.
보통의 경우 컴파일러(Compiler)가 필요합니다.

### Sass와 SCSS는 차이점은 뭔가요?
Sass(Syntactically Awesome Style Sheets)의 3버전에서 새롭게 등장한 SCSS는 CSS 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위집합(Superset) 입니다.
즉, SCSS는 CSS와 거의 같은 문법으로 Sass 기능을 지원한다는 말입니다.

더 쉽고 간단한 차이는 {}(중괄호)와 ;(세미콜론)의 유무입니다.

## 문법(Syntax)
### 주석(Comment)
// 컴파일되지 않는 주석
/* 컴파일되는 주석 */

### 데이터 종류(Data Types)
- Numbers : 숫자 ( 1, .82, 20px, 2em... )
- String : 문자 (bold, relative, "/images/a.png", "dotum")
- Colors : 색상 표현 (red, blue, #FFFF00, rgba(255,0,0,.5))
- Booleans : 논리 (true, false)
- Nulls : 아무것도 없음 (null)
- Lists : 공백이나 , 로 구분된 값의 목록 ( (apple, orange, banana), apple orange )
- Maps : Lists오 유사하나 값이 Key : Value 형태 (apple: a, orange: o, banana: b)

### 특이사항
- Numbers: 숫자에 단위가 있거나 없습니다.
- Strings: 문자에 따옴표가 있거나 없습니다.
- Nulls: 속성값으로 null 이 사용되면 컴파일 하지 않습니다.
- Lists: () 를 붙이거나 붙이지 않습니다.
- Maps: ()를 꼭 붙여야 합니다.

### 중첩(Nesting)
ass는 중첩 기능을 사용할 수 있습니다.
상위 선택자의 반복을 피하고 좀 더 편리하게 복잡한 구조를 작성할 수 있습니다.

### Ampersand (상위 선택자 참조)
중첩 안에서 & 키워드는 상위(부모) 선택자를 참조하여 치환합니다.

### @at-root (중첩 벗어나기)
중첩에서 벗어나고 싶을 때 @at-root 키워드를 사용합니다.
중첩 안에서 생성하되 중첩 밖에서 사용해야 경우에 유용합니다.

### 중첩된 속성
font-, margin- 등과 같이 동일한 네임 스페이스를 가지는 속성들을 다음과 같이 사용할 수 있습니다.
```scss
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  };
  margin: {
    top: 10px;
    left: 20px;
  };
  padding: {
    bottom: 40px;
    right: 30px;
  };
}
```

### 변수(variables)
반복적으로 사용되는 값을 변수로 지정할 수 있습니다.
변수 이름 앞에는 항상 $를 붙입니다.
`$변수이름: 속성값;`

### 변수 유효범위(Variable Scope)
변수는 사용 가능한 유효범위가 있습니다.
선언된 블록({}) 내에서만 유효범위를 가집니다.

변수 $color는 .box1의 블록 안에서 설정되었기 때문에, 블록 밖의 .box2에서는 사용할 수 없습니다.

### !global (전역 설정)
!global 플래그를 사용하면 변수의 유효범위를 전역(Global)로 설정할 수 있습니다.

### !default (초깃값 설정)
!default 플래그는 할당되지 않은 변수의 초깃값을 설정합니다.
즉, 할당되어있는 변수가 있다면 변수가 기존 할당 값을 사용합니다.

좀 더 유용하게, ‘변수와 값을 설정하겠지만, 
혹시 기존 변수가 있을 경우는 현재 설정하는 변수의 값은 사용하지 않겠다’는 의미로 쓸 수 있습니다.

### `#{}` (문자 보간)
`#{}`를 이용해서 코드의 어디든지 변수 값을 넣을 수 있습니다.
```scss
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

### 가져오기(Import)
@import로 외부에서 가져온 Sass 파일은 모두 단일 CSS 출력 파일로 병합됩니다.
또한, 가져온 파일에 정의된 모든 변수 또는 Mixins 등을 주 파일에서 사용할 수 있습니다.

Sass @import는 기본적으로 Sass 파일을 가져오는데, CSS @import 규칙으로 컴파일되는 몇 가지 상황이 있습니다.
- 파일 확장자가 .css일 때
- 파일 이름이 http://로 시작하는 경우
- url()이 붙었을 경우
- 미디어쿼리가 있는 경우

### 여러 파일 가져오기
하나의 @import로 여러 파일을 가져올 수도 있습니다.
파일 이름은 ,로 구분합니다.

### 파일 분할(Partials)
파일 이름 앞에 _를 붙여(_header.scss와 같이) @import로 가져오면 컴파일 시 ~.css 파일로 컴파일하지 않습니다.

### 연산(Operations)
Sass는 기본적인 연산 기능을 지원합니다.

### 재활용(Mixins)
Sass Mixins는 스타일 시트 전체에서 재사용 할 CSS 선언 그룹 을 정의하는 아주 훌륭한 기능입니다.
약간의 Mixin(믹스인)으로 다양한 스타일을 만들어낼 수 있습니다.

우선, Mixin은 두 가지만 기억하면 됩니다.
선언하기(@mixin)와 포함하기(@include) 입니다.
만들어서(선언), 사용(포함)하는 거죠!

### 인수(Arguments)
Mixin은 함수(Functions)처럼 인수(Arguments)를 가질 수 있습니다.
하나의 Mixin으로 다양한 결과를 만들 수 있습니다.

```scss
// SCSS
@mixin 믹스인이름($매개변수) {
  스타일;
}
@include 믹스인이름(인수);
```

### @content
선언된 Mixin에 @content이 포함되어 있다면 해당 부분에 원하는 스타일 블록 을 전달할 수 있습니다.
이 방식을 사용하여 기존 Mixin이 가지고 있는 기능에 선택자나 속성 등을 추가할 수 있습니다.

### 확장(Extend)
특정 선택자가 다른 선택자의 모든 스타일을 가져야하는 경우가 종종 있습니다.
이럴 경우 선택자의 확장 기능을 사용할 수 있습니다.

결과적으로 확장(Extend) 기능은 무해하거나 혹은 유익할 수도 있지만 그만큼 부작용을 가지고 있을 수 있습니다.
따라서 확장은 사용을 권장하지 않으며, 위에서 살펴본 Mixin을 대체 기능으로 사용하세요.

### 함수(Functions)
Mixin은 위에서 살펴본 대로 지정한 스타일(Style)을 반환하는 반면,
함수는 보통 연산된(Computed) 특정 값을 @return 지시어를 통해 반환합니다.

```scss
$max-width: 980px;

@function columns($number: 1, $columns: 12) {
  @return $max-width * ($number / $columns)
}

.box_group {
  width: $max-width;

  .box1 {
    width: columns();  // 1
  }
  .box2 {
    width: columns(8);
  }
  .box3 {
    width: columns(3);
  }
}
```

내가 지정한 함수와 내장 함수(Built-in Functions)의 이름이 충돌할 수 있습니다.
따라서 내가 지정한 함수에는 별도의 접두어를 붙여주는 것이 좋습니다.

## 조건과 반복(Control Directives / Expressions)
### if (함수)
조건의 값(true, false)에 따라 두 개의 표현식 중 하나만 반환합니다.
조건부 삼항 연산자(conditional ternary operator)와 비슷합니다.

`if(조건, 표현식1, 표현식2)`
```scss
$width: 555px;
div {
  width: if($width > 300px, $width, null);
}
```

### @if (지시어)
@if 지시어는 조건에 따른 분기 처리가 가능하며, if 문(if statements)과 유사합니다.
같이 사용할 수 있는 지시어는 @else, if가 있습니다.

### @for
```scss
// through
// 종료 만큼 반복
@for $변수 from 시작 through 종료 {
  // 반복 내용
}

// to
// 종료 직전까지 반복
@for $변수 from 시작 to 종료 {
  // 반복 내용
}

// 1부터 3번 반복
@for $i from 1 through 3 {
  .through:nth-child(#{$i}) {
    width : 20px * $i
  }
}

// 1부터 3 직전까지만 반복(2번 반복)
@for $i from 1 to 3 {
  .to:nth-child(#{$i}) {
    width : 20px * $i
  }
}
```

### @each
@each는 List와 Map 데이터를 반복할 때 사용합니다.
```scss
@each $변수 in 데이터 {
  // 반복 내용
}

// List Data
$fruits: (apple, orange, banana, mango);

.fruits {
  @each $fruit in $fruits {
    li.#{$fruit} {
      background: url("/images/#{$fruit}.png");
    }
  }
}

@each $key변수, $value변수 in 데이터 {
  // 반복 내용
}
```

### @while
@while은 조건이 false로 평가될 때까지 내용을 반복합니다.
while 문과 유사하게 잘못된 조건으로 인해 컴파일 중 무한 루프에 빠질 수 있습니다.
사용을 권장하지 않습니다.

## 내장 함수(Built-in Functions)

[Sass Built-in Functions](https://sass-lang.com/documentation/modules) 에서 모든 내장 함수를 확인할 수 있습니다.

### 색상(RGB / HSL / Opacity) 함수
- mix($color1, $color2) : 두 개의 색을 섞습니다.
- lighten($color, $amount) : 더 밝은색을 만듭니다.
- darken($color, $amount) : 더 어두운색을 만듭니다.
- saturate($color, $amount) : 색상의 채도를 올립니다.
- desaturate($color, $amount) : 색상의 채도를 낮춥니다.
- grayscale($color) : 색상을 회색으로 변환합니다.
- invert($color) : 색상을 반전시킵니다.
- rgba($color, $alpha) : 색상의 투명도를 변경합니다. 
- opacify($color, $amount) / fade-in($color, $amount) : 색상을 더 불투명하게 만듭니다.
- transparentize($color, $amount) / fade-out($color, $amount) : 색상을 더 투명하게 만듭니다.

### 문자(String) 함수
- unquote($string) : 문자에서 따옴표를 제거합니다.
- quote($string) : 문자에 따옴표를 추가합니다.
- str-insert($string, $insert, $index) : 문자의 index번째에 특정 문자를 삽입합니다.
- str-index($string, $substring) : 문자에서 특정 문자의 첫 index를 반환합니다.
- str-slice($string, $start-at, [$end-at]) : 문자에서 특정 문자(몇 번째 글자부터 몇 번째 글자까지)를 추출합니다.
- to-upper-case($string) : 문자를 대문자를 변환합니다.
- to-lower-case($string) : 문자를 소문자로 변환합니다.

### 숫자(Number) 함수
- percentage($number) : 숫자(단위 무시)를 백분율로 변환합니다.
- round($number) : 정수로 반올림합니다.
- ceil($number) : 정수로 올림합니다.
- floor($number) : 정수로 내림(버림)합니다.
- abs($number) : 숫자의 절대 값을 반환합니다.
- min($numbers…) : 숫자 중 최소 값을 찾습니다.
- max($numbers…) : 숫자 중 최대 값을 찾습니다.
- random() : 0 부터 1 사이의 난수를 반환합니다.

### List 함수
모든 List 내장 함수는 기존 List 데이터를 갱신하지 않고 새 List 데이터를 반환합니다.
모든 List 내장 함수는 Map 데이터에서도 사용할 수 있습니다.
- length($list) : List의 개수를 반환합니다.
- nth($list, $n) : List에서 n번째 값을 반환합니다.
- set-nth($list, $n, $value) : List에서 n번째 값을 다른 값으로 변경합니다.
- join($list1, $list2, [$separator]) : 두 개의 List를 하나로 결합합니다.
- zip($lists…) : 여러 List들을 하나의 다차원 List로 결합합니다.
- index($list, $value) : List에서 특정 값의 index를 반환합니다.

### Map 함수
모든 Map 내장 함수는 기존 Map 데이터를 갱신하지 않고 새 Map 데이터를 반환합니다.
- map-get($map, $key) : Map에서 특정 key의 value를 반환합니다.
- map-merge($map1, $map2) : 두 개의 Map을 병합하여 새로운 Map를 만듭니다.
- map-keys($map) : Map에서 모든 key를 List로 반환합니다.
- map-values($map) : Map에서 모든 value를 List로 반환합니다.

### 관리(Introspection) 함수
- variable-exists(name) : 변수가 현재 범위에 존재하는지 여부를 반환합니다.(인수는 $없이 변수의 이름만 사용합니다.)
- unit($number) : 숫자의 단위를 반환합니다.
- unitless($number) : 숫자에 단위가 있는지 여부를 반환합니다.
- comparable($number1, $number2) : 두 개의 숫자가 연산 가능한지 여부를 반환합니다.




