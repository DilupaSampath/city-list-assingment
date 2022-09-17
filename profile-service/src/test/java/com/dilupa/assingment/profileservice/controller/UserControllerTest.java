package com.dilupa.assingment.profileservice.controller;

import com.dilupa.assingment.profileservice.model.ApiResponse;
import com.dilupa.assingment.profileservice.model.Role;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.service.UserServiceImpl;
import com.dilupa.assingment.profileservice.util.ResponseHandlerUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
    }

    @Test
    @DisplayName("When valid user details given then user should saved")
    void whereValidUserDetails_thenUserShouldSaved() throws Exception {

        User user = new User();
        user.setId(1);
        user.setUsername("testUserName");
        user.setEmail("test@test.com");
        user.setPassword("testpass");

        ResponseEntity<ApiResponse> apiResponse =  ResponseHandlerUtil.generateResponse(HttpStatus.OK, "Success", user);

        Mockito.when(userService.save(any()))
                .thenReturn(user);

        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "\t\"username\": \"admin123\",\n" +
                        "\t\"password\": \"admin@pass\",\n" +
                        "\t\t\"email\": \"admin@pass\",\n" +
                        "\t\t\"enabled\":true,\n" +
                        "\t\t\"accountNonExpired\": true,\n" +
                        "\t\"credentialsNonExpired\": true,\n" +
                        "\t\"accountNonLocked\": true\n" +
                        "}"))
                .andExpect(status().isOk());

    }

}