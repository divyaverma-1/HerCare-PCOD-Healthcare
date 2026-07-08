package com.hercare.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hercare.backend.service.CustomUserDetailsService;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CustomUserDetailsService userDetailsService) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                // Public
                .requestMatchers(
                        "/",
                        "/api/auth/register",
                        "/api/auth/login"
                ).permitAll()
                // Logged-in profile
                .requestMatchers("/api/profile")
                .authenticated()
                // Patient APIs
                .requestMatchers(
                        "/api/patient/**",
                        "/api/cycle/**",
                        "/api/symptoms/**",
                        "/api/medications/**"
                ).hasRole("PATIENT")
                // Doctor APIs
                .requestMatchers(
                        "/api/doctors/profile",
                        "/api/doctors/profile/**",
                        "/api/doctors/availability",
                        "/api/doctors/availability/**"
                ).authenticated()
                // Public doctor browsing
                .requestMatchers(
                        "/api/doctors",
                        "/api/doctors/search/**",
                        "/api/doctors/specialization/**",
                        "/api/doctors/*"
                ).authenticated()
                // Admin
                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")
                // Other authenticated APIs
                .requestMatchers("/api/appointments/**")
                .authenticated()
                .requestMatchers("/api/predictions/**")
                .authenticated()
                .requestMatchers("/api/health-tips/**")
                .authenticated()
                .anyRequest()
                .authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider
                = new DaoAuthenticationProvider();

        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
