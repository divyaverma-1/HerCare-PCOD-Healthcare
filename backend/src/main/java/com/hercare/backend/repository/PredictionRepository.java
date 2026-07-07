package com.hercare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hercare.backend.entity.Prediction;
import com.hercare.backend.entity.User;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    List<Prediction> findByUserOrderByPredictionDateDesc(User user);

}
