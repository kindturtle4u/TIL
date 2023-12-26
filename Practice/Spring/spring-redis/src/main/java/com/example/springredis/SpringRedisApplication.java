package com.example.springredis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
@Slf4j
public class SpringRedisApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringRedisApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            RedisTemplate<String, Object> redisTemplate,
            MemberRedisRepository memberRedisRepository
    ) {
        return args -> {
            // opsForValue	Strings를 쉽게 Serialize / Deserialize 해주는 interface
            // opsForList	List를 쉽게 Serialize / Deserialize 해주는 interface
            // opsForSet	Set을 쉽게 Serialize / Deserialize 해주는 interface
            // opsForZSet	ZSet을 쉽게 Serialize / Deserialize 해주는 interface
            // opsForHash	Hash를 쉽게 Serialize / Deserialize 해주는 interface

            Long expiredTime = 30000L;
            redisTemplate.opsForValue().set("myKey", "myValue",expiredTime, TimeUnit.MILLISECONDS);
            log.info("redisTemplate.opsForValue().get(\"myKey\") = " + redisTemplate.opsForValue().get("myKey"));

            Member member = Member.builder()
                    .name("nam")
                    .age(10)
                    .expired(300)
                    .build();
            memberRedisRepository.save(member);

            log.info("member = " + memberRedisRepository.findByName("nam"));
        };
    }

}
