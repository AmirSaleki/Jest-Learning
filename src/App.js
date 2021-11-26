import "./App.css";
import { useState } from "react";

function App() {
  const [global, setGlobal] = useState();
  const [country, setCountry] = useState("");
  const [searchedCountry, setSearchedCountry] = useState("");

  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");

  const countryHandler = (e) => {
    setSearchedCountry(e.target.value);
  };

  async function getData() {
    const response = await fetch(
      "https://coronavirus-19-api.herokuapp.com/countries"
    );
    const result = await response.json();
    setGlobal(result[0]);
    result.forEach((element) => {
      element.country.toLowerCase().trim() === searchedCountry.toLowerCase() &&
        setCountry(element);
    });
  }

  const addTaskHandler = (e) => {
    setTask(e.target.value);
  };
  const todoListHandler = () => {
    setTodoList([...todoList, task]);
  };
  const removeTaskHandler = (e) => {
    setTodoList(todoList.filter((item) => item !== e.target.value));
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Tools</h1>
        <p>Created by Amir Saleki</p>
      </div>
      <div className="content">
        <div className="fetchData">
          <h2>Corona Stats</h2>
          <div className="fetchHeader">
            <input
              onKeyDown={getData}
              onChange={countryHandler}
              type="text"
              placeholder="Enter country name"
            />
            <button onClick={getData}>Find</button>
          </div>
          <div className="fetchResult">
            {global && (
              <div>
                <h3>Global Statistics</h3>
                <h5>Active Cases: {global.active}</h5>
                <h5>Total Cases: {global.cases}</h5>
                <h5>Critical Cases: {global.critical}</h5>
                <h5>Total Death: {global.deaths}</h5>
                <h5>Today Cases: {global.todayCases}</h5>
                <h5>Today Deaths: {global.todayDeaths}</h5>
              </div>
            )}
            {country !== "" && (
              <div>
                <hr style={{ margin: "1rem" }} />
                <h3>{country.country} Statistics</h3>
                <h5>Active Cases: {country.active}</h5>
                <h5>Total Cases: {country.cases}</h5>
                <h5>Critical Cases: {country.critical}</h5>
                <h5>Total Death: {country.deaths}</h5>
                <h5>Today Cases: {country.todayCases}</h5>
                <h5>Today Deaths: {country.todayDeaths}</h5>
              </div>
            )}
          </div>
        </div>
        <div className="todo">
          <h2>Todo List</h2>
          <input onChange={addTaskHandler} type="text" placeholder="Task" />
          <button onClick={todoListHandler}>Add</button>
          {todoList &&
            todoList.map((item) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
                key={item}
              >
                <h3>{item}</h3>
                <button
                  value={item}
                  onClick={removeTaskHandler}
                  style={{ padding: "0.5rem" }}
                >
                  done
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
