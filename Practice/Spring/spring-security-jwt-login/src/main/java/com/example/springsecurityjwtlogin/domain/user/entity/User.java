package com.example.springsecurityjwtlogin.domain.user.entity;

import com.example.springsecurityjwtlogin.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseEntity {
    @Id @GeneratedValue
    private Long id;

    private String password;

    private String name;
}
