package com.domi.sping_login.JWT;

import io.jsonwebtoken.lang.Assert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;

public final class SimpleGrantedAuthority implements GrantedAuthority {

    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    private final String role;

    public SimpleGrantedAuthority(String role) {
        Assert.hasText(role, "A granted authority textual representation is required");
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return this.role;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof SimpleGrantedAuthority) {
            return this.role.equals(((SimpleGrantedAuthority) obj).role);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.role.hashCode();
    }

    @Override
    public String toString() {
        return this.role;
    }

}
