package com.example;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;

@Slf4j
@SpringBootTest
@ActiveProfiles("local")
class SpringProfilesApplicationTestsLocal {
    @Autowired
    Environment environment;

    @Test
    void profile() throws Exception {
        log.info("activeProfiles: {}" , (Object) environment.getActiveProfiles());
        log.info("test.name: {}" , environment.getProperty("test.name"));
        log.info("test.common: {}" , environment.getProperty("test.common"));
        log.info("test.common.only: {}" , environment.getProperty("test.include"));
    }
}

@Slf4j
@SpringBootTest
@ActiveProfiles("dev")
class SpringProfilesApplicationTestsDev {
    @Autowired
    Environment environment;

    @Test
    void profile() throws Exception {
        log.info("activeProfiles: {}" , (Object) environment.getActiveProfiles());
        log.info("test.name: {}" , environment.getProperty("test.name"));
        log.info("test.common: {}" , environment.getProperty("test.common"));
        log.info("test.common.only: {}" , environment.getProperty("test.include"));
    }
}

