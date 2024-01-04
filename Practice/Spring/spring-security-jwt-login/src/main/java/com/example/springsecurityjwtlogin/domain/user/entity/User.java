package com.example.springsecurityjwtlogin.domain.user.entity;

import com.example.springsecurityjwtlogin.domain.user.enums.UserType;
import com.example.springsecurityjwtlogin.global.common.entity.BaseEntity;
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

    private String loginId;

    private String password;

    private String name;

    private String nickName;

    private LocalDate birthDay;

    private String phoneNumber;

    private String email;

    @Enumerated(EnumType.STRING)
    private UserType userType;
}
