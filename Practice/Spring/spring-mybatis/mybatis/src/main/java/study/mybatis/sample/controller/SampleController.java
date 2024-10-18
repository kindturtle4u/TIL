package study.mybatis.sample.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import study.mybatis.sample.mapper.SampleMapper;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SampleController {
    private final JobLauncher jobLauncher;
    private final JobRegistry jobRegistry;
    private final SampleMapper sampleMapper;

    @GetMapping("/log")
    public String log() {
        log.trace("TRACE!!");
        log.debug("DEBUG!!");
        log.info("INFO!!");
        log.warn("WARN!!");
        log.error("ERROR!!");
        return "ok";
    }

    @GetMapping("/sample")
    public String sample() {
        List<?> objects = sampleMapper.selectSampleList();
        System.out.println(objects);
        return "ok";
    }


    @GetMapping("/run")
    public String run(@RequestParam("value") String value) throws Exception {

        JobParameters jobParameters = new JobParametersBuilder()
                .addString("date", value)
                .toJobParameters();

        jobLauncher.run(jobRegistry.getJob("sampleJob"), jobParameters);


        return "ok";
    }
}
