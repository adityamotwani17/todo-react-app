import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoApp() {
  let [todos, setTodos] = useState([]);
  let [newTask, setNewTask] = useState("");
  let [newDate, setNewDate] = useState("");

  let addTodo = () => {
    if (newTask == "" || newDate == "") {
      alert("Enter all inputs !");
    } else {
      setTodos([
        ...todos,
        {
          task: newTask,
          id: uuidv4(),
          isDone: false,
          date: new Date(newDate).toDateString(),
        },
      ]);
      setNewTask("");
      setNewDate("");
    }
  };

  let deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  let updateInput = (event) => {
    let updatedValue = event.target.value;
    setNewTask(updatedValue.toUpperCase());
  };
  let updateDate = (event) => {
    let updatedDate = event.target.value;
    setNewDate(updatedDate);
  };

  let editTask = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            task: prompt("edit your task").toUpperCase(),
            isDone: false,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAllDone = () => {
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      })
    );
  };

  return (
    <>
      <div>
        <h1>Todo App</h1>
        <br />
        <input
          type="text"
          placeholder="Enter you Task !"
          value={newTask}
          onChange={updateInput}
        />
        <br />
        <br />
        <input type="date" onChange={updateDate} value={newDate} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={addTodo}>Add Task</button>
        <br />
        <br />
        <hr />
        <p>Tasks:</p>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={
                  todo.isDone
                    ? { textDecorationLine: "line-through", color: "#f3fe75" }
                    : {}
                }
              >
                &#128204;&nbsp;{todo.task}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => deleteTask(todo.id)}>DELETE</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => editTask(todo.id)}>EDIT TASK</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => markDone(todo.id)}>MARK AS DONE</button>
              <br />
              <pre>Deadline: {todo.date}</pre>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <button onClick={markAllDone}>MARK ALL AS DONE</button>
      </div>
    </>
  );
}
