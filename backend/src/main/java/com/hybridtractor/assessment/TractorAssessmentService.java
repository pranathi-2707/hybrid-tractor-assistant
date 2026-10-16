
package com.hybridtractor.assessment;

import org.springframework.stereotype.Service;

@Service
public class TractorAssessmentService {

    private static final double ASSUMED_SAVINGS_RATE = 0.30;

    public String assess(TractorAssessmentRequest request) {
        if (request == null
                
                || request.getAgeYears() <= 0
                || request.getAgeYears() > 20
                || request.getEstimatedConversionCost() == null
                || request.getEstimatedConversionCost() <= 0
                || request.getAnnualFuelCost() == null
                || request.getAnnualFuelCost() <= 0) {
            return "INSPECTION_NEEDED";
        }

        return "PRELIMINARILY_SUITABLE";
    }

    public double calculatePaybackYears(TractorAssessmentRequest request) {
        if (request == null
                || request.getAnnualFuelCost() == null
                || request.getAnnualFuelCost() <= 0
                || request.getEstimatedConversionCost() == null
                || request.getEstimatedConversionCost() <= 0) {
            return 0;
        }

        double estimatedAnnualSavings =
                request.getAnnualFuelCost() * ASSUMED_SAVINGS_RATE;

        double paybackYears =
                request.getEstimatedConversionCost() / estimatedAnnualSavings;

        return Math.round(paybackYears * 100.0) / 100.0;
    }
}
