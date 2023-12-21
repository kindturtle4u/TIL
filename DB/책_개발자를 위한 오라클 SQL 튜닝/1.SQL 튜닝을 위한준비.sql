/*
  1. 테이블 스페이스 및 계정 생성

    NOLOGGING 모드 설정
      오라클에서 테이블에 NOLOGGING 모드를 설정하면 해당 테이블에 INSERT 작업시 Redo 로그 작업을 최소화합니다.
      대용량 데이터 INSERT시 입력 시간을 줄일 수 있음

    APPEND 힌트
      데이터 버퍼 캐시를 경유
      테이블 세그먼트의 비어있는 블록을 검색
      비어 있는 블록에 데이터를 저장

      HWM(High Water Mark) 세그먼트의 가장 끝 에 데이터를 입력하게 됨
      데이터 버퍼 캐시를 경우하지 않고 데이터를 저장하게 되므로 데이터 입력시간을 단축 할 수 있음

    통계정보 생성
      ANALYZE TABLE EMP COMPUTE STATISTICS;
*/

