package com.example;

import com.example.domain.user.entity.User;
import com.example.domain.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SpringSecurityFormLoginJspApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityFormLoginJspApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            User user = User.builder()
                    .username("user")
                    .password(passwordEncoder.encode("1234"))
                    .build();

            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("1234"))
                    .build();

            userRepository.save(user);
        };
    }


}
