package com.dilupa.assingment.profileservice.service;

import com.dilupa.assingment.profileservice.model.Credentials;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.model.UserResponseData;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface IUserService {

    public User save(User user) throws Exception;

    public List<UserResponseData> fetchById(int profileId) throws Exception;

    public List<UserResponseData> fetchAllProfiles();

    public ResponseEntity<Object> authenticate(Credentials credentials);

    public User updateRoleById(int id, User user) throws Exception;
}
