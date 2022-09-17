package com.dilupa.assingment.profileservice.util;


import com.dilupa.assingment.profileservice.model.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

// generate common response object
public class ResponseHandlerUtil{

    public static ResponseEntity generateResponse(HttpStatus status, String message, Object responseObj) {
        ApiResponse<Object> apiResponse = new ApiResponse<Object>();
        apiResponse.setData(responseObj);
        apiResponse.setMessage(message);
        apiResponse.setStatus(status.value());

        return new ResponseEntity<ApiResponse>(apiResponse, status);
    }
}

