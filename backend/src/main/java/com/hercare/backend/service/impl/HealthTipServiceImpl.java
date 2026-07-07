package com.hercare.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.response.HealthTipResponse;
import com.hercare.backend.entity.Prediction;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.RiskLevel;
import com.hercare.backend.repository.PredictionRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.HealthTipService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HealthTipServiceImpl implements HealthTipService {

    private final UserRepository userRepository;
    private final PredictionRepository predictionRepository;

    @Override
    public List<HealthTipResponse> getPersonalizedTips() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Prediction> predictions
                = predictionRepository.findByUserOrderByPredictionDateDesc(user);

        List<HealthTipResponse> tips = new ArrayList<>();

        if (predictions.isEmpty()) {

            tips.add(HealthTipResponse.builder()
                    .category("GENERAL")
                    .title("Complete PCOD Assessment")
                    .description("Take a PCOD prediction assessment to receive personalized health tips.")
                    .build());

            return tips;
        }

        Prediction latest = predictions.get(0);

        if (latest.getRiskLevel() == RiskLevel.HIGH) {

            tips.add(HealthTipResponse.builder()
                    .category("MEDICAL")
                    .title("Consult a Gynecologist")
                    .description("Your latest assessment indicates a high PCOD risk. Please consult a gynecologist.")
                    .build());
        }

        if (latest.getBmi() >= 25) {

            tips.add(HealthTipResponse.builder()
                    .category("DIET")
                    .title("Weight Management")
                    .description("Aim for gradual weight loss with a balanced, low-GI diet and regular exercise.")
                    .build());
        }

        if (Boolean.TRUE.equals(latest.getIrregularPeriods())) {

            tips.add(HealthTipResponse.builder()
                    .category("CYCLE")
                    .title("Track Your Cycle")
                    .description("Record your menstrual cycle regularly and consult your doctor if irregularities continue.")
                    .build());
        }

        if (Boolean.TRUE.equals(latest.getAcne())) {

            tips.add(HealthTipResponse.builder()
                    .category("SKIN")
                    .title("Skin Care")
                    .description("Stay hydrated, eat a balanced diet, and consult a dermatologist if acne persists.")
                    .build());
        }

        if (Boolean.TRUE.equals(latest.getHairGrowth())) {

            tips.add(HealthTipResponse.builder()
                    .category("LIFESTYLE")
                    .title("Hormonal Evaluation")
                    .description("Excess hair growth may be associated with hormonal imbalance. Consult your doctor.")
                    .build());
        }

        tips.add(HealthTipResponse.builder()
                .category("EXERCISE")
                .title("Stay Active")
                .description("Aim for at least 30 minutes of physical activity on most days of the week.")
                .build());

        tips.add(HealthTipResponse.builder()
                .category("MENTAL HEALTH")
                .title("Reduce Stress")
                .description("Practice yoga, meditation, or deep breathing for 15–20 minutes daily.")
                .build());

        return tips;
    }
}
