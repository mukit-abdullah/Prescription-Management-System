package com.example.prescriptionmanagement.prescription;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "prescriptions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate prescriptionDate;

    @NotBlank
    @Column(nullable = false)
    private String patientName;

    @NotNull
    @Min(0)
    @Max(120)
    private Integer patientAge;

    @NotBlank
    @Column(nullable = false)
    private String patientGender;

    @NotBlank
    @Column(nullable = false, length = 2000)
    private String diagnosis;

    @NotBlank
    @Column(nullable = false, length = 4000)
    private String medicines;

    private LocalDate nextVisitDate;
}
