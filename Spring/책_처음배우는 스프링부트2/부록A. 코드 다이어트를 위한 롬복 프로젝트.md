> 출처 : 처음배우는 스프링부트2 읽으면서 정리

# 부록A. 코드 다이어트를 위한 롬복 프로젝트
## A.1 인텔리제이에서 롬복
Preferences -> Plugins -> Browse Repositories -> lombok

## A.2 그레이들에 롬복 의존성 설정하기
```groovy
dependencies {
    ...
    compileOnly('org.projectlombok:lombok')
}
```

## A.3 @Getter와 @Setter
## A.4 @EqualsAndHashCode
@EqualsAndHashCode는 자바의 equals() 메서드와 Hashcode() 메서드를 구현합니다.

```java
@Override
public boolean equals(Object o) {
    if(this == 0) return true;
    if( o == null || getClass() != o.getClass()) return false;
    Human human = (Human)o;
    return age == human.age && Obejcts.equlas(name, human.name);
}

@Override
public int hashCode() {
    return Object.hash(name, age);,
}
```

- equals(Object)가 두 객체를 같다고 판단했으면, 두 객체의 hashCode 값은 항상 같다.
- 하지만 equals(Object)가 두 객체를 다르다고 판단했더라도, 두 객채의 hashCode 값은 같을 수 있다. (해시 충돌)
- equals()와 hashcode()는 항상 같이 재정의 한다.
- 값객체(Value Object)에는 equals()와 hashCode()를 재정의하자

of 파라미터를 사용하여 적용하고 싶은 필드만 지정
`@EqualsAndHashCode(of = {"name"}`

## A.5 @AllArgsConstructor, @NoArgsConstructor, @RequiredArgsConstructor
- @AllArgsConstructor: 객체의 모든 필드값을 인자로 받는 생성자
- @NoArgsConstructor: 기본생성자(인자값이 없는)
- @RequiredArgsConstructor: @NonNull이 적용된 필드값만 인자로 받는 생성자를 만드는 어노테이션

## A.6 @Data
@Data는 @ToString, @EqualsAndHashCode, @Getter, @Setter, @RequiredArgsConstructor 어노테이션을 합쳐놓은 편리한 어노테이션입니다.

## A.7 @Builder
