package com.example.springsecurityjwtlogin.domain.user.repository;

import com.example.springsecurityjwtlogin.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);
}
