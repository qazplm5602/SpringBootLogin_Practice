package com.domi.sping_login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class SpingLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpingLoginApplication.class, args);
    }

}
