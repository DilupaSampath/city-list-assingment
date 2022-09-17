package com.dilupa.assingment.profileservice.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Credentials {

    @NotNull(message = "Grant type shouldn't be empty")
    private String grant_type;

    @NotNull(message = "User name shouldn't be empty")
    private String username;

    @NotNull(message = "Password shouldn't be empty")
    private String password;
}
