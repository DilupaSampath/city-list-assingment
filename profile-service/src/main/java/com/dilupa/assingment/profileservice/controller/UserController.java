package com.dilupa.assingment.profileservice.controller;

import com.dilupa.assingment.profileservice.model.Credentials;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.model.UserResponseData;
import com.dilupa.assingment.profileservice.service.UserServiceImpl;
import com.dilupa.assingment.profileservice.util.ResponseHandlerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserServiceImpl userService;

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
//    @PreAuthorize("hasAuthority('create_profile')")
    public ResponseEntity<User> save(@RequestBody @Valid User user) throws Exception {
        User userResponseData = userService.save(user);
        return ResponseHandlerUtil.generateResponse(HttpStatus.OK, "Success", userResponseData);
    }

    /**
     * This method can only access with the user role ROLE_ALLOW_EDIT
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @PreAuthorize("hasRole((@PreAuthorizeRoleConstant.ROLE_ALLOW_EDIT))")
    public ResponseEntity<List<UserResponseData>> fetch(@RequestParam Optional<Integer> id) throws Exception {
        List<UserResponseData> userResponseDataList;
        if (!id.isPresent()) {
            userResponseDataList = userService.fetchAllProfiles();
        } else {
            userResponseDataList = userService.fetchById(id.get());
        }

        return ResponseHandlerUtil.generateResponse(HttpStatus.OK, "Success", userResponseDataList);
    }

    /**
     * This method can only access with the user role ROLE_ALLOW_EDIT
     * @param id
     * @param user
     * @return
     * @throws Exception
     */
    @PutMapping({"/user/{id}"})
    @PreAuthorize("hasRole((@PreAuthorizeRoleConstant.ROLE_ALLOW_EDIT))")
    public ResponseEntity<User> update(@PathVariable int id, @RequestBody User user) throws Exception {

        User userResult = userService.updateRoleById(id, user);

        return ResponseHandlerUtil.generateResponse(HttpStatus.OK, "Successfully updated", userResult);
    }


    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
//    @PreAuthorize("hasAuthority('create_profile')")
    public ResponseEntity<Object> login(@RequestBody Credentials credentials) {
        return userService.authenticate(credentials);
    }

    @GetMapping("/test")
    public String hello() {
        return "Hello, Welcome!!";
    }


}
