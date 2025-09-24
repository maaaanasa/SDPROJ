package com.taskmanager.controller;

import com.taskmanager.model.Task;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add/{userId}")
    @Transactional
    public String addTask(@PathVariable Long userId, @RequestBody Task task) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return "User not found";
        }
        task.setUser(user); // Link task to user
        task.setDeadline(LocalDateTime.now().plusHours(1)); // Example deadline
        taskRepository.save(task);
        return "Task added";
    }

    @GetMapping("/{userId}")
    public List<Task> getTasks(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null)
            return List.of();
        return taskRepository.findByUser(user);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return "Task deleted";
    }
}
