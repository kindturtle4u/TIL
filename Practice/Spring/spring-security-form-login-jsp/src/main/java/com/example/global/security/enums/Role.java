package com.example.global.security.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Getter
public enum Role {
    USER(Set.of("ROLE_USER")),
    BIZ(Set.of("ROLE_BIZ")),
    ADMIN(Set.of("ROLE_USER", "ROLE_BIZ", "ROLE_ADMIN"));

    private final Set<String> grantedAuthorities;

    public List<SimpleGrantedAuthority> getAuthorities() {
        return getGrantedAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
