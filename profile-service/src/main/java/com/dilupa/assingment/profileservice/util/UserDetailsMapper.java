package com.dilupa.assingment.profileservice.util;

import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.model.UserResponseData;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class UserDetailsMapper {

    /**
     * Map user object to UserResponseData type. Because User object contains some sensitive values
     */
    public static Function<List<User>, List<UserResponseData>> mapData = (mapFrom) -> {
        List<UserResponseData> userResponseDataList = new ArrayList<>();

        mapFrom.forEach(item -> {
            UserResponseData userResponseData = new UserResponseData();
            userResponseData.setUsername(item.getUsername());
            userResponseData.setEmail(item.getEmail());
            userResponseData.setId(item.getId());
            userResponseData.setRoles(item.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList()));
            userResponseDataList.add(userResponseData);
        });

        return userResponseDataList;
    };
}
