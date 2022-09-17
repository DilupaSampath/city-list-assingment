package com.dilupa.assingment.profileservice.model;

import lombok.Data;

@Data
public class ApiResponse<T> {

    private T data;
    private Object message;
    private int status;
}
