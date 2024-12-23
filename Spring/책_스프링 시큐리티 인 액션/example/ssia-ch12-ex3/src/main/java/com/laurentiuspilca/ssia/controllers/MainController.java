package com.laurentiuspilca.ssia.controllers;

import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistrations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String main(OAuth2AuthenticationToken token) {
        System.out.println(token.getPrincipal());
        return "main.html";
    }
}
