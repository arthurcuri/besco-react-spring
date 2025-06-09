package com.besco.testetecnico.services;

import com.besco.testetecnico.dto.TaskRequestDTO;
import com.besco.testetecnico.entities.Task;
import com.besco.testetecnico.enums.TaskStatus;
import com.besco.testetecnico.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findByOrderByCreatedAtDesc();
    }

    public List<Task> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(TaskRequestDTO taskRequestDTO) {
        if (taskRequestDTO.getTitle() == null || taskRequestDTO.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa é obrigatório");
        }

        Task task = new Task();
        task.setTitle(taskRequestDTO.getTitle().trim());
        task.setDescription(taskRequestDTO.getDescription());
        
        // Converte string para enum
        if (taskRequestDTO.getStatus() != null && !taskRequestDTO.getStatus().trim().isEmpty()) {
            try {
                TaskStatus status = TaskStatus.valueOf(taskRequestDTO.getStatus().trim().toUpperCase());
                task.setStatus(status);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Status inválido: " + taskRequestDTO.getStatus());
            }
        } else {
            task.setStatus(TaskStatus.PENDING);
        }

        return taskRepository.save(task);
    }

    public Optional<Task> updateTask(Long id, TaskRequestDTO taskRequestDTO) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        
        if (!optionalTask.isPresent()) {
            return Optional.empty();
        }

        Task task = optionalTask.get();
        
        if (taskRequestDTO.getTitle() != null && !taskRequestDTO.getTitle().trim().isEmpty()) {
            task.setTitle(taskRequestDTO.getTitle().trim());
        }
        
        if (taskRequestDTO.getDescription() != null) {
            task.setDescription(taskRequestDTO.getDescription());
        }
        
        if (taskRequestDTO.getStatus() != null && !taskRequestDTO.getStatus().trim().isEmpty()) {
            try {
                TaskStatus status = TaskStatus.valueOf(taskRequestDTO.getStatus().trim().toUpperCase());
                task.setStatus(status);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Status inválido: " + taskRequestDTO.getStatus());
            }
        }

        Task updatedTask = taskRepository.save(task);
        return Optional.of(updatedTask);
    }

    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Task> getPendingTasks() {
        return getTasksByStatus(TaskStatus.PENDING);
    }

    public List<Task> getInProgressTasks() {
        return getTasksByStatus(TaskStatus.IN_PROGRESS);
    }

    public List<Task> getCompletedTasks() {
        return getTasksByStatus(TaskStatus.COMPLETED);
    }

    public long getTotalTasksCount() {
        return taskRepository.count();
    }

    public long getTasksCountByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status).size();
    }
} 