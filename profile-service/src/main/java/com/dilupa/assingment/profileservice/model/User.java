package com.dilupa.assingment.profileservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.checkerframework.common.aliasing.qual.Unique;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "User name shouldn't be empty")
    @Unique()
    @Column(name = "username")
    @Size(min = 5, message = "Minimum user name character length is 5")
    @Size(max = 30, message = "Maximum user name character length is 30")
    private String username;

    @NotNull(message = "Password shouldn't be empty")
    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 5, message = "Minimum password character length is 5")
    private String password;

    @NotNull(message = "Email shouldn't be empty")
    @Email
    @Unique()
    @Column(name = "email")
    @Size(min = 5, message = "Minimum email character length is 5")
    @Size(max = 30, message = "Maximum email character length is 30")
    private String email;

    @Column(name = "enabled")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean enabled;

    @Column(name = "accountNonExpired")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean accountNonExpired;

    @Column(name = "credentialsNonExpired")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean credentialsNonExpired;

    @Column(name = "accountNonLocked")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean accountNonLocked;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_user", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {
                    @JoinColumn(name = "role_id", referencedColumnName = "id")})
    private List<Role> roles;

}
