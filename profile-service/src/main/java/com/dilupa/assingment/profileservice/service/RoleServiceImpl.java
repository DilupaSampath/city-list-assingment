package com.dilupa.assingment.profileservice.service;

import com.dilupa.assingment.profileservice.exception.ResourceNotFoundException;
import com.dilupa.assingment.profileservice.model.Role;
import com.dilupa.assingment.profileservice.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService{

    @Autowired
    RoleRepository roleRepository;


    /**
     * Fetch role by role name
     * @param name
     * @return
     * @throws Exception
     */
    public Role fetchByName(String name) throws Exception{
        Optional<Role> customer = roleRepository.findByName(name);
        if (customer.isPresent()) {
            return customer.get();
        } else {
            throw new ResourceNotFoundException("Role", "Name", name);
        }
    }
}
