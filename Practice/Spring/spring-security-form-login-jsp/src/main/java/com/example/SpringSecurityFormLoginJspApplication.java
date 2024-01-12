package com.example;

import com.example.domain.user.entity.User;
import com.example.domain.user.repository.UserRepository;
import com.example.global.security.enums.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@SpringBootApplication
public class SpringSecurityFormLoginJspApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityFormLoginJspApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager) {
        log.info("commandLineRunner1");
        return args -> {
            User user = User.builder()
                    .username("user")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.USER)
                    .build();

            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.ADMIN)
                    .build();

            User biz = User.builder()
                    .username("biz")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.BIZ)
                    .build();

            userRepository.save(user);
            userRepository.save(admin);
            userRepository.save(biz);
        };
    }



}
