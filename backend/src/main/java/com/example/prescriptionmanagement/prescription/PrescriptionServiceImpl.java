package com.example.prescriptionmanagement.prescription;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository repository;

    public PrescriptionServiceImpl(PrescriptionRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Prescription> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Prescription> findByDateRange(LocalDate start, LocalDate end) {
        return repository.findByPrescriptionDateBetween(start, end);
    }

    @Override
    public Page<Prescription> findByDateRange(LocalDate start, LocalDate end, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("prescriptionDate").descending());
        return repository.findByPrescriptionDateBetween(start, end, pageable);
    }

    @Override
    public List<DailyPrescriptionCount> getDailyCounts(LocalDate endDate, int days) {
        if (endDate == null) {
            endDate = LocalDate.now();
        }
        if (days <= 0) {
            days = 10;
        }

        LocalDate startDate = endDate.minusDays(days - 1L);
        List<Prescription> prescriptions = repository.findByPrescriptionDateBetween(startDate, endDate);

        Map<LocalDate, Long> countsByDate = prescriptions.stream()
                .collect(Collectors.groupingBy(Prescription::getPrescriptionDate, Collectors.counting()));

        List<DailyPrescriptionCount> result = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            LocalDate date = startDate.plusDays(i);
            long count = countsByDate.getOrDefault(date, 0L);
            result.add(new DailyPrescriptionCount(date, count));
        }

        return result;
    }

    @Override
    public Optional<Prescription> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Prescription create(Prescription prescription) {
        prescription.setId(null);
        return repository.save(prescription);
    }

    @Override
    public Prescription update(Long id, Prescription prescription) {
        prescription.setId(id);
        return repository.save(prescription);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
