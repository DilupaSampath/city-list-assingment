package com.dilupa.assingment.profileservice.model;

import lombok.Data;
import java.util.List;

@Data
public class UserResponseData {
    private Integer id;
    private String username;
    private String email;
    private List<String> roles;
}
