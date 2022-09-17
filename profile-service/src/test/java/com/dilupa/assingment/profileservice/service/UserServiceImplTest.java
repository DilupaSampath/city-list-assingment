package com.dilupa.assingment.profileservice.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.dilupa.assingment.profileservice.exception.ResourceNotFoundException;
import com.dilupa.assingment.profileservice.model.Role;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.model.UserResponseData;
import com.dilupa.assingment.profileservice.repository.RoleRepository;
import com.dilupa.assingment.profileservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceImplTest {

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private RoleServiceImpl roleService;

    @Autowired
    IUserService userService;

    @BeforeEach
    void setUp() throws Exception {

        String userName = "testUsername";
        String email = "testEmail@test.com";

        String userNameExist = "testUsernameExist";
        String emailExist = "testEmail@test.comExist";

        Role role = new Role() ;
        role.setId(1);
        role.setName("ROLE_user");
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));


        User user = new User();
        user.setId(1);
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword("test");
        user.setRoles(roleList);

        Mockito.when(userRepository.findByUserNameOrEmail(userName, email)).thenReturn(new ArrayList<>());
        Mockito.when(userRepository.findByUserNameOrEmail(userNameExist, email)).thenReturn(new ArrayList<>(Arrays.asList(user)));
        Mockito.when(userRepository.findByUserNameOrEmail(userName, emailExist)).thenReturn(new ArrayList<>(Arrays.asList(user)));
        Mockito.when(userRepository.findByUserNameOrEmail(userNameExist, emailExist)).thenReturn(new ArrayList<>(Arrays.asList(user)));


        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        Mockito.when(userRepository.findById(2)).thenReturn(Optional.ofNullable(null));
        Mockito.when(userRepository.findAll()).thenReturn(new ArrayList<>(Arrays.asList(user)));

//        Mockito.when(userRepository.findByUserNameOrEmail(userNameExist, email)).thenThrow(new AlreadyExistsException("User", "Username or Email", user.getUsername() + " and " + user.getEmail()));
//        Mockito.when(userRepository.findByUserNameOrEmail(userName, emailExist)).thenThrow(new AlreadyExistsException("User", "Username or Email", user.getUsername() + " and " + user.getEmail()));
    }

    @Test
    @DisplayName("Given valid user details then user should save")
    void whereValidUserDetailsWithSave_thenUserShouldSaved() throws Exception {
        String userName = "testUsername";
        String email = "testEmail@test.com";
        String roleName = "ROLE_user";

        Role role = new Role() ;
        role.setId(1);
        role.setName(roleName);
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));

        User user = new User();
        user.setId(1);
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword("test");
        user.setRoles(roleList);

        Mockito.when(roleService.fetchByName(roleName)).thenReturn(role);
        given(userRepository.save(any())).willReturn(user);

        User userSaved = userService.save(user);

        assertEquals(userName, userSaved.getUsername());
        assertEquals(email, userSaved.getEmail());
        assertEquals(roleName, userSaved.getRoles().get(0).getName());
    }

    @Test()
    @DisplayName("User always should save with the role USER")
    void whereInvalidRoleName_thenAlwaysSavedWithUserRole() throws Exception {

        String userName = "testUsername";
        String email = "testEmail@test.com";
        String roleName = "ROLE_user";

        Role role = new Role() ;
        role.setId(1);
        role.setName(roleName);
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));

        User user = new User();
        user.setId(1);
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword("test");
        user.setRoles(roleList);

        given(userRepository.save(any())).willReturn(user);
        Mockito.when(roleService.fetchByName(roleName)).thenReturn(role);
        User userSaved = userService.save(user);

        assertEquals(userName, userSaved.getUsername());
        assertEquals(email, userSaved.getEmail());
        assertEquals("ROLE_user", userSaved.getRoles().get(0).getName());
    }

    @Test()
    @DisplayName("Get already exist exception base on already existing user name or email")
    void whereAlreadyExistUserNameOrEmail_thenAlreadyExistException() throws Exception {
        String userName = "testUsername";
        String email = "testEmail@test.com";
        String userNameExist = "testUsernameExist";
        String emailExist = "testEmail@test.comExist";
        String roleName = "ROLE_userABCD";
        Role role = new Role() ;
        role.setId(1);
        role.setName(roleName);
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));

        User userWithEmailExist = new User();
        userWithEmailExist.setId(1);
        userWithEmailExist.setUsername(userName);
        userWithEmailExist.setEmail(emailExist);
        userWithEmailExist.setPassword("test");
        userWithEmailExist.setRoles(roleList);

        User userWithNameExist = new User();
        userWithNameExist.setId(1);
        userWithNameExist.setUsername(userNameExist);
        userWithNameExist.setEmail(email);
        userWithNameExist.setPassword("test");
        userWithNameExist.setRoles(roleList);

        User userWithBothNameAndEmailExist = new User();
        userWithBothNameAndEmailExist.setId(1);
        userWithBothNameAndEmailExist.setUsername(userNameExist);
        userWithBothNameAndEmailExist.setEmail(emailExist);
        userWithBothNameAndEmailExist.setPassword("test");
        userWithBothNameAndEmailExist.setRoles(roleList);

        try {
            User userSaved = userService.save(userWithNameExist);
        }catch (Exception e){
            assertEquals("User already exist with given Username or Email : '"+userNameExist+" and "+email+"'", e.getMessage());
        }

        try {
            User userSaved = userService.save(userWithEmailExist);
        }catch (Exception e){
            assertEquals("User already exist with given Username or Email : '"+userName+" and "+emailExist+"'", e.getMessage());
        }

        try {
            User userSaved = userService.save(userWithBothNameAndEmailExist);
        }catch (Exception e){
            assertEquals("User already exist with given Username or Email : '"+userNameExist+" and "+emailExist+"'", e.getMessage());
        }
    }


    @Test
    @DisplayName("Get User base on valid user ID")
    void whereValidUserId_thenUserShouldFound() throws Exception {
        String name = "testUsername";
        String email = "testEmail@test.com";
        String role = "ROLE_user";

        List<UserResponseData> userResponseDataList = userService.fetchById(1);

        assertEquals(name, userResponseDataList.get(0).getUsername());
        assertEquals(email, userResponseDataList.get(0).getEmail());
        assertEquals("ROLE_user", userResponseDataList.get(0).getRoles().get(0));

    }

    @Test()
    @DisplayName("Get not found exception base on invalid valid user ID")
    void whereInvalidUserID_thenUserNotFoundException() throws Exception {

        ResourceNotFoundException userNotFoundException = assertThrows(ResourceNotFoundException.class,
                () -> userService.fetchById(2));

        assertEquals("User not found with ID : '2'", userNotFoundException.getMessage());
    }

//    @Test
//    @DisplayName("Get User base on valid user ID")

//    void whereValidUserCredentials_thenUserShouldAuthenticate() throws Exception {
////        String name = "testUsername";
////        String email = "test@test.com";
////        String grantType = "password";
////        String password = "testpass";
////
////        Credentials credentials = new Credentials();
////        credentials.setGrant_type(grantType);
////        credentials.setUsername(name);
////        credentials.setPassword(password);
////
////
////        JSONObject authData = new JSONObject();
////        authData.put("access_token", "2d74b9c4-e50d-4bd1-b01a-f64260ba4a61");
////        authData.put("token_type", "bearer");
////        authData.put("refresh_token", "2d74b9c4-e50d-4bd1-b01a-f64260ba4a61");
////        authData.put("expires_in", 3599);
////        authData.put("scope", "READ WRIT");
////        authData.put("roles", new ArrayList<>(Arrays.asList("ROLE_ALLOW_EDIT")));
////        authData.put("name", name);
////        authData.put("email", email);
////
////        UserServiceImpl powerMock = PowerMockito.spy(new UserServiceImpl());
////
////        Credentials mockPoint = mock(Credentials.class);
////
////        PowerMockito.doReturn(mockPoint)
////                .when(powerMock, "authLogin", authData);
////
////        ResponseEntity<Object> actualMockPoint = powerMock.authenticate(credentials);
////
//////        assertThat(actualMockPoint, is(mockPoint));
////
////        assertEquals(authData.get("access_token"), actualMockPoint);
//    }

    @Test()
    @DisplayName("Should update user role with valid role and valid user ID")
    void whereUpdateRoleByValidUserId_thenIthShouldUpdateTheRole() throws Exception {

        String userName = "testUsername";
        String email = "testEmail@test.com";
        String roleName = "ROLE_user";
        Role role = new Role() ;
        role.setId(1);
        role.setName("ROLE_user");
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));


        User user = new User();
        user.setId(1);
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword("test");
        user.setRoles(roleList);

        Mockito.when(roleService.fetchByName(roleName)).thenReturn(role);
        given(userRepository.save(any())).willReturn(user);
        User userSaved = userService.updateRoleById(1, user);

        assertEquals(userName, userSaved.getUsername());
        assertEquals(email, userSaved.getEmail());
        assertEquals("ROLE_user", userSaved.getRoles().get(0).getName());
    }

    @Test()
    @DisplayName("Get not found exception when try to update role with invalid valid user ID")
    void whereTryToUpdateRoleWithInvalidUserID_thenUserNotFoundException() throws Exception {

        String userName = "testUsername";
        String email = "testEmail@test.com";
        String roleName = "ROLE_user";

        Role role = new Role() ;
        role.setId(1);
        role.setName("ROLE_user");
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));


        User user = new User();
        user.setId(1);
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword("test");
        user.setRoles(roleList);

        Mockito.when(roleService.fetchByName(roleName)).thenReturn(role);
        given(userRepository.save(any())).willReturn(user);

        ResourceNotFoundException userNotFoundException = assertThrows(ResourceNotFoundException.class,
                () -> userService.updateRoleById(2, user));



        assertEquals("User not found with ID : '2'", userNotFoundException.getMessage());
    }


    @Test()
    @DisplayName("Get not found exception when try to update role with invalid valid role ID")
    void whereTryToUpdateRoleWithInvalidRoleID_thenRoleNotFoundException() throws Exception {

        String userName = "testUsername";
        String email = "testEmail@test.com";
        String roleName = "ROLE_userABC";

        Role role = new Role() ;
        role.setId(1);
        role.setName(roleName);
        List<Role> roleList = new ArrayList<>(Arrays.asList(role));


        User user = new User();
        user.setId(1);
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword("test");
        user.setRoles(roleList);

        Mockito.when(roleService.fetchByName(roleName)).thenReturn(null);
        given(userRepository.save(any())).willReturn(user);

        ResourceNotFoundException userNotFoundException = assertThrows(ResourceNotFoundException.class,
                () -> userService.updateRoleById(1, user));



        assertEquals("Role not found with Name : '"+roleName+"'", userNotFoundException.getMessage());
    }
}