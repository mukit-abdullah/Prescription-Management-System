package com.example.prescriptionmanagement.prescription;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface PrescriptionService {

    List<Prescription> findAll();

    List<Prescription> findByDateRange(LocalDate start, LocalDate end);

    Page<Prescription> findByDateRange(LocalDate start, LocalDate end, int page, int size);

    List<DailyPrescriptionCount> getDailyCounts(LocalDate endDate, int days);

    Optional<Prescription> findById(Long id);

    Prescription create(Prescription prescription);

    Prescription update(Long id, Prescription prescription);

    void delete(Long id);
}
