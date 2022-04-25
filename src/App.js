import "./App.css";

import ListItem from "./components/ListItem";

import { useState } from "react";

const item = {
  id: 1,
  task: "do dishes",
  completed: false,
};

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: "clean stuff",
      completed: false,
    },
    {
      id: 2,
      task: "wash",
      completed: true,
    },
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  let all = tasks;
  if (!showCompleted) {
    all = tasks.filter((item) => item.completed === false);
  }

  function deleteItem(id) {
    setTasks((oldState) => oldState.filter((item) => item.id !== id));
  }
  function submit(e) {
    e.preventDefault();

    const newTask = {
      id: Math.random(),
      task: e.target.elements.name.value,
      completed: false,
    };
    setTasks((oldState) => oldState.concat(newTask));
  }

  function toggleCompletion(id) {
    setTasks((oldState) => {
      return oldState.map((item) => {
        if (id === item.id) {
          const newItem = { ...item };
          newItem.completed = !newItem.completed;
          return newItem;
        }
        return item;
      });
    });
  }
  return (
    <div id="app">
      <button
        onClick={() => {
          setShowCompleted((oldState) => !oldState);
        }}
      >
        Remove completed tasks
      </button>
      <form onSubmit={submit}>
        <label htmlFor="name">Task</label>
        <input type="text" id="name" name="task" />
        <button>Add task</button>
      </form>
      <ul>
        {all.map((task) => (
          <ListItem
            toggleCompletion={toggleCompletion}
            deleteItem={deleteItem}
            {...task}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
