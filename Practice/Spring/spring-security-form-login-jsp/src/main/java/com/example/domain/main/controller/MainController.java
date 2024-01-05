package com.example.domain.main.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Slf4j
public class MainController {

    @GetMapping(value = {"", "/"})
    public String main() {
        log.info("main");
        return "index";
    }

    @GetMapping("/loginForm")
    public String login() {
        log.info("login");
        return "loginForm";
    }

    @GetMapping("/auth/page")
    public String auth() {
        log.info("auth");
        return "auth/page";
    }

    @GetMapping("/admin/page")
    public String admin() {
        log.info("auth");
        return "auth/page";
    }
}
