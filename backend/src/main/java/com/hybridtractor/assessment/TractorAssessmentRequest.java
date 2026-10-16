package com.hybridtractor.assessment;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TractorAssessmentRequest {
    @NotBlank
    private String make;
    @NotBlank
    private String model;
    @Min(1)
    private int ageYears;
    @NotNull
    private Double annualFuelCost;
    @NotNull
    private Double estimatedConversionCost;

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public int getAgeYears() { return ageYears; }
    public void setAgeYears(int ageYears) { this.ageYears = ageYears; }
    public Double getAnnualFuelCost() { return annualFuelCost; }
    public void setAnnualFuelCost(Double annualFuelCost) { this.annualFuelCost = annualFuelCost; }
    public Double getEstimatedConversionCost() { return estimatedConversionCost; }
    public void setEstimatedConversionCost(Double estimatedConversionCost) { this.estimatedConversionCost = estimatedConversionCost; }
}
