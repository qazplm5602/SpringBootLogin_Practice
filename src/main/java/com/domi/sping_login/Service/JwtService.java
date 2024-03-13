package com.domi.sping_login.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

//@AllArgsConstructor
@Service
public class JwtService {
//    private final UserService userService;
    private final static String SECRET_KEY = "domitestkey8520domitestkey8520domitestkey8520domitestkey8520domitestkey8520";
    final static byte[]  keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    final static SecretKey Key = Keys.hmacShaKeyFor(keyBytes);

    public JwtDTO CreateToken(String id) {
        Date nowTime = new Date();

        // 액세스 토큰
        String access = Jwts.builder()
                .setSubject(id)
//                .claim("auth", authorities)
                .setExpiration(new Date(nowTime.getTime() + 86400000))
                .signWith(Key)
                .compact();

        JwtDTO dto = new JwtDTO();
        dto.accessToken = access;
        dto.refreshToken = access;

        return dto;
    }
}
