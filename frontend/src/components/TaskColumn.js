import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import './TaskColumn.css';

const TaskColumn = ({ title, status, tasks, onDeleteTask, icon }) => {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({
    id: status,
  });

  const columnStyle = {
    backgroundColor: isOver ? '#2a2a2a' : undefined,
  };

  return (
    <div 
      ref={setNodeRef} 
      className="task-column" 
      style={columnStyle}
    >
      <div className="column-header">
        <h3>
          {icon}
          <span>{title}</span>
        </h3>
        <div className="task-count">
          {tasks.length}
        </div>
      </div>
      
      <div className="tasks-container">
        <SortableContext 
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="empty-column">
              <p>Nenhuma tarefa</p>
              <small>Arraste tarefas para cá</small>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn; 