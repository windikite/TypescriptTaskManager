import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

interface TaskFormProps {
  task: {
    id?: string;
    title: string;
    description: string;
  } | null;
  onSubmit: (task: { id: string; title: string; description: string }) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const validateForm = () => {
    const errors: { title?: string; description?: string } = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!description.trim()) errors.description = 'Description is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const newTask = { id: task?.id || new Date().toISOString(), title, description };
      onSubmit(newTask);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="taskTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="taskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};
