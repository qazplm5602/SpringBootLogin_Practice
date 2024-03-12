package com.domi.sping_login.JWT;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SignInDto {
    private String username;
    private String password;
}