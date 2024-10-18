package study.mybatis.sample.job;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.batch.MyBatisPagingItemReader;
import org.mybatis.spring.batch.builder.MyBatisPagingItemReaderBuilder;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import study.mybatis.sample.vo.SampleVO;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SampleBatch {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager platformTransactionManager;
    private final SqlSessionFactory sqlSessionFactory;


    @Bean
    public Job sampleJob() {
        log.debug("sample job");

        return new JobBuilder("sampleJob", jobRepository)
                .start(sampleStep())
                .build();
    }

    @Bean
    public Step sampleStep() {
        log.debug("sample step");


        return new StepBuilder("sampleStep", jobRepository)
                .<SampleVO, SampleVO>chunk(1000, platformTransactionManager)
                .reader(sampleReader())
                .writer(sampleWriter())
                .build();
    }


    @Bean
    public MyBatisPagingItemReader<SampleVO> sampleReader() {
        return new MyBatisPagingItemReaderBuilder<SampleVO>()
                .sqlSessionFactory(sqlSessionFactory)
                .pageSize(1000)
                .queryId("study.mybatis.sample.mapper.SampleMapper.selectSampleList")
                .build();
    }


    private ItemWriter<SampleVO> sampleWriter() {
        return items -> {
            System.out.println(items.getItems().stream().count());
        };
    }
}
