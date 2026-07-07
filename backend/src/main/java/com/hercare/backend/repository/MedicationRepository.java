package com.hercare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hercare.backend.entity.Medication;
import com.hercare.backend.entity.User;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {

    List<Medication> findByUser(User user);

}
