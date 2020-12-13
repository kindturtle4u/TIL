> 출처 : 모던 자바 인 액션 읽으면서 정리

# APPENDIX A. 기타 언어 업데이트

## A.1 어노테이션
자바 8의 어노테이션은 두가지가 개선되었다.
- 어노테이션을 반복할 수 있다.
- 모든 형식에 어노테이션을 사용할 수 있다.

자바의 `어노테이션(annotation)`은 부가 정보를 프로그램에 장식할 수 있는 기능이다.
(자바8 이전에는 선언에만 어노테이션을 사용할 수 있었다.). 즉 어노테이션은 문법적 메타데이터다.

### A.1.1 어노테이션 반복
### A.1.2 형식 어노테이션
자바 8에서는 모든 형식에 어노테이션을 적용할 수 있다.
new 연산자, instanceof, 형식 캐스트, 제네릭 형식 인수, implements , throws 등에 어노테이션을 사용할 수 있다.

## A.2 일반화된 대상 형식 추론

# APPENDIX B. 기타 라이브러리 업데이트

## B.1 컬렉션
### B.1.1 추가 메서드

|클래스/인터페이스|새로운메서드|
|---|---|
|Map|getOrDefault, forEach, compute, computeIfAbsent, computeIfPresent, merge, putIfAbsent, remove(key,value), replace, replaceAll|
|Iterable|forEach, spliterator|
|Iterator|forEachRemining|
|Collection|removeIf, stream, parallelStream|
|List|replaceAll, sort|
|BitSet|stream|

### B.1.2 Collections 클래스
### B.1.3 Comparator
Comparator 인터페이스는 디폴트 메서드와 정적 메서드를 추가로 제공한다.

- 인스턴스 메서드
    * reversed : 현재 Comparator를 역순으로 반전시킨 Comparator를 반환한다.
    * thenComparing : 두 객체가 같을 때 다른 Comparator를 사용하는 Comparator를 반환한다.
    * thenComparingInt, thenComparingDouble, thenComparingLong : thenComparing과 비슷한 동작을 수행하지만 기본형 특화된 함수를 인수로 받는다.
    
- 정적 메서드
    * comparingInt, comparingDouble, comparingLong : comparing과 비슷한 동작을 수행하지만 기본형 특화된 함수를 인수로 받는다.
    * naturalOrder : Comparable 객체에 자연 순서를 적용한 Comparable 객체를 반환한다.
    * nullsFirst : null 객체를 null이 아닌 겍체보다 작은 값으로 취급하는 Comparator를 반환한다.
    * nullsLast : nulll 객체를 null이 아닌 객체보다 큰 값으로 취급하는 Comparator를 반환한다.
    * reverseOrder : navuralOrder().reversed()와 같다.

## B.2 동시성
### B.2.1 아토믹
java.util.concurrent.atomic 패키지는 AtomicInteger, AtomicLong 등 단일 변수에 아토믹 연산을 지원하는 숫자 클래스를 제공한다.

### B.2.2 ConcurrentHashMap
ConcurrentHashMap은 동시 실행 환경에 친화적인 새로운 HashMap이다. 
ConcurrentHashMap은 내부 자료구조의 일부만 잠근 상태로 동시 덧셈이나 갱신 작업을 수행 할 수 있는 기능을 제공한다.
따라서 기존의 동기화된 Hashtable에 비해 빠른 속도로 읽기 쓰기 연산을 수행한다.

## B.3 Arrays

### B.3.1 parallelSort 사용하기
### B.3.2 setAll, parallelSetAll 사용하기
### B.3.3 parallelPrefix 사용하기

## B.4 Number와 Math
자바 8 API에서는 Number와 Math 클래스에 새로운 메서드가 추가되었다.

### B.4.1 Number
### B.4.2 Math

## B.5 Files
Files 클래스에는 파일에서 스트림을 만들 수 있는 기능이 추가되었다.

- File.lines : 파일을 스트림으로 게으르게 읽을 수 있는 기능을 제공
- Files.list : 주어진 디렉터리 개체를 포함하는 Stream<Path>를 생성한다. 재귀가 아니다
- Files.walk : Files.list와 마찬가지로 주어진 디렉터리 개체를 포함하는 Stream<Path>를 생성한다. 이 과정은 재귀적으로 실행됨
- Files.find : 디렉터리를 재귀적으로 탐색하면서 주어진 프리디케이트와 일치하는 개체를 찾아서 Stream<Path>를 생성한다.

## B.6 리플렉션
바뀐 어노테이션 기법을 지원할 수 있도록 리플렉션 API도 업데이트 되었다.

## B.7 String
구분 기호로 문자열을 연결 할 수 있는 join이라는 새로운 정적 메서드가 추가되었다.

```java
String author = String.join(", ", "Raoul", "Mario", "Alan");
System.out.println(authors);
```

# APPENDIX C 스트림에 여러 연산 병렬로 실행하기
## C.1 스트림 포킹
### C.1.1 ForkingStreamConsumer로 Results 인터페이스 구현하기
### C.1.2 ForkingStreamConsumer, BlockingQueueSpliterator 구현하기
### C.1.3 StreamForker 활용

## C.2 성능 문제

# APPENDIX D 람다와 JVM 바이트 코드
## D.1 익명 클래스
## D.2 바이트 코드
## D.3 구원투수 InvokeDynamic
## D.4 코드 생성 전략










