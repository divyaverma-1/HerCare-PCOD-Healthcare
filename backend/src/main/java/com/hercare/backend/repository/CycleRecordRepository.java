package com.hercare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hercare.backend.entity.CycleRecord;
import com.hercare.backend.entity.User;

@Repository
public interface CycleRecordRepository extends JpaRepository<CycleRecord, Long> {

    List<CycleRecord> findByUser(User user);

}
