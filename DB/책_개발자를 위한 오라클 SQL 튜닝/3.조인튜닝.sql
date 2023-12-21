조인 튜닝
  중첩 루프 조인 (Nested Loop Join)
  해시 조인 (Hash Join)
  소트 머지 조인 (Sort Merge Join)

  중첩 루프 조인과 해시 조인이 널리 사용됨
  소트 머지 조인은 거의 사용하지 않는 추세

  세미 조인 (Semi Join)
  아우터 조인 (Outer Join)

  3.1 중첩 루프 조인 튜닝
    Nested Loop Join - 중첩 반복문
      A라는 집합을 한건 한건씩 읽어 가면서 해당 결과를 바탕으로
      B집합에서 데이터를 찾아가게 됩니다.
      데이터를 한건씩 찾아나가기(이로 인해 테이블 랜덤 액세스 부하가 발생)때문에 
      대용량 테이블을 중첩루프 조인한다면 성능에 큰 부하를 주게 됩니다.
      반대로 효율적인 인덱스 스캔을 한다면 
      대용량 테이블에서도 극적인 성능으로 원하는 데이터를 조회할 수 있음.

      중첩 루프 조인의 원리
        반복 : A 테이블에서 조건에 맞는 행을 스캔
          반복 : B 테이블에서 조건에 맞는 행을 스캔
            A 테이블과 B 테이블의 조인 조건이 일치한다면
              해당 행을 결과 집합에 포함

    3.1.2 Outer 테이블과 Inner 테이블
      Outer 테이블 (Driving 테이블) 
        중첩 루프 조인에서 가장 먼저 스캔하는 테이블

      Inner 테이블 (Driven 테이블) 
        중첩루프 조인에서 두번째로 스캔하는 테이블

      Outer 테이블 건수 < Inner 테이블의 건수 여야 유리
        OUter 테이블의 건수 만큼 Inner 테이블에 대한 스캔을 반복하기 때문

      Inner 테이블을 스캔할 때 효율적인 인덱스 스캔을 하지 못한다면 , 
      Outer테이블의 결과 건수 만큼 Inner테이블을 풀스캔 하게 되어 DBMS 전체 시스템에 큰부하

    3.1.3 인라인 뷰
      Inline View 란 From 절 내에 소괄호 ()로 감싸져 있는 SELECT 문을 뜻함
      인라인 뷰 내에 있는 SELECT 문의 결과는 마치 하나의 테이블과 같은 개념이 됨

      SELECT *
      FROM  
        DEPT A ,
        (
          SELECT DEPTNO
          FROM   EMP
        ) B
      WHERE
        A.DEPTNO = B.DEPTNO;

      View Merging
        옵티마이저가 집합 B가 DEPT 테이블과 같은 레벨로 올라가도록 병합하는것

      View No Merging
        집합 B가 DEPT 테이블과 같은 레벨로 올라가지 않도록 막는것

      비용기반 옵티마이저는 일반적으로 인라인 뷰를 View Merging 하여 
      DEPT와 같은 레벨로 취급하는 특성이 있음

    
    3.1.4 중첩 루프 조인 튜닝
      Outer 테이블의 결과 집합이 작아야 합니다.
      Inner 테이블 스캔시 반드시 효율적인 인덱스 스캔이 이루어져야 합니다.

      힌트
        LEADING
          2개 이상의 테이블 조인시 첫번째로 스캔할 테이블을 지정하는 힌트
          /*+ LEADING(테이블) */

        USE_NL
          Nested Loop Join을 유도하는 힌트 , 인자값은 Inner 테이블을 지정
          /*+ USE_NL(테이블) */

        MERGE
          인라인 뷰로 감싸져 있는 SQL을 메인쿼리와 같은 레벨로 병합하는 역할
          View Merging 함으로써 오라클의 옵티마이저는 더 많은 접근 경로를 가지게 됩니다.
          /*+ MERGE(뷰) */

        NO_MERGE
          인라인 뷰로 감싸져 있는 SQL이 메인쿼리와 같은 레벨로 병합되는것을 방지함
          No Merging됨으로써 인라인 뷰에 있는 SQL은 독립적으로 수행됩니다.
          /*+ NO_MERGE(뷰) */

  3.2 해시 조인 튜닝
    3.2.1 해시 조인
      작은 테이블을 빠르게 읽어 메모리 영역에 해시 테이블 생성하여 큰테이블을 순차적으로 조인

      일반적으로 대용량 테이블의 조인 연산에서는 해시 조인 방식이 중첩루프 조인이나 소트 머지 조인방식보다 훨씬 효율적
      하지만 해시조인은 대용량 테이블 조인 시에 메모리가 많이 필요함.

    3.2.2 해시조인의 특성
      두개의 테이블 중 한 테이블이 작은 집합이어야 성능 극대화가 가능함
      조인 조건이 반드시 '=' 조건이어야 합니다.

    3.2.3 Build Input과 Probe Input과
      Build Input
        해시 조인 시 해시 영역에 저장하는 집합을 뜻합니다. (중첩루프 기준으로 Outer 테이블)
        Build Input이 지나치게 큰 테이블이 된다면 오히려 메모리 영역과 디스크 영역 사이에 페이징이 발생하게 되어
        선능이 떨어질 위험이 있음

      Probe Input
        Build Input의 데이터가 해시 방식 접근으로 조인을 수행하는 집합을 뜻함.
      
    3.2.4 해시 조인을 위한 메모리 관리
      오라클의 PGA (Private Global Area)영역은 해시 조인시 사용하게 되는 메모리 영역
      메모리 크기를 확장하여 성능 향상을 꾀할수 있음.
      ALTER SYSTEM SET PGA_AGGREGATE_TARGET=6G;

    3.2.6 힌트
      USE_HASH
        옵티마이저에 해시 조인을 유도합니다.
        /*+ USE_HASH(테이블 테이블) */
        /*+ LEADING(DEPT) USE_HASH(EMP)*/ /*DEPT가 선행 Build Input EMP가 Probe Input */
        입력한 두 집합 중 작인집합을 Build Input ,  큰집합을 Probe Input 

  3.3 세미 조인 튜닝
    3.3.1 세미 조인
      세미 조인(Semi Join) 이란 조인 시 특정 조건에 부합된다면 더는 연산을 수행하지 않는 것을 뜻합니다.
      SQL 문에서 'EXISTS' 또는 'NOT EXISTS'를 사용하면 옵티마이저는 세미 조인 사용 여부를 판단
      조인 방식에 따라 '중첩루프 세미 조인'과 '해시 세미 조인' 으로 나누어짐

    3.3.2 EXISTS 문과 NOT EXISTS문
      중첩 루프 세미 조인       EXISTS      NL_SJ
      해시 세미 조인            EXISTS      HASH_SJ
      중첩 루프 안티 세미 조인  NOT EXISTS  NL_AJ
      해시 안티 세미 조인       NOT EXISTS  HASH_AJ

    3.3.3 세미조인 튜닝
      다음 2가지 방법으로 가장 많이 사용됨
        EXISTS or NOT EXISTS 문이 사용된 SQL을 세미 조인으로 유도
        UNION 또는 MINUS 집합 연산자가 사용된 SQL 문을 세미 조인으로 유도

    3.3.4 서브쿼리 Unnesting
      옵티마이저는 '()' 로 감싸진 서브 쿼리를 중첩되어 있다고 판단함(Nesting)
      중첩된 서브쿼리를 풀어서 메인 쿼리와 똑같은 레벨로 위치하게 하는 작업을 '서브쿼리 Unnesting' 이라고 부릅니다.
      왜냐하면 메인쿼리의 테이블과 서브쿼리의 테이블을 같은 레벨로 위치 시키면 더 많은 접근 경로를 통해 
      다양한 실행계획을 도출할 수 있기 때문

      반대로 서브쿼리를 Unnesting을 하지 않게 무조건 필터 조건으로 서브쿼리의 연산이 처리되게 하는것을
      '서브쿼리 No Unnesting'이라고 부릅니다.
    
    3.3.5 세미 조인 튜닝 관련 힌트
      'NL_SJ' 와 'HASH_SJ'
        EXISTS문을 쓴 서브쿼리를 사용할 경우 해당 힌트를 사용할 수 있습니다.

        SELECT *
        FROM DEPT
        WHERE EXISTS 
            (SELECT /*+ HASJ_SJ*/ *
              FROM  EMP
              WHERE EMP.DEPTNO = DEPT.DEPTNO
              AND SAL > 200000);

      'NL_AJ'와 'HASH_AJ'
        NOT EXISTS문을 쓴 서브쿼리를 사용할 경우 해당 힌트를 사용할 수 있습니다.

        SELECT *
        FROM DEPT
        WHERE NOT EXISTS
            (SELECT /*+ HASJ_AJ*/) *
              FROM EMP
              WHERE EMP.DEPTNO = DEPT.DEPTNO
              AND SAL > 200000);

      'UNNEST'
        서브쿼리 'Unnesting'을 유도하는 힌트 입니다.
        서브쿼리의 내용을 메인쿼리와 같은 레벨로 위치하게 합니다.

        SELECT *
        FROM  EMP A
        WHERE A.SAL > 2000
        AND EXISTS
          (SELECT /*+ UNNEST */ '1'
            FROM DEPT B
            WHERE B.DEPTNO = A.DEPTNO
            AND B.LOC LIKE 'C%');

      'NO_UNNSET'
        서브쿼리 Unnesting을 방지 하는 힌트 입니다.
        해당 힌트를 사용함으로써 오라클의 옵티마이저는 메인쿼리를 읽으면서 서브쿼리의 조건을 필터 처리하게 됩니다.

        SELECT * 
        FROM EMP A
        WHERE A.SAL > 2000
        AND EXISTS 
          (SELECT /*+ NO_UNNEST */ '1'
            FROM DEPT B
            WHERE B.DEPTNO = A.DEPTNO
            AND B.LOC LIKE 'C%');
  
  3.4 아우터 조인 튜닝
    3.4.1 아우터 조인
      기준테이블의 내용은 모두 보여주고 조인테이블의 내용은 성공시에만 보여주는 방식

    3.4.4 아우터 조인 튜닝
      아우터 조인을 이용하여 테이블 스캔 최소화
        'A = B + C' 성립 할 경우 테이블 B와 테이블 C는 테이블 A에 대하여 베타적 관계에 있음
        UNION ALL 문을 아우터 조인으로 변환하여 성능을 개선 할 수 있음
        (가장 큰 테이블인 A를 단 한번만 스캔하는것이 핵심)

      아우터 조인을 스칼라 서브쿼리로 변환
        오라클에서는 스칼라 서브쿼리로 한 번 이상 호출된 Input/Output 값을 멀티 버퍼에 저장해 둔 후 동일한
        Input으로 호출되면 기존에 가지고 있던 Output 값을 바로 리턴하는 스칼라 서브쿼리 캐싱 기능이 있음.

        


            



      
      





