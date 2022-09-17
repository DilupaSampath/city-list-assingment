package com.dilupa.assingment.cityservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AlreadyExistsException extends RuntimeException{
    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public AlreadyExistsException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exist with given %s : '%s'", resourceName, fieldName, fieldValue)); // Post not found with id : 1
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public AlreadyExistsException(String message, String resourceName, String fieldName, Object fieldValue) {
        super(message);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public AlreadyExistsException(String message, Throwable cause, String resourceName, String fieldName, Object fieldValue) {
        super(message, cause);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public AlreadyExistsException(Throwable cause, String resourceName, String fieldName, Object fieldValue) {
        super(cause);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public AlreadyExistsException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, String resourceName, String fieldName, Object fieldValue) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
