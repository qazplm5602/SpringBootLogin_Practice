package com.domi.sping_login.Service;

import com.domi.sping_login.Repository.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

//@AllArgsConstructor
@Service
public class JwtService {
    private final UserService userService;
    private final static String SECRET_KEY = "domitestkey8520domitestkey8520domitestkey8520domitestkey8520domitestkey8520";
    final static byte[]  keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    final static SecretKey Key = Keys.hmacShaKeyFor(keyBytes);

    @Autowired
    public JwtService(UserService userService) {
        this.userService = userService;
    }

    public JwtDTO CreateToken(String id, Boolean ignoreRefresh) {
        Date nowTime = new Date();

        // 액세스 토큰
        String access = Jwts.builder()
                .setSubject(id)
//                .claim("auth", authorities)
                .setExpiration(new Date(nowTime.getTime() + 30000))
                .signWith(Key)
                .compact();

        String refresh = null;

        if (!ignoreRefresh) {
            refresh = Jwts.builder()
                .setSubject(id)
                .setExpiration(new Date(nowTime.getTime() + 3_600_000))
                .signWith(Key)
                .compact();
        }


        JwtDTO dto = new JwtDTO();
        dto.accessToken = access;
        dto.refreshToken = refresh;

        return dto;
    }

    public JwtDTO CreateToken(String id) {
        return CreateToken(id, false);
    }

    public String GetUserIdForToken(String token) throws SignatureException {
        Jws<Claims> jwt = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
        return jwt.getBody().getSubject();
    }

    public Boolean IsLogin(String token) {
        String userId = GetUserIdForToken(token);
        User user = userService.GetUser(userId);

        return user != null; // null 이면 그냥 중간에 유저 삭제된거 아님???
    }

    public User GetLoginedUser(HttpServletRequest request) {
        String headAuth = request.getHeader("Authorization");
        if (headAuth == null || !headAuth.contains("Bearer ")) return null; // 뭐임 토큰 어디감

        String token = headAuth.substring(7);
        String userId = GetUserIdForToken(token);
        return userService.GetUser(userId);
    }
}
