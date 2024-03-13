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
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    JwtDTO Login(@Valid @RequestBody JoinRequest data, HttpServletRequest request, HttpServletResponse response) {
        User user = userService.GetUser(data.id);
        if (user == null || !Objects.equals(user.getPassword(), data.password)) {
            response.setStatus(403);
            return null;
        }

        var token = jwtService.CreateToken(user.getId());
//        HttpSession session = request.getSession();
//        session.setAttribute("userId", user.getId());
//        response.setStatus(201);

        return token;
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
