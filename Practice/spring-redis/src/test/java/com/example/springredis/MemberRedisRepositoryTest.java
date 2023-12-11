package com.example.springredis;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Slf4j
class MemberRedisRepositoryTest {
    @Autowired
    private MemberRedisRepository memberRedisRepository;

    @AfterEach
    void afterEach() {
        memberRedisRepository.deleteAll();
    }

    @Test
    void save() throws Exception {
        //given
        Member member = Member.builder()
                .name("kim")
                .age(20)
                .expired(300)
                .build();
        //when
        Member save = memberRedisRepository.save(member);

        //then
        Member find = memberRedisRepository.findById(member.getId()).get();


        log.info("save = " + save);
        log.info("find = " + find);
        assertThat(save.getId()).isEqualTo(find.getId());
    }
}
