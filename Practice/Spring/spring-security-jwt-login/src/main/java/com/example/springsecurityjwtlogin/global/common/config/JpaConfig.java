package com.example.springsecurityjwtlogin.global.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@Configuration
public class JpaConfig {

    @Bean
    public AuditorAware<String> auditorAware() {
        return () -> {
            if(1==1) return Optional.of("test");

            // Spring Security를 통한 Auditor 매핑
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                return Optional.empty();
            }

            //return Optional.ofNullable(((UserDetails) authentication.getPrincipal()).getUsername());
            return Optional.of("test");
        };
    }
}
