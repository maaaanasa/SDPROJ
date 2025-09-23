package com.taskmanager.service;

import java.util.List;

import com.taskmanager.model.Task;

public interface TaskService {
    Task addTask(Task task);
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    Task updateTask(Task task);
    void deleteTaskById(Long id);
}
