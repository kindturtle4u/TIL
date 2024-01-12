package com.example.domain.main.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.log.LogMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MainController {
    private final AuthenticationManager authenticationManager;

    @GetMapping( "/main")
    public String main() {
        log.info("main");
        return "index";
    }

    @GetMapping("loginForm")
    public String login() {
        log.info("login");
        return "loginForm";
    }

    @GetMapping("/user/page")
    public String user() {
        log.info("user");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("{}", authentication);


        return "user/page";
    }

    @GetMapping("/admin/page")
    public String admin() {
        log.info("admin");
        return "admin/page";
    }

    @GetMapping("/biz/page")
    public String biz() {
        log.info("biz");
        return "biz/page";
    }


}
