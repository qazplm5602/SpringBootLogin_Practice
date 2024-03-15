package com.domi.sping_login.Controller;

import com.domi.sping_login.Repository.User;
import com.domi.sping_login.Service.JwtDTO;
import com.domi.sping_login.Service.JwtService;
import com.domi.sping_login.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@Data
class JoinRequest {
    @NotBlank
    String id;

    @NotBlank
    String password;
}

@Data
class ResultLogin {
    Boolean result;
    String content;
    JwtDTO tokens;
}

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LoginController {
    final UserService userService;
    final JwtService jwtService;

    @GetMapping("/my")
    Map<String, Object> MyLogin(HttpServletRequest request,  HttpServletResponse response) {
//        User user = userService.GetUser(request);
        User user = jwtService.GetLoginedUser(request);
        if (user == null) {
//            response.setStatus(401);
            return Map.of("result", false);
        }

        return Map.of(
            "result", true,
            "id", user.getId(),
            "name", user.getName()
        );
    }

    @PostMapping("/login")
    ResultLogin Login(@Valid @RequestBody JoinRequest data, HttpServletRequest request, HttpServletResponse response) {
        ResultLogin result = new ResultLogin();

        User user = userService.GetUser(data.id);
        if (user == null || !Objects.equals(user.getPassword(), data.password)) {
            result.setResult(false);
            result.setContent("등록되지 않은 사용자거나 비밀번호가 일치하지 않습니다.");
            return result;
        }

        var token = jwtService.CreateToken(user.getId());
        result.setResult(true);
        result.setTokens(token);

        return result;
    }

    @PostMapping("/retryLogin")
    ResultLogin RetryLogin(@RequestBody JwtDTO token, HttpServletResponse response) {
        ResultLogin result = new ResultLogin();

        if (token.refreshToken == null || token.refreshToken.isEmpty()) {
            response.setStatus(400); // 🛏️침대(베드) 리퀘스트

            result.setResult(false);
            return result;
        }
        
        String userId = jwtService.GetUserIdForToken(token.refreshToken);
        JwtDTO tokens = jwtService.CreateToken(userId, true); // 에세스 토큰만 재발급 하는거라 리프레시 토큰은 없어도댐

        result.setResult(true);
        result.setTokens(tokens);

        return result;
    }

    @GetMapping("/logout")
    void Logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null)
            session.invalidate();
    }

    @PutMapping("/create")
    Map<String, Boolean> Create(@RequestBody @Valid User user) {
        Boolean success = userService.AddUser(user);
        return Map.of("result", success);
    }
}
