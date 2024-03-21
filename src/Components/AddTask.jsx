import React from 'react';

const AddTask = ({ newTask, setNewTask, HandleAddTask }) => {
    return (
        <>
            <div className='row m-3'>
                <div className='col'>
                    <input type="text" className="form-control shadow-none" value={newTask} onChange={(e) => setNewTask(e.target.value)} id="inputTasks" placeholder="Enter your tasks....." />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success" onClick={() => HandleAddTask()}>Add Tasks</button>
                </div>
            </div>

        </>
    );
}

export default AddTask;
