7. 병렬 처리 튜닝
  오라클은 다중 스레드 방식을 통한 병렬 처리를 지원함
  단발성 또는 통계성 쿼리 작성 시 유용하게 사용될 수 있습니다.

  7.1 병렬과 병렬처리
    각각의 스레드가 해당 연산내에서 자신들이 맡은 부분을 처리하며 'QC(Query Coordinator)'라는 프로세스가
    각각의 스레드를 호출함. 각각의 스레드가 처리한 부분집합을 QC가 다시 취합하여 최종결과를 도출해 냅니다.

    병렬처리 기법은 DBMS리소스를 많이 사용하므로 , 온라인 환경의 실시간 조회 쿼리(빈번한 조회 요청)에는
    적합하지 않고 배치 프로그램이나 통계성 쿼리에 사용하면 큰 효과를 볼 수 있습니다.

  7.2 병렬 스캔 튜닝
    7.2.2 병렬 스캔 튜닝 관련 힌트
      'PARALLEL'
        PARALLEL 힌트는 SQL단위로  병렬 처리 할 수 있게 해주는 힌트입니다.

        SELECT /*+ FULL(테이블) PARALLEL (테이블, 병렬도) */

        '병렬도'
          해당 쿼리 내에서 가용될 스레드의 개수를 의미하며 PARALLEL 힌트에 인자로 지정할 수 있습니다.

        PX BLOCK ITERATOR
          QC가 n개의 스레드를 호출하고 각각의 스레드는 테이블에서 자신이 맡인 영역을 병렬도 스캔

        PX SEND QC
          각각의 스레드가 QC에게 자신이 읽은 데이터를 전달합니다.

        PX COORDINATOR
          QC가 각각의 스테드가 스캔한 결과를 병합(Merge)합니다.

  7.3 병렬 인덱스 스캔 튜닝
    7.3.1 병렬 인덱스 스캔
      대용량의 파티셔닝 테이블에 파티션 인덱스를 생성 후 해당 인덱스를 병렬 스캔(Parallel Scan)할 수 있습니다.
      이것을 '병렬 인덱스 스캔(Parallel Index Scan)'이라고 합니다.

        파티션 테이블을 병렬 처리 스캔 시 병렬도는 테이블의 파티션 개수를 넘을 수 없습니다.
        파이션 인덱스를 병렬 처리 스캔 시 병렬도는 인덱스의 파티션 개수를 넘을 수 없습니다.

        ex) 16파티션 테이블 -> 병렬도 16까지 가능
            파티션 컬럼 조건 파티션 프루닝 되여 16개중 4개 파티션만 읽게 되는 경우 -> 병렬도 최대 4까지 가능

    7.3.2 병렬 인덱스 스캔 튜닝
      '병렬 인덱스 스캔 튜닝(Parallel Index Scan Tuning)'은 파티션 인덱스를 병렬 처리로 스캔하여 
      인덱스를 읽는 시간을 단축하는 기법

    7.3.3 병렬 인덱스 스캔 튜닝 관련 힌트
      'PARALLEL_INDEX'
        PARALLEL_INDEX(테이블병 , 인덱스명 , 병렬도)

        SELECT /*+ INDEX(EMP EMP_IDX01) PARALLEL_INDEX(EMP , EMP_IDX01, 4) */
          


        

      


