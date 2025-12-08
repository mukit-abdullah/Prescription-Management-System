package com.example.prescriptionmanagement.prescription;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    List<Prescription> findByPrescriptionDateBetween(LocalDate startDate, LocalDate endDate);

    Page<Prescription> findByPrescriptionDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);
}
