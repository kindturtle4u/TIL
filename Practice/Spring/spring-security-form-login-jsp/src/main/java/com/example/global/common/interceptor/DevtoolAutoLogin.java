package com.example.global.common.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RequiredArgsConstructor
@Component
public class DevtoolAutoLogin implements HandlerInterceptor {
    private final AuthenticationManager authenticationManager;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("=== DevtoolAutoLogin ===");

        if (SecurityContextHolder.getContext().getAuthentication() != null) return true;

        String username = "admin";
        String passwrod = "1234";

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, passwrod));
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authenticate);
        SecurityContextHolder.setContext(context);
        RequestContextHolder.currentRequestAttributes().setAttribute("SPRING_SECURITY_CONTEXT", context, RequestAttributes.SCOPE_SESSION);

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}

