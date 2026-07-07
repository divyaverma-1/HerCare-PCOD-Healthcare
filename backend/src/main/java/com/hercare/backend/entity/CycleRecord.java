package com.hercare.backend.entity;

import java.time.LocalDate;

import com.hercare.backend.enums.CycleFlow;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cycle_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CycleRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate periodStartDate;

    private LocalDate periodEndDate;

    private Integer cycleLength;

    private Integer periodLength;

    @Enumerated(EnumType.STRING)
    private CycleFlow flow;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
