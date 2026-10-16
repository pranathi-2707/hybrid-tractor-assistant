
package com.hybridtractor.assessment;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/assessment")
public class TractorAssessmentController {

    private final TractorAssessmentService service;
    private final TractorAssessmentRepository repository;

    public TractorAssessmentController(
            TractorAssessmentService service,
            TractorAssessmentRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @PostMapping
    public Map<String, Object> assess(
            @Valid @RequestBody TractorAssessmentRequest request) {

        String recommendation = service.assess(request);
        double paybackYears = service.calculatePaybackYears(request);

        TractorAssessment assessment = new TractorAssessment();
        assessment.setMake(request.getMake());
        assessment.setModel(request.getModel());
        assessment.setAgeYears(request.getAgeYears());
        assessment.setAnnualFuelCost(request.getAnnualFuelCost());
        assessment.setEstimatedConversionCost(
                request.getEstimatedConversionCost());
        assessment.setRecommendation(recommendation);
        assessment.setEstimatedPaybackYears(paybackYears);

        TractorAssessment saved = repository.save(assessment);

        return Map.of(
                "id", saved.getId(),
                "make", saved.getMake(),
                "model", saved.getModel(),
                "recommendation", saved.getRecommendation(),
                "assumedSavingsRate", "30% illustrative assumption",
                "estimatedPaybackYears", saved.getEstimatedPaybackYears(),
                "notice", "Preliminary estimate only; professional engineering inspection required."
        );
    }

    @GetMapping
    public java.util.List<TractorAssessment> getAllAssessments() {
        return repository.findAll();
    }
}
