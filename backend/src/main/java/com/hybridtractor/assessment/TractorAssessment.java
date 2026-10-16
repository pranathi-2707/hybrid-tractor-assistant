
package com.hybridtractor.assessment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tractor_assessments")
public class TractorAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private int ageYears;
    private Double annualFuelCost;
    private Double estimatedConversionCost;
    private String recommendation;
    private Double estimatedPaybackYears;

    public TractorAssessment() {
    }

    public Long getId() { return id; }
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
    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
    public Double getEstimatedPaybackYears() { return estimatedPaybackYears; }
    public void setEstimatedPaybackYears(Double estimatedPaybackYears) { this.estimatedPaybackYears = estimatedPaybackYears; }
}
