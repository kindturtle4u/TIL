package com.example.springsecurityjwtlogin.global.security;

import com.example.springsecurityjwtlogin.domain.user.entity.User;
import com.example.springsecurityjwtlogin.domain.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;


@SpringBootTest
class CustomUserDetailServiceTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsService userDetailsService;

    @Test
    void loadUserByUsername() throws Exception {
        //given
        User user = User.builder()
                .name("홍길동")
                .loginId("hong123")
                .email("hong123@naver.com")
                .build();

        userRepository.save(user);
        //when
        UserDetails findUser = userDetailsService.loadUserByUsername("hong123");

        //then
        Assertions.assertThat(findUser.getUsername()).isEqualTo(user.getLoginId());
    }
}
