package com.example.springsecurityjwtlogin.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    WebSecurity
//    antMatchers에 파라미터로 넘겨주는 endpoints는 Spring Security Filter Chain을 거치지 않기 때문에 '인증' , '인가' 서비스가 모두 적용되지 않는다.
//
//    또한 Security Context를 설정하지 않고, Security Features(Secure headers, CSRF protecting 등)가 사용되지 않는다.
    // WebSecurity, HttpSecurity에 모두 설정을 한 경우 WebSecurity가 HttpSecurity보다 우선적으로 고려되기 때문에 HttpSecurity에 인가 설정은 무시된다.

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/h2-console/**");
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // csrf 사용안함
        http.csrf(csrf -> csrf.disable());

        // httpBasic 사용안함
        http.httpBasic(httpBasic -> httpBasic.disable() );

        // formLogin 사용안함.
        http.formLogin(formLogin -> formLogin.disable());

        http.authorizeHttpRequests(
                (auth) -> auth.anyRequest().permitAll()
        );

        return http.build();
    }
}
