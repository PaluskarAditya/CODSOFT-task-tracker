import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { add, remove, toggle, update } from './features/taskSlice';

export default function App() {
  const [edit, setEdit] = useState(false);
  const prev = useSelector(state => state.tasks);
  const [note, setNote] = useState({ id: "", text: "", completed: false });
  const [tasks, setTasks] = useState(prev);
  const [txt, setTxt] = useState('');
  const disp = useDispatch();
  useEffect(() => {
    setTasks(prev);
    localStorage.setItem('tasks', JSON.stringify(prev));
  }, [prev])
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  }
  const addTodo = () => {
    disp(add({ id: new Date().getTime(), text: txt, completed: false }))
    setTxt('');
  }
  const delTodo = (id) => {
    console.log(id)
    disp(remove(id));
  }
  const editTodo = (todo) => {
    setEdit(true);
    setNote(todo);
  }
  const updateTodo = (e) => {
    e.preventDefault();
    disp(update(note));
    setEdit(false);
  }

  return (
    <section className='app'>
      {edit ? <div className='edit-modal'>
        <div className='modal-body'>
          <button className='close-modal' onClick={() => setEdit(false)} >X</button>
          <h1>edit modal</h1>
          <form className='edit-form' onSubmit={updateTodo}>
            <input name='text' value={note.text} className='inp' placeholder='update task...' onChange={e => setNote({...note, [e.target.name]: e.target.value})} />
            <button type='submit'>save</button>
          </form>
        </div>
      </div> : ""}
      <h1 className='hero-title'>create tasks</h1>
      <form className='add-todo' onSubmit={handleSubmit}>
        <input className='inp' type={'text'} placeholder={'make dinner...'} value={txt} onChange={e => setTxt(e.target.value)} />
        <button type='submit'>add</button>
      </form>
      <div className='todos'>
        {
          tasks.length !== 0 ? tasks.map(el => <div key={el.id} className='todo'>
            <div className='todo-head'>
              <input className='check' checked={el.completed ? true : false} type={'checkbox'} onChange={() => disp(toggle(el))}/>
              <p className={`todo-text ${el.completed ? 'dashed' : '' }`}>{el.text}</p>
            </div>
            <div className='todo-actions'>
              <button className='todo-edit' onClick={() => editTodo(el)} >edit</button>
              <button className='todo-del' onClick={() => delTodo(el.id)}>delete</button>
            </div>
          </div>) : <h1 className='info'>no tasks...</h1>
        }
      </div>
    </section>
  )
}
