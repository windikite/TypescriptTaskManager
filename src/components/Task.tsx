import React from 'react';
import { Button } from 'react-bootstrap';

interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string;
  };
  onEdit: (task: { id: string; title: string; description: string }) => void;
  onDelete: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="d-flex justify-content-between">
      <div>
        <h5>{task.title}</h5>
        <p>{task.description}</p>
      </div>
      <div>
        <Button variant="warning" onClick={() => onEdit(task)} className="mr-2">
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
