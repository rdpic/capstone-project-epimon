package it.epicode.epimon.security;

import it.epicode.epimon.entity.RegisteredUser;
import it.epicode.epimon.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTool jwtTool;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        jwtTool.verifyToken(token);
        Integer id = jwtTool.getIdFromUser(token);

        Optional<RegisteredUser> userOptional = userService.getUserById(id);

        if (userOptional.isPresent()) {
            RegisteredUser registeredUser = userOptional.get();
            Authentication authentication = new UsernamePasswordAuthenticationToken(registeredUser, null, registeredUser.getAuthorities());
            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
        } else {
            throw new RuntimeException("User not found.");
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher()
                .match("/auth/**", request.getServletPath());
    }

}
