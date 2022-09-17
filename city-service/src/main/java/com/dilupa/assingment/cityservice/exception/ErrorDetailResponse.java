package com.dilupa.assingment.cityservice.exception;

import com.dilupa.assingment.cityservice.model.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetailResponse extends ApiResponse {
    private Date timestamp;
    private Object message;
    private String details;
}
