package com.hercare.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("HerCare - PCOD Healthcare API")
                        .description(
                                "REST API for the HerCare PCOD Healthcare Management System.\n\n"
                                + "Features include:\n"
                                + "• JWT Authentication\n"
                                + "• User Management\n"
                                + "• Doctor Management\n"
                                + "• Appointment Booking\n"
                                + "• Cycle Tracking\n"
                                + "• Symptom Tracking\n"
                                + "• Medication Reminder\n"
                                + "• Prediction Module\n"
                                + "• Health Tips"
                        )
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Divya")
                                .email("your-email@example.com")
                        )
                )
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(SECURITY_SCHEME_NAME)
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        SECURITY_SCHEME_NAME,
                                        new SecurityScheme()
                                                .name(SECURITY_SCHEME_NAME)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}
