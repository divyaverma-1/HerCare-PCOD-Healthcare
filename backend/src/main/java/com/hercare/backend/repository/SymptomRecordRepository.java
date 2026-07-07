package com.hercare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hercare.backend.entity.SymptomRecord;
import com.hercare.backend.entity.User;

@Repository
public interface SymptomRecordRepository extends JpaRepository<SymptomRecord, Long> {

    List<SymptomRecord> findByUser(User user);

}
