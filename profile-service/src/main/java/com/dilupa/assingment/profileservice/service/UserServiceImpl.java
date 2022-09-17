package com.dilupa.assingment.profileservice.service;

import com.dilupa.assingment.profileservice.exception.AlreadyExistsException;
import com.dilupa.assingment.profileservice.exception.ResourceNotFoundException;
import com.dilupa.assingment.profileservice.model.Credentials;
import com.dilupa.assingment.profileservice.model.Role;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.model.UserResponseData;
import com.dilupa.assingment.profileservice.repository.UserRepository;
import com.dilupa.assingment.profileservice.util.UserDetailsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleServiceImpl roleServiceImpl;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    RestTemplate getRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }

    @Autowired
    RestTemplate restTemplate;

    /**
     * client_id, client_secret - Load client ID and client Secret from the application YML and use that
     */
    @Value("${security.oauth2.client.client-id}") String client_id;
    @Value("${security.oauth2.client.client-secret}") String client_secret;
    public User save(User user) throws Exception {

        List<User> userList = userRepository.findByUserNameOrEmail(user.getUsername(), user.getEmail());

        if(userList.size() > 0){
            throw new AlreadyExistsException("User", "Username or Email", user.getUsername() + " and " + user.getEmail());
        }else{
            Role userRole = roleServiceImpl.fetchByName("ROLE_user");
            if(Optional.ofNullable(userRole).isPresent()){
                List<Role> roleList = new ArrayList<>();
                roleList.add(userRole);
                user.setRoles(roleList);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setAccountNonExpired(true);
                user.setAccountNonLocked(true);
                user.setCredentialsNonExpired(true);
                user.setEnabled(true);
                return userRepository.save(user);
            }else{
                throw new ResourceNotFoundException("Role", "Name", "ROLE_user");
            }
        }
    }

    /**
     *
     * @param profileId user ID
     * @return loaded user data
     * @throws Exception
     */
    public List<UserResponseData> fetchById(int profileId) throws Exception {
        Optional<User> userOptional = userRepository.findById(profileId);
        if (userOptional.isPresent()) {
            List<User> userList = new ArrayList<User>(Arrays.asList(userOptional.get()));
            List<UserResponseData> userResponseData = UserDetailsMapper.mapData.apply(userList);
            return userResponseData;
        } else {
            throw new ResourceNotFoundException("User", "ID", profileId);
        }
    }

    /**
     * Load all user details
     * @return
     */
    public List<UserResponseData> fetchAllProfiles() {
        List<User> userList = userRepository.findAll();

        List<UserResponseData> userResponseData = UserDetailsMapper.mapData.apply(userList);
        return userResponseData;
    }


    /**
     * authenticate the user with given credentials
     * @param credentials
     * @return
     */
    public ResponseEntity<Object> authenticate(Credentials credentials) {
        ResponseEntity<Object> customer = authLogin(credentials);
        if (customer.hasBody()) {
            return customer;
        } else {
            return null;
        }
    }

    /**
     * call authorization server authenticate endpoint by using rest template.
     * http://AUTHORIZATION-SERVER/oauth/token endpoint IP and port is managed by the gateway service
     * @param credentials
     * @return
     */
    private ResponseEntity<Object> authLogin(Credentials credentials){

        String auth = client_id + ":" + client_secret;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(client_id, client_secret, Charset.forName("US-ASCII"));

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type",credentials.getGrant_type());
        map.add("username",credentials.getUsername());
        map.add("password",credentials.getPassword());

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        ResponseEntity<Object> response =
                restTemplate.exchange("http://AUTHORIZATION-SERVER/oauth/token",
                        HttpMethod.POST,
                        entity,
                        Object.class);
            return  response;
    }

    /**
     * Update the user role by given user ID
     * @param id
     * @param user
     * @return
     * @throws Exception
     */
    public User updateRoleById(int id, User user) throws Exception {

        Optional<User> oldUserData = userRepository.findById(id);
        Role roleData = roleServiceImpl.fetchByName(user.getRoles().get(0).getName());
        if (oldUserData.isPresent()) {
            if(Optional.ofNullable(roleData).isPresent()){
                List<Role> roleList = new ArrayList<Role>(Arrays.asList(roleData));
                oldUserData.get().setRoles(roleList);
                return userRepository.save(oldUserData.get());
            }else{
                throw new ResourceNotFoundException("Role", "Name", user.getRoles().get(0).getName());
            }
        } else {
            throw new ResourceNotFoundException("User", "ID", id);
        }


    }
}
