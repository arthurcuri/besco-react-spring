package com.besco.testetecnico.enums;

public enum TaskStatus {
    PENDING("Tarefas"),
    IN_PROGRESS("Em andamento"),
    COMPLETED("Concluídas");

    private final String description;

    TaskStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
} 