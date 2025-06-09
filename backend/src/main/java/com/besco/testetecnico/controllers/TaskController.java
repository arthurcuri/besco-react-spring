package com.besco.testetecnico.controllers;

import com.besco.testetecnico.dto.TaskRequestDTO;
import com.besco.testetecnico.dto.TaskStatsDTO;
import com.besco.testetecnico.entities.Task;
import com.besco.testetecnico.enums.TaskStatus;
import com.besco.testetecnico.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET - Listar todas as tarefas
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // GET - Listar tarefas por status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable TaskStatus status) {
        List<Task> tasks = taskService.getTasksByStatus(status);
        return ResponseEntity.ok(tasks);
    }

    // GET - Buscar tarefa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        }
        return ResponseEntity.notFound().build();
    }

    // POST - Criar nova tarefa
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskRequestDTO taskRequestDTO) {
        try {
            Task savedTask = taskService.createTask(taskRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT - Atualizar tarefa
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequestDTO taskRequestDTO) {
        try {
            Optional<Task> updatedTask = taskService.updateTask(id, taskRequestDTO);
            
            if (updatedTask.isPresent()) {
                return ResponseEntity.ok(updatedTask.get());
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno do servidor: " + e.getMessage());
        }
    }

    // DELETE - Remover tarefa
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            boolean deleted = taskService.deleteTask(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar tarefa: " + e.getMessage());
        }
    }

    // GET - Listar apenas tarefas pendentes
    @GetMapping("/pending")
    public ResponseEntity<List<Task>> getPendingTasks() {
        List<Task> tasks = taskService.getPendingTasks();
        return ResponseEntity.ok(tasks);
    }

    // GET - Listar apenas tarefas em andamento
    @GetMapping("/in-progress")
    public ResponseEntity<List<Task>> getInProgressTasks() {
        List<Task> tasks = taskService.getInProgressTasks();
        return ResponseEntity.ok(tasks);
    }

    // GET - Listar apenas tarefas concluídas
    @GetMapping("/completed")
    public ResponseEntity<List<Task>> getCompletedTasks() {
        List<Task> tasks = taskService.getCompletedTasks();
        return ResponseEntity.ok(tasks);
    }

    // GET - Estatísticas do backlog
    @GetMapping("/stats")
    public ResponseEntity<TaskStatsDTO> getTasksStats() {
        TaskStatsDTO stats = new TaskStatsDTO(
            taskService.getTotalTasksCount(),
            taskService.getTasksCountByStatus(TaskStatus.PENDING),
            taskService.getTasksCountByStatus(TaskStatus.IN_PROGRESS),
            taskService.getTasksCountByStatus(TaskStatus.COMPLETED)
        );
        return ResponseEntity.ok(stats);
    }
} 