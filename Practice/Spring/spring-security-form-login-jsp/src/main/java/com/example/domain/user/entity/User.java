package com.example.domain.user.entity;


import com.example.global.common.entity.BaseEntity;
import com.example.global.security.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id", nullable = false)
    private Long id;

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    Role role;
}
