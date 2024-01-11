package com.example.global.security.config;


import com.example.domain.user.repository.UserRepository;
import com.example.global.security.CustomAuthenticationProvider;
import com.example.global.security.CustomUserDetailService;
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
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;

import static com.example.global.security.enums.Role.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        /*
        WebSecurity
        antMatchers에 파라미터로 넘겨주는 endpoints는 Spring Security Filter Chain을 거치지 않기 때문에 '인증' , '인가' 서비스가 모두 적용되지 않는다.
        또한 Security Context를 설정하지 않고, Security Features(Secure headers, CSRF protecting 등)가 사용되지 않는다.
        WebSecurity, HttpSecurity에 모두 설정을 한 경우 WebSecurity가 HttpSecurity보다 우선적으로 고려되기 때문에 HttpSecurity에 인가 설정은 무시된다.
        */
        return (web) -> {
            web.ignoring().requestMatchers("/h2-console/**", "/", "/loginForm");
        };
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // csrf 사용안함
        http.csrf(csrf -> csrf.disable());

        // httpBasic 사용안함
        http.httpBasic(httpBasic -> httpBasic.disable());

        // formLogin
        http.formLogin(formLogin -> {
            formLogin
                    .loginPage("/loginForm") // 사용자정의 로그인 페이지
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
                                    System.out.println(request.getParameter("next"));

                                    // next 페이지로 이동
                                    UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUriString(request.getHeader("Referer"));
                                    MultiValueMap<String, String> queryParams = uriComponentsBuilder.build().getQueryParams();
                                    List<String> next = queryParams.get("next");

                                    String returnUrl = "/";
                                    if (next != null && !next.isEmpty()) {
                                        returnUrl = next.get(0);
                                    }
                                    response.sendRedirect(returnUrl); // 인증이 성공한 후에는 root로 이동
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
                    .invalidateHttpSession(true)
                    .clearAuthentication(true)
                    .deleteCookies("remember-me");
        });

        http.authorizeHttpRequests(
                (req) ->
                        req
                                .requestMatchers("/WEB-INF/views/**").permitAll()
                                .requestMatchers("/user/**").hasRole(USER.name())
                                .requestMatchers("/biz/**").hasRole(BIZ.name())
                                .requestMatchers("/admin/**").hasRole(ADMIN.name())
                                .anyRequest().permitAll()


        );

        http.exceptionHandling(exception -> {
            /*
                인증이 완료되었으나 해당 엔드포인트에 접근할 권한이 없다면, 403 Forbidden 오류가 발생한다.
                이 역시 스프링 시큐리티는 기본적으로 스프링의 기본 오류 페이지를 응답한다.
                HttpStatus 403 Forbidden은 서버가 해당 요청을 이해하였으나, 사용자의 권한이 부족하여 요청이 거부된 상태를 말한다.
                이를 커스텀하기 위해서는 AccessDeniedHandler 인터페이스를 구현하면 된다.
                참고: https://yoo-dev.tistory.com/28
             */
//            exception.accessDeniedHandler((request, response, accessDeniedException) -> {
//                System.out.println("accessDeniedHandler");
//            });


            /*
                인증이 안된 익명의 사용자가 인증이 필요한 엔드포인트로 접근하게 된다면 Spring Security의 기본 설정으로는 HttpStatus 401과 함께 스프링의 기본 오류페이지를 보여준다.
                HttpStatus 401 Unauthorized는 사용자가 인증되지 않았거나 유효한 인증 정보가 부족하여 요청이 거부된 것을 말한다.
                기본 오류 페이지가 아닌 커스텀 오류 페이지를 보여준다거나, 특정 로직을 수행 또는 JSON 데이터 등으로 응답해야 하는 경우, 우리는 AuthenticationEntryPoint 인터페이스를 구현하고 구현체를 시큐리티에 등록하여 사용할 수 있다.
                AuthenticationEntryPoint 인터페이스는 인증되지 않은 사용자가 인증이 필요한 요청 엔드포인트로 접근하려 할 때, 예외를 핸들링 할 수 있도록 도와준다.
             */
            exception.authenticationEntryPoint((request, response, authException) -> {
                System.out.println("authenticationEntryPoint");
                response.sendRedirect("/loginForm?next=" + request.getRequestURI());
            });




        });

        // 등록안해도 자동으로 등록됨.
        // http.authenticationProvider(authenticationProvider());


        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
//
//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
//        return daoAuthenticationProvider;
//    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        // custom 만들지않으면 DaoAuthenticationProvider 가 자동으로 등록됨.
        // InitializeUserDetailsManagerConfigurer
        // 기본적으로 DaoAuthenticationProvider를 등록을 해주는데 이때 bean으로 등록 된 UserDetailsService와 PasswordEncoder를 찾아와 설정해준다
        return new CustomAuthenticationProvider(userDetailsService(), passwordEncoder());
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailService(userRepository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

