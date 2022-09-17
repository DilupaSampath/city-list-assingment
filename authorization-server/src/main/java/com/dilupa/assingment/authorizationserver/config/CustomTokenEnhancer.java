package com.dilupa.assingment.authorizationserver.config;

import com.dilupa.assingment.authorizationserver.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
public class CustomTokenEnhancer implements TokenEnhancer {

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        final Map<String, Object> additionalInfo = new HashMap<>();

        additionalInfo.put("name", user.getUsername());
        additionalInfo.put("email", user.getEmail());
        additionalInfo.put("roles", user.getRoles().stream().map(role-> role.getName()).collect(Collectors.toList()));
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);

        return accessToken;
    }
}
