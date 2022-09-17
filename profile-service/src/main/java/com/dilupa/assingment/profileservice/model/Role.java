package com.dilupa.assingment.profileservice.model;

import lombok.Data;
import org.checkerframework.common.aliasing.qual.Unique;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "role")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull(message = "Role name shouldn't be empty")
    @Unique()
    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "permission_role", joinColumns = {
            @JoinColumn(name = "role_id", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "permission_id", referencedColumnName = "id")})
    private List<Permission> permissions;

}
