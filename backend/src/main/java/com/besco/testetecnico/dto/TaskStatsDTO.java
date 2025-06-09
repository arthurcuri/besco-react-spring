package com.besco.testetecnico.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskStatsDTO {
    
    private long total;
    private long pending;
    private long inProgress;
    private long completed;
} 