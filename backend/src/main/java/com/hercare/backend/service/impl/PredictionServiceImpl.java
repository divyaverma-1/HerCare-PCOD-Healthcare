package com.hercare.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.PredictionRequest;
import com.hercare.backend.dto.response.PredictionResponse;
import com.hercare.backend.entity.Prediction;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.RiskLevel;
import com.hercare.backend.repository.PredictionRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.PredictionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PredictionServiceImpl implements PredictionService {

    private final PredictionRepository predictionRepository;
    private final UserRepository userRepository;

    @Override
    public PredictionResponse predict(PredictionRequest request) {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        double bmi = request.getWeight()
                / Math.pow(request.getHeight() / 100.0, 2);

        int score = 0;

        if (Boolean.TRUE.equals(request.getIrregularPeriods())) {
            score += 3;
        }

        if (Boolean.TRUE.equals(request.getAcne())) {
            score += 1;
        }

        if (Boolean.TRUE.equals(request.getHairGrowth())) {
            score += 2;
        }

        if (Boolean.TRUE.equals(request.getHairLoss())) {
            score += 1;
        }

        if (Boolean.TRUE.equals(request.getWeightGain())) {
            score += 2;
        }

        if (Boolean.TRUE.equals(request.getFamilyHistory())) {
            score += 3;
        }

        if (bmi >= 25) {
            score += 2;
        }

        if (request.getExerciseDays() <= 2) {
            score += 1;
        }

        RiskLevel riskLevel;

        if (score <= 3) {
            riskLevel = RiskLevel.LOW;
        } else if (score <= 8) {
            riskLevel = RiskLevel.MEDIUM;
        } else {
            riskLevel = RiskLevel.HIGH;
        }

        String recommendation;

        switch (riskLevel) {

            case LOW:
                recommendation
                        = "Maintain a healthy lifestyle and regular exercise.";
                break;

            case MEDIUM:
                recommendation
                        = "Consult a gynecologist and improve diet and exercise.";
                break;

            default:
                recommendation
                        = "High risk detected. Please consult a gynecologist immediately.";
        }

        Prediction prediction = new Prediction();

        prediction.setAge(request.getAge());
        prediction.setHeight(request.getHeight());
        prediction.setWeight(request.getWeight());
        prediction.setBmi(Math.round(bmi * 100.0) / 100.0);
        prediction.setIrregularPeriods(request.getIrregularPeriods());
        prediction.setAcne(request.getAcne());
        prediction.setHairGrowth(request.getHairGrowth());
        prediction.setHairLoss(request.getHairLoss());
        prediction.setWeightGain(request.getWeightGain());
        prediction.setFamilyHistory(request.getFamilyHistory());
        prediction.setExerciseDays(request.getExerciseDays());
        prediction.setPredictionScore(score);
        prediction.setRiskLevel(riskLevel);
        prediction.setRecommendation(recommendation);
        prediction.setPredictionDate(LocalDateTime.now());
        prediction.setUser(user);

        Prediction saved = predictionRepository.save(prediction);

        return mapToResponse(saved);
    }

    @Override
    public List<PredictionResponse> getPredictionHistory() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return predictionRepository
                .findByUserOrderByPredictionDateDesc(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PredictionResponse mapToResponse(Prediction prediction) {

        return PredictionResponse.builder()
                .id(prediction.getId())
                .bmi(prediction.getBmi())
                .predictionScore(prediction.getPredictionScore())
                .riskLevel(prediction.getRiskLevel())
                .recommendation(prediction.getRecommendation())
                .predictionDate(prediction.getPredictionDate())
                .build();
    }
}
