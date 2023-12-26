package com.example.springredis;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MemberRedisRepository extends CrudRepository<Member, String> {
    Optional<Member> findByName(String name);
}
