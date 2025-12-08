package com.example.prescriptionmanagement.prescription;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DailyPrescriptionCount {

    private final LocalDate date;
    private final long count;
}
