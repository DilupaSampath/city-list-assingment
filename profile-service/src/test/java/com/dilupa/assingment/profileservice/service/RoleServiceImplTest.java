package com.dilupa.assingment.profileservice.service;

import com.dilupa.assingment.profileservice.exception.ResourceNotFoundException;
import com.dilupa.assingment.profileservice.model.Role;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.repository.RoleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RoleServiceImplTest {

    @Autowired
    private IRoleService roleService;

    @MockBean
    private RoleRepository roleRepository;

    @BeforeEach
    void setUp() throws Exception {
        Role role = new Role() ;
        role.setId(1);
        role.setName("ROLE_ALLOW_EDIT");

        Mockito.when(roleRepository.findByName("ROLE_ALLOW_EDIT")).thenReturn(Optional.ofNullable(role));

        Mockito.when(roleRepository.findByName("ROLE_ALLOW_EDIT123")).thenThrow(new ResourceNotFoundException("Role", "Name", "ROLE_ALLOW_EDIT123"));
    }

    @Test
    @DisplayName("Get role base on valid role name")
    void whereValidRoleName_thenRoleShouldFound() throws Exception {
        String roleName = "ROLE_ALLOW_EDIT";

        Role roleFound = roleService.fetchByName(roleName);

        assertEquals(roleName, roleFound.getName());

    }

    @Test()
    @DisplayName("Get not found exception base on invalid valid role name")
    void whereInvalidRoleName_thenRoleNotFoundException() throws Exception {

        String roleName = "ROLE_ALLOW_EDIT123";
        ResourceNotFoundException roleNotFoundException = assertThrows(ResourceNotFoundException.class,
                () -> roleRepository.findByName(roleName));

        assertEquals("Role not found with Name : 'ROLE_ALLOW_EDIT123'", roleNotFoundException.getMessage());
    }
}