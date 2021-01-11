> 출처 : 모던웹을위한 HTML5+CSS3바이블 읽으면서 정리

# 3장 CSS3선택자 기본

## 3.1 CSS 선택자란?
CSS3 선택자는 특정한 HTML 태그를 선택할 때 사용하는 기능입니다.

## 3.2 선택자 종류 개요
[W3C의 공식문서](http://www.w3.org/TR/CSS/)를 참고
https://drafts.csswg.org/selectors-3/#selectors

## 3.3 전체 선택자
- * : HTML 페이지 내부의 모든 태그를 선택합니다.
    
## 3.4 태그 선택자
- 태그 : 특정한 태그를 선택합니다.

## 3.5 아이디 선택자와 클래스 선택자
### 아이디 선택자
- #아이디 : 아이디 속성을 가지고 있는 태그를 선택합니다.
  
### 클래스 선택자
- .클래스 : 특정한 클래스를 가지고 있는 태그를 선택합니다.

## 3.6 속성 선택자
### 기본속성 선택자
- 선택자[속성] : 특정한 속성이 있는 태그를 선택합니다.
- 선택자[속성=값][속성=값] : 특정한 속성 안의 값이 특정 값과 같은 문자 객체를 선택합니다.

### 문자열 속성 선택자
- 선택자[속성~=값] : 속성 안의 값이 특정 값을 단어로 포함하는 태그를 선택합니다.(하이픈'-' 단어에포함)
- 선택자[속성|=값] : 속성 안의 값이 특정 값을 단어로 포함하는 태그를 선택합니다.(하이픈'-' 단에에 미포함)
- 선택자[속성^=값] : 속성 안의 값이 특정 값으로 시작하는 태그를 선택합니다.
- 선택자[속성$=값] : 속성 안의 값이 특정 값으로 끝나는 태그를 선택합니다.
- 선택자[속성*=값] : 속성 안의 값이 특정 값을 포함하는 태그를 선택합니다.

## 3.7 후손 선택자와 자손 선택자
- 자손 : 바로 한단계 아래 위치한 태그를 자손
- 후손 : 아래에 위치한 모든 태그를 후손

### 후손선택자
- 선택자A 선택자B : 선택자A의 후손에 위치하는 선택자B를 선택합니다.

### 자손 선택자
- 선택자A > 선택자B : 선택자A의 자손에 위치하는 선택자B를 선택합니다.

### 동위 선택자
- 선택자A + 선택자B : 선택자A 바로 뒤에 위치하는 선택자B를 선택합니다.
- 선택자A ~ 선택자B : 선택자A 뒤에 위치하는 선택자B를 선택합니다.

## 3.9 반응 선택자
반응 선택자는 사용자의 반응으로 생성되는 특정한 상태를 선택하는 선택자 입니다.
- :active - 사용자가 마우스로 클릭한 태그를 선택합니다.
- :hover - 사용자가 마우스를 오린 태그를 선택합니다.

## 3.10 상태 선택자
- :checked : 체스 상태의 input 태그를 선택합니다.
- :focus : 초점이 맞추어진 input 태그를 선택합니다.
- :enabled : 사용 가능한 input 태그를 선택합니다.
- :disabled : 사용 불가능한 input 태그를 선택합니다.

## 3.11 구조 선택자
### 일반 구조 선택자
- :first-child - 형제 관계 중에서 첫 번째에 위치하는 태그를 선택합니다.
- :last-child - 형제 관계 중에서 마지막에 위치하는 태그를 선택합니다.
- :nth-child(수열) - 형제 관계 중에서 앞에서 수열 번째에 태그를 선택합니다. (2n+1)
- :nth-last-child(수열) - 형제 관계 중에서 뒤에서 수열 번째에 태그를 선택합니다.

### 형태 구조 선택자
형태 구조 선택자는 일반구조 선택자와 비슷하지만 태그 형태를 구분합니다.

- :first-of-type - 형제 관계 중에서 첫 번째로 등장하는 특정 태그를 선택합니다.
- :last-of-type - 형제 관계 중에서 마지막으로 등장하는 특정 태그를 선택합니다.
- :nth-of-type(수열) - 형제 관계 중에서 앞에서 수열 번째로 등장하는 특정 태그를 선택합니다.
- :nth-last-of-type(수열) - 형제 관계 중에서 뒤에서 수열 번째로 등장하는 특정 태그를 선택합니다.

## 3.12 문자 선택자
태그 내부 특정 조건의 문자를 선택하는 선택자 입니다.

### 시작 문자 선택자
- ::first-letter : 첫번째 글자를 선택합니다.
- ::first-line : 첫 번째 줄을 선택합니다.

### 전후 문자 선택자
- ::after : 태그 뒤에 위치하는 공간을 선택합니다.
- ::before : 태그 앞에 위치하는 공간을 선택합니다.

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS3 Selector Basic Page</title>
    <style>
        p { counter-increment: rint; }
        p::before { content: counter(rint) "."; }
        p::after { content: " - " attr(data-page) " page"; }
        p::first-letter { font-size: 3em; }
    </style>
</head>
<body>
    <h1>Lorem ipsum dolor sit amet</h1>
    <p data-page="52">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed nisi velit. Phasellus suscipit pellentesque leo, vel efficitur mi placerat sed. Fusce vel condimentum leo, at iaculis ante. Suspendisse posuere, dolor non tempor ullamcorper, nisl elit facilisis erat, nec lacinia augue erat id lacus. Curabitur mollis, justo nec lobortis hendrerit, libero nunc aliquam lacus, ut tristique sem nunc eu metus. Quisque varius orci eu felis sollicitudin malesuada. Vivamus pretium ligula velit, eget facilisis enim imperdiet ac.</p>
    <p data-page="273">Nam enim sem, pulvinar sed nibh non, vestibulum suscipit dui. Vestibulum vitae sodales velit. Nam cursus, velit id semper malesuada, sem mauris iaculis diam, sit amet auctor ligula lectus in eros. Aliquam tincidunt semper odio, sit amet ornare neque tristique ut. Suspendisse placerat consequat lectus ut varius. Aliquam in ligula non massa auctor porta. Proin auctor mattis elit sit amet tincidunt. Cras auctor mauris augue, et volutpat diam iaculis vitae.</p>
</body>
</html>
```

### 반응 문자 선택자
- ::selection - 사용자가 드래그한 글자를 선택합니다.

## 3.13 링크 선택자
링크선택자는 href 속성을 가지고 있는 a 태그에 적용되는 선택자 입니다.

- :link : href 속성을 가지고 있는 a 태그를 선택합니다.
- :visited : 방문했던 링크를 가지고 있는 a 태그를 선택합니다.

## 3.14 부정 선택자
부정선택자는 지금까지 배운 선택자를 모두 반대로 적용할 수 있게 만드는 선택자입니다.
- :not : 선택자를 반대로 적용합니다.


