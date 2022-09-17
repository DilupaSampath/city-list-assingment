package com.dilupa.assingment.profileservice.repository;

import com.dilupa.assingment.profileservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {


    @Query("SELECT u FROM User u WHERE u.username = ?1 OR u.email = ?2")
    List<User> findByUserNameOrEmail(String username, String email);
}
