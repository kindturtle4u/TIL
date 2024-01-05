package com.example.global.security.config;


import com.example.global.security.enums.Role;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

import static com.example.global.security.enums.Role.ADMIN;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        /*
        WebSecurity
        antMatchers에 파라미터로 넘겨주는 endpoints는 Spring Security Filter Chain을 거치지 않기 때문에 '인증' , '인가' 서비스가 모두 적용되지 않는다.
        또한 Security Context를 설정하지 않고, Security Features(Secure headers, CSRF protecting 등)가 사용되지 않는다.
        WebSecurity, HttpSecurity에 모두 설정을 한 경우 WebSecurity가 HttpSecurity보다 우선적으로 고려되기 때문에 HttpSecurity에 인가 설정은 무시된다.
        */
        return (web) -> {
            web.ignoring().requestMatchers("/h2-console/**", "/");
        };
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // csrf 사용안함
        http.csrf(csrf -> csrf.disable());

        // httpBasic 사용안함
        http.httpBasic(httpBasic -> httpBasic.disable());

        // formLogin 사용안함.
        http.formLogin(formLogin -> {
            formLogin.loginPage("/loginForm") // 사용자정의 로그인 페이지
                    .defaultSuccessUrl("/") // 로그인 성공 후 이동 페이지
                    .failureUrl("/loginForm") //로그인 실패 후 이동 페이지
                    .usernameParameter("username") // 아이디 파라미터명 설정
                    .passwordParameter("password") // 패스워드 파라미터명 설정
                    .loginProcessingUrl("/login") // 로그인 Form Action Url
                    .successHandler( // 로그인 성공 후 핸들러
                            new AuthenticationSuccessHandler() {
                                @Override
                                public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                                    System.out.println("onAuthenticationSuccess");
                                    System.out.println("authentication : " + authentication.getName());
                                    response.sendRedirect("/"); // 인증이 성공한 후에는 root로 이동
                                }
                            }
                    )
                    .failureHandler( // 로그인 실패 후 핸들러
                            new AuthenticationFailureHandler() {
                                @Override
                                public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                                    System.out.println("onAuthenticationFailure");
                                    System.out.println("exception : " + exception.getMessage());
                                    response.sendRedirect("/loginForm");
                                }
                            }
                    );

            /*
                - loginPage("/loginForm"): 인증이 필요할때 이동하는 페이지. api설정을 하지 않을 경우 기본적으로 spring security가 제공하는 템플릿으로 연결됨
                - defaultSuccessUrl("/): 인증이 성공했을때 default로 이동하는 URL 지정하는 api 입니다.
                - failureUrl("/loginForm"): 증이 실패하였을 때 이동하는 페이지 지정하는 api입니다.
                - loginProcessingUrl("/login"): 폼 테그의 action url을 설정하는 api입니다. default값은 default login입니다.
                - successHandler(): 로그인이 성공했을 때 success handler를 호출하는 api입니다. 파라미터로는 AuthenticationSuccessHandler 인터페이스를 구현한 것을 넣으면 됩니다.
                - failureHandler(): 로그인이 실패하였을 때 failure handler를 호출하는 api입니다. 파라미터로는 AuthenticationFailureHandler 인터페이스를 구현한 것을 넣으면 됩니다.

            */
        });

        http.logout(logout -> {
            logout.logoutUrl("/logout") // 로그아웃 처리 URL (= form action url)
                    //.logoutSuccessUrl("/login") // 로그아웃 성공 후 targetUrl, logoutSuccessHandler 가 있다면 효과 없으므로 주석처리.
                    .addLogoutHandler((request, response, authentication) -> {
                        System.out.println("addLogoutHandler");
                        // 사실 굳이 내가 세션 무효화하지 않아도 됨.
                        // LogoutFilter가 내부적으로 해줌.
                        HttpSession session = request.getSession();
                        if (session != null) {
                            session.invalidate();
                        }
                    })  // 로그아웃 핸들러 추가
                    .logoutSuccessHandler((request, response, authentication) -> {
                        System.out.println("logoutSuccessHandler");
                        response.sendRedirect("/");
                    }) // 로그아웃 성공 핸들러
                    .deleteCookies("remember-me"); // 로그아웃 후 삭제할 쿠키 지정
        });


        http.authorizeHttpRequests(
                (auth) -> {
                    auth.requestMatchers("/auth/**").authenticated()
                            .requestMatchers("/admin/**").hasRole(ADMIN.name())
                            .anyRequest().authenticated();
                }
        );

        http.authenticationProvider(authenticationProvider());


        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return daoAuthenticationProvider;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

