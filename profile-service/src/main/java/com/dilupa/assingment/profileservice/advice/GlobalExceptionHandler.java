package com.dilupa.assingment.profileservice.advice;

import com.dilupa.assingment.profileservice.exception.ErrorDetailResponse;
import com.dilupa.assingment.profileservice.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    // handle specific exceptions
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetailResponse> handleResourceNotFoundException(ResourceNotFoundException exception,
                                                                               WebRequest webRequest) {
        List<String> stringErrorList = new ArrayList<>(Arrays.asList(exception.getMessage()));
        ErrorDetailResponse errorDetails = new ErrorDetailResponse(new Date(), stringErrorList,
                webRequest.getDescription(false));
        errorDetails.setStatus(HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<ErrorDetailResponse>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetailResponse> handleGlobalException(Exception exception,
                                                                     WebRequest webRequest) {

        List<String> stringErrorList = new ArrayList<>();
        if (exception instanceof MethodArgumentNotValidException) {
            stringErrorList = ((MethodArgumentNotValidException) exception).getBindingResult().getFieldErrors()
                    .stream()
                    .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                    .collect(Collectors.toList());
        } else {
            stringErrorList.add(exception.getLocalizedMessage());
        }

        ErrorDetailResponse errorDetails = new ErrorDetailResponse(new Date(), stringErrorList,
                webRequest.getDescription(false));
        errorDetails.setStatus(HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}