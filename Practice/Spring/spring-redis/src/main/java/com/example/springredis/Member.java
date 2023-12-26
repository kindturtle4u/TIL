package com.example.springredis;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Setter
@Builder
@RedisHash("member") // @RedisHash 어노테이션을 통해 설정한 값을 Redis의 key 값 prefix로 사용합니다.
@ToString
public class Member {

    @Id //@Id 어노테이션은 JPA와 동일한 역할을 수행합니다. "member:{id}"의 위치에 자동으로 generate 값이 들어갑니다.
    private String id;
    @Indexed // 값으로 검색을 할 시에 추가한다.
    private String name;

    private int age;

    // 만료시간을 설정
    // RedishHash 어노테이션에 설정해도 된다.
    // 값은 초 단위로 설정된다.
    @TimeToLive
    private int expired;
}
