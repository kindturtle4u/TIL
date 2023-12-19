package com.example.springsecurityjwtlogin.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Slf4j
@Controller
public class MainController {

    @GetMapping("/")
    public String main() {
        log.info("test");
        return "/main";
    }


}
