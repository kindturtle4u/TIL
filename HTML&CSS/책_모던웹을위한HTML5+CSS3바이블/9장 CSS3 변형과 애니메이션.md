> 출처 : 모던웹을위한 HTML5+CSS3바이블 읽으면서 정리

# 9장 CSS3 변형과 애니메이션
## 9.1 변형 속성 기본
CSS3에서 움직임을 구현할 수 있는 기능은 애니메이션 속성과 변형 속성으로 나뉩니다.

## 9.2 변형 속성
- transition : 모든 transition 속성을 한 번에 사용합니다.
- transition-delay : 이벤트 발생 후 몇 초 후에 재생할지 지정합니다.
- transition-duration : 몇 초 동안 재생할지 지정합니다.
- transition-property : 어떤 속성을 변형할지 지정합니다. (backgorund-color , width ...)
- transition-timing-function : 수치 변형 함수를 지정합니다.
    * ease
    * linear
    * ease-in
    * ease-out
    * ease-in-out
    
`transition: <transition-property> <transition-duraion> <transition-timing-function> <transition-delay>
...(여러 속성을 적용하고 싶은 경우 순서대로 여러개를 더 입력합니다.)`
    
## 9.3 키 프레임과 애니메이션 속성
- animation : 모든 animation 속성을 한 번에 적용합니다.
- animation-delay : 이벤트 발생후 몇 초 후에 재생할지 지정합니다.
- animation-direction : 애니메이션 진행 방향을 설정합니다.
    * alternate : from에서 to로 이동 후 to에서 from으로 이동을 반복합니다.
    * normal : 계속 from에서 to로 이동합니다.
- animation-duration : 애니메이션을 몇 초 동안 재생할지 지정합니다.
- animation-iteration-count : 애니메이션 반복 횟수를 지정합니다.
- animation-name : 애니메이션 이름을 지정합니다.
- animation-play-state : 애니메이션 재생 상태를 지정합니다.
- animation-timing-function : 수치변형 함수를 지정합니다.

@keyframes : 키프레임 규칙(keyframes @-rule)이라고 부르며 CSS3에서 애니메이션을 지정하는 형식입니다.  
키프레임 안에는 퍼센트 단위로 애니메이션을 적용합니다. 예외적으로 0% 경우와 100% 경우는 from 키워드와 to 키워드를
사용할 수 있습니다.

```css
    * { margin: 0; padding: 0; }
    body { position: relative; }
    #box {
        position: absolute;
        width: 200px; height: 200px;
        border-radius: 100px;
        text-align: center;
        background: linear-gradient(to bottom, #cb60b3, #db36a4);
    
        animation-name: rint;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: linear;
    }
    
    #box > h1 {
        line-height: 200px;
    }
    @keyframes rint {
        from {
            left: 0;
            transform: rotate(0deg);
        }
        50% {
            left: 500px;
        }
        to {
            left: 500px;
            transform: rotate(360deg);
        }
    }
}

    @keyframes rint {
        from {
            left: 0;
            transform: rotate(0deg);
        }
        50% {
            left: 500px;
        }
        to { 
            left: 500px;
            transform: rotate(360deg);
        }
    }
```
