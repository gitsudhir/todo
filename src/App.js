import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);


  useEffect(() => {



    let count = todo.length + 2;
    var url = 'https://sheet.best/api/sheet/1995c67f-abe5-4a6e-a1d5-1ba7303731fa';
    var data = { ['A' + count]: '' + input, ['B' + count]: "" + Date() };
    setInput("");

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));


  }, [todo])
  useEffect(() => {
    fetch('https://sheet.best/api/sheet/1995c67f-abe5-4a6e-a1d5-1ba7303731fa').then(response => response.json()).then(
      function (result) {

        setTodo([...result])

      })

  }, [])
  const todoFunction = e => {
    e.preventDefault();

    const obj = {
      todo: input,
      date: Date()
    };
    // alert(obj.value)
    const temp = [...todo, obj];
    setTodo(temp);
    // setInput("");
  };

  const complete = index => {
    todo[index].open = false;
    setTodo([...todo]);
  };

  return (
    <div className="App">
      <h1>
        <s>Todo</s> List
      </h1>
      <form onSubmit={todoFunction}>
        <label htmlFor="input">What to Todo </label>
        <input
          type="text"
          name="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button type="submit"> click </button>
        <hr />
      </form>
      {todo.map((v, index) => (
        <h3 key={index}>
          {v.todo ? (
            <div>
              {" "}
              <span>
                {index + 1}. {v.todo} {v.date}
              </span>
              <button onClick={() => complete(index)}> complete </button>
            </div>
          ) : (
              <s>
                {" "}
                {index + 1}. {v.todo}{v.date}
              </s>
            )}
        </h3>
      ))}
    </div>
  );
}
export default App;
