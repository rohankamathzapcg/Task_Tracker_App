import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan, faCancel } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import AddTask from './AddTask';

const getTodoList = () => {
  let list = localStorage.getItem('To-do_List');
  if (list) {
    return JSON.parse(localStorage.getItem("To-do_List"));
  } else {
    return [];
  }
}
const TodoForm = () => {
  const [todo, setTodo] = useState(getTodoList());
  const [newTask, setNewTask] = useState('');
  const [updateTask, setUpdateTask] = useState({ id: null, title: '', status: false });

  useEffect(() => {
    localStorage.setItem("To-do_List", JSON.stringify(todo));
  })

  const HandleAddTask = () => {
    if (newTask) {
      let newId = todo.length + 1;
      let newEntry = {
        id: newId,
        title: newTask,
        status: false
      }
      setTodo([...todo, newEntry])
      toast.success('Task Added successfully!', {
        theme: "dark",
        autoClose: 1000,
      });
      setNewTask('')
    }
  }

  const HandleDeleteTask = (id) => {
    let newTask = todo.filter(task => task.id !== id)
    setTodo(newTask)
    toast.success('Task deleted successfully!', {
      theme: "dark",
      autoClose: 1000,
    });
  }

  const MarkDone = (id) => {
    let newTask = todo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setTodo(newTask)
  }

  const ChangeTask = (e) => {
    let updatedEntry = {
      id: updateTask.id,
      title: e.target.value,
      status: updateTask.status ? true : false
    }
    setUpdateTask(updatedEntry)
  }

  const UpdateTasks = () => {
    console.log(updateTask)
    let filterRecords = [...todo].filter(task => task.id !== updateTask.id)
    let updatedObject = [...filterRecords, updateTask]
    setTodo(updatedObject)
    toast.success('Task Updated successfully!', {
      theme: "dark",
      autoClose: 1000,
    });
    setUpdateTask('')
  }

  return (
    <>
      <div className='mt-4 text-center'>
        <h1 className="text-white"><span className="badge text-bg-primary mb-4">To-Do</span>&nbsp;Application</h1>
      </div>

      <ToastContainer />

      {/* Add Task */}  
      <AddTask newTask={newTask} setNewTask={setNewTask} HandleAddTask={HandleAddTask} />

      {/* Update Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Update your To-Do Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control shadow-none" id="inputTasks" value={updateTask.title} placeholder="Enter your tasks....." onChange={(e) => ChangeTask(e)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => UpdateTasks()}>Update Task</button>
            </div>
          </div>
        </div>
      </div>

      <p className="h1 text-warning text-center">Getting Things Done!</p>
      <div className='d-flex justify-content-center'>
        <div className='container-fluid shadow-lg rounded border p-5 m-3'>
          {
            todo.length === 0 ? (<p className='h3 text-center'>No Tasks Found....</p>) : (

              todo.sort((a, b) => a.id > b.id ? 1 : -1).map((task, index) => (
                <div className='row taskBg' key={index}>
                  <div className={task.status ? 'done' : ''}>
                    <span className='taskNumber'>{index + 1}</span>
                    <span className='taskText' style={{ maxWidth: '300px', wordWrap: 'break-word', color: "white" }}>
                      {task.title}
                    </span>
                  </div>
                  <div className='iconsWrap'>
                    <span title='Completed / Not Completed' onClick={() => MarkDone(task.id)}>
                      {
                        !task.status ? (<FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: '1rem' }} />) : (<FontAwesomeIcon icon={faCancel} style={{ fontSize: '1rem', color: "red" }} />)
                      }
                    </span>
                    {
                      !task.status ? (
                        <span title='Edit'>
                          <button type="button" style={{ background: 'transparent', border: 'none', color: "yellow" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setUpdateTask({ id: task.id, title: task.title, status: task.status ? true : false })}>
                            <FontAwesomeIcon icon={faPen} style={{ fontSize: '1rem' }} />
                          </button>
                        </span>
                      ) : null
                    }
                    <span title='Delete' onClick={() => HandleDeleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: '1rem' }} />
                    </span>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </>
  );
};

export default TodoForm;
