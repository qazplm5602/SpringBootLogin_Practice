package com.domi.sping_login.Service;

import com.domi.sping_login.Repository.User;
import com.domi.sping_login.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User GetUser(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User GetUser(HttpServletRequest request) {
        Object userIdObject = request.getSession().getAttribute("userId");
        if (userIdObject == null) return null; // 그냥 없어요

        return GetUser(userIdObject.toString());
    }

    public boolean AddUser(User user) {
        if (GetUser(user.getId()) != null) return false;

        userRepository.save(user);
        return true;
    }
}
