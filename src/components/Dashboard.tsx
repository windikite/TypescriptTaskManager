import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import LogoutButton from './LogOut';

interface TaskType {
  id: string;
  title: string;
  description: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);

  const handleCreateTask = (task: TaskType) => {
    setTasks([...tasks, task]);
    setModalOpen(false);
  };

  const handleEditTask = (updatedTask: TaskType) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const openCreateModal = () => {
    setTaskToEdit(null);
    setModalOpen(true);
  };

  const openEditModal = (task: TaskType) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mb-4">Task Manager</h1>
          <Button variant="primary" onClick={openCreateModal}>Add Task</Button>

          <div className="mt-4">
            {tasks.length === 0 ? (
              <p>No tasks available</p>
            ) : (
              <ul className="list-group">
                {tasks.map(task => (
                  <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <Task task={task} onEdit={openEditModal} onDelete={handleDeleteTask} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal for creating or editing a task */}
      <Modal show={isModalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            task={taskToEdit}
            onSubmit={taskToEdit ? handleEditTask : handleCreateTask}
          />
        </Modal.Body>
      </Modal>
      <LogoutButton />
    </Container>
  );
};

export default TaskManager;
