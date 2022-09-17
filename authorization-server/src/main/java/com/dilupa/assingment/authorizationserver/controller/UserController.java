package com.dilupa.assingment.authorizationserver.controller;

import com.dilupa.assingment.authorizationserver.repository.UserDetailRepository;
import com.dilupa.assingment.authorizationserver.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class UserController {
    @Autowired
    UserDetailRepository userRepository;


    @PostMapping("/users1/register")
    public ResponseEntity<Object> registerUser(@RequestBody User newUser) {
        List<User> users = userRepository.findAll();
        System.out.println("New user: " + newUser.toString());
        for (User user : users) {
            System.out.println("Registered user: " + newUser.toString());
            if (user.equals(newUser)) {
                System.out.println("User Already exists!");
                return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
            }
        }
        userRepository.save(newUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping({"/users1"})
    public ResponseEntity<List<User>> forUser() {
        List<User> userList = userRepository.findAll();
        return new ResponseEntity(userList, HttpStatus.OK);
    }
}
