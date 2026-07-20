package com.hercare.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.hercare.backend.entity.User;
import com.hercare.backend.enums.ApprovalStatus;
import com.hercare.backend.enums.Role;
import com.hercare.backend.repository.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (!userRepository.existsByRole(Role.ADMIN)) {

            User admin = User.builder()
                    .fullName("HerCare Admin")
                    .email("admin@hercare.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ADMIN)
                    .phoneNumber("9999999999")
                    .active(true)
                    .registrationVerified(true)
                    .approvalStatus(ApprovalStatus.APPROVED)
                    .build();

            userRepository.save(admin);

            System.out.println("=======================================");
            System.out.println("DEFAULT ADMIN CREATED");
            System.out.println("Email    : admin@hercare.com");
            System.out.println("Password : Admin@123");
            System.out.println("=======================================");
        }
    }
}
