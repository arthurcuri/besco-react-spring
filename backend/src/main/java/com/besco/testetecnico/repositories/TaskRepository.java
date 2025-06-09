package com.besco.testetecnico.repositories;

import com.besco.testetecnico.entities.Task;
import com.besco.testetecnico.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    List<Task> findByStatus(TaskStatus status);
    
    List<Task> findByOrderByCreatedAtDesc();
    
    List<Task> findByStatusOrderByCreatedAtDesc(TaskStatus status);
} 