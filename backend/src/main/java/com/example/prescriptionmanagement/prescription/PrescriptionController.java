package com.example.prescriptionmanagement.prescription;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/API/v1/prescription")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    // Specification: default list endpoint returns JSON list, defaulting to current month
    @GetMapping
    public ResponseEntity<List<Prescription>> getPrescriptions(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate
    ) {
        if (startDate == null || endDate == null) {
            YearMonth now = YearMonth.now();
            startDate = now.atDay(1);
            endDate = now.atEndOfMonth();
        }
        return ResponseEntity.ok(service.findByDateRange(startDate, endDate));
    }

    // Paged variant used by UI table pagination when needed
    @GetMapping("/page")
    public ResponseEntity<Page<Prescription>> getPrescriptionsPaged(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        if (startDate == null || endDate == null) {
            YearMonth now = YearMonth.now();
            startDate = now.atDay(1);
            endDate = now.atEndOfMonth();
        }
        return ResponseEntity.ok(service.findByDateRange(startDate, endDate, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Prescription> create(@Valid @RequestBody Prescription prescription) {
        Prescription created = service.create(prescription);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> update(
            @PathVariable Long id,
            @Valid @RequestBody Prescription prescription) {
        if (service.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Prescription updated = service.update(id, prescription);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/report/daily")
    public ResponseEntity<List<DailyPrescriptionCount>> getDailyReport(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,
            @RequestParam(defaultValue = "10") int days
    ) {
        return ResponseEntity.ok(service.getDailyCounts(endDate, days));
    }
}
