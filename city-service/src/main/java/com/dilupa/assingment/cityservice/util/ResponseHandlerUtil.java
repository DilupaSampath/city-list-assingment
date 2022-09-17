package com.dilupa.assingment.cityservice.util;

import com.dilupa.assingment.cityservice.model.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandlerUtil{

    public static ResponseEntity generateResponse(HttpStatus status, String message, Object responseObj) {
        ApiResponse<Object> apiResponse = new ApiResponse<Object>();
        apiResponse.setData(responseObj);
        apiResponse.setMessage(message);
        apiResponse.setStatus(status.value());

        return new ResponseEntity<ApiResponse>(apiResponse, status);
    }
}

