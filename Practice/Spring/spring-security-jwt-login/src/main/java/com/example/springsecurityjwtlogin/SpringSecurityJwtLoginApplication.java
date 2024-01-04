package com.example.springsecurityjwtlogin;

import com.example.springsecurityjwtlogin.domain.user.entity.User;
import com.example.springsecurityjwtlogin.domain.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
public class SpringSecurityJwtLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityJwtLoginApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User user = User.builder()
                    .name("장현식")
                    .build();

            userRepository.save(user);
        };
    }

}

