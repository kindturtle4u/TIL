package com.example.domain.main.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Slf4j
public class MainController {

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
