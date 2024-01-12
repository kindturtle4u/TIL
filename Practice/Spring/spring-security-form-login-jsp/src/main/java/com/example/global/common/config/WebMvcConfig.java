package com.example.global.common.config;

import com.example.global.common.interceptor.DevtoolAutoLogin;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Profile("local")
@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final DevtoolAutoLogin devtoolAutoLogin;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(devtoolAutoLogin)
                .excludePathPatterns("/css/**", "/images/**", "/js/**");
    }
}
