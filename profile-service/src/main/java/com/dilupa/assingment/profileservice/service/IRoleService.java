package com.dilupa.assingment.profileservice.service;


import com.dilupa.assingment.profileservice.model.Role;

public interface IRoleService {

    public Role fetchByName(String name) throws Exception;
}
