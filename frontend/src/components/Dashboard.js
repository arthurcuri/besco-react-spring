import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { taskService } from '../services/api';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import Statistics from './Statistics';
import { BacklogIcon, PlusIcon, PendingIcon, ProgressIcon, CompletedIcon } from './Icons';
import './Dashboard.css';

const TASK_STATUSES = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Carrega tarefas iniciais
  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Erro ao carregar tarefas:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await taskService.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id;
    
    // Verificar se estamos fazendo drop em uma coluna ou em uma tarefa
    let overColumnStatus;
    
    // Se over.id é um dos status das colunas, use diretamente
    if (Object.values(TASK_STATUSES).includes(over.id)) {
      overColumnStatus = over.id;
    } else {
      // Se não, significa que fizemos drop em uma tarefa, precisamos encontrar a coluna
      const overTask = tasks.find(task => task.id === over.id);
      if (overTask) {
        overColumnStatus = overTask.status;
      } else {
        console.log('Não foi possível determinar a coluna de destino');
        return;
      }
    }

    console.log('=== DEBUG DRAG AND DROP ===');
    console.log('Active task ID:', activeTaskId);
    console.log('Over ID:', over.id);
    console.log('Column status determinado:', overColumnStatus);

    // Encontra a tarefa que está sendo movida
    const activeTask = tasks.find(task => task.id === activeTaskId);
    
    if (!activeTask) {
      console.log('Tarefa ativa não encontrada');
      return;
    }

    // Se a tarefa já está na coluna correta, não faz nada
    if (activeTask.status === overColumnStatus) {
      console.log('Tarefa já está na coluna correta');
      return;
    }

    try {
      console.log('Enviando para backend:', {
        title: activeTask.title,
        description: activeTask.description,
        status: overColumnStatus
      });

      // Atualiza o status da tarefa no backend - enviando apenas os campos necessários
      await taskService.updateTask(activeTaskId, {
        title: activeTask.title,
        description: activeTask.description,
        status: overColumnStatus
      });

      // Atualiza o estado local
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === activeTaskId
            ? { ...task, status: overColumnStatus }
            : task
        )
      );

      // Recarrega as estatísticas
      loadStats();
      console.log('Drag and drop concluído com sucesso');
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      setError('Erro ao mover tarefa');
      
      // Log mais detalhado para debug
      if (err.response) {
        console.error('Erro do servidor:', err.response.data);
        console.error('Status:', err.response.status);
      }
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      loadTasks();
      loadStats();
      setShowForm(false);
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      setError('Erro ao criar tarefa');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      console.log('Deletando tarefa ID:', taskId);
      
      await taskService.deleteTask(taskId);
      console.log('Tarefa deletada com sucesso');
      
      loadTasks();
      loadStats();
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err);
      setError('Erro ao deletar tarefa');
      
      // Log mais detalhado para debug
      if (err.response) {
        console.error('Erro do servidor:', err.response.data);
        console.error('Status:', err.response.status);
      }
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>
          <BacklogIcon size={32} color="#ffffff" />
          <span>Backlog de Tarefas</span>
        </h1>
        <button 
          className="add-task-btn"
          onClick={() => setShowForm(true)}
        >
          <PlusIcon size={18} color="#ffffff" />
          <span>Nova Tarefa</span>
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <Statistics stats={stats} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="task-board">
          <TaskColumn
            title="Tarefas"
            status={TASK_STATUSES.PENDING}
            tasks={getTasksByStatus(TASK_STATUSES.PENDING)}
            onDeleteTask={handleDeleteTask}
            icon={<PendingIcon size={20} color="#ffffff" />}
          />
          
          <TaskColumn
            title="Em Andamento"
            status={TASK_STATUSES.IN_PROGRESS}
            tasks={getTasksByStatus(TASK_STATUSES.IN_PROGRESS)}
            onDeleteTask={handleDeleteTask}
            icon={<ProgressIcon size={20} color="#ffffff" />}
          />
          
          <TaskColumn
            title="Concluídas"
            status={TASK_STATUSES.COMPLETED}
            tasks={getTasksByStatus(TASK_STATUSES.COMPLETED)}
            onDeleteTask={handleDeleteTask}
            icon={<CompletedIcon size={20} color="#ffffff" />}
          />
        </div>
      </DndContext>

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 