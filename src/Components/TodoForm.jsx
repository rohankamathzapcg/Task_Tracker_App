import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const TodoForm = () => {

  const [too, setTodo] = useState([
    { "id": 1, "title": "Task-1", "status": false },
    { "id": 2, "title": "Task-2", "status": false },

  ])
  const [newTask, setNewTask] = useState('');
  const [updateTask, setUpdateTask] = useState('')

  return (
    <>
      <div className='mt-4'>
        <h2 className='text-center mb-4'>Todo List App</h2>
      </div>
    </>
  );
}

export default TodoForm;
