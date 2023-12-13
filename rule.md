# CSS 작성 시, 준수 사항

>   #### BEM 규칙 준수할 것
>       1.  형태 : Block__Element--Modifer
>           1-1.    Block-name__Element-name 의 형식은 없음

>   #### 함수
>       1. 함수명 참고 시, _function.scss 파일을 참고할 것
>       2. SASS (or SCSS)의 내장 함수 사용 시, @use를 반드시 써줄 것

>   #### 중복 되는 CSS 속성 접두어로 깔끔하게
>       아래는 예제
>
>       .class {
>           p {
>               text: {
>                   align: center;
>                   overflow: hidden;
>                   transform: uppercase;
>               }
>           }
>       }

>   #### CSS 파일 정리
>       1. Component, Layout 등 각 성질에 따라 분류 후 파일 생성할 것