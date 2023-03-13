import { useEffect, useState } from 'react';
const api_base = 'http://127.0.0.1:3001';

function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/api/')
			.then(res => res.json())
			.then(({data}) => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

	const completeTodo = async(e,id)  => {
		e.preventDefault();
		const data = await fetch(api_base + '/api/complete/' + id, {method: "PUT"} ).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));
		
	}
     
	const addTodo = async () => {
		const data = await fetch(api_base + "/api/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				 name: newTodo.name,
				 phoneNumber: newTodo.phoneNumber,
				 date: newTodo.date,
				 directionOut: newTodo.directionOut,
				 directionIn: newTodo.directionIn

			})
		}).then(res => res.json());

		
		console.log(data)
		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async (e,id) => {
		e.stopPropagation();
		const data = await fetch(api_base + '/api/' + id, { method: "DELETE" }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== id));
	}

	return (
		<div className="App">
			<h1>Welcome, Tyler</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? "is-complete" : "")
					} key={todo._id} onClick={(e) => completeTodo(e,todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.name}</div>
						<div className="text">{todo.phoneNumber}</div>
						<div className="text">{todo.date}</div>
						<div className="text">{todo.directionOut}</div>
						<div className="text">{todo.directionIn}</div>

						<div className="delete-todo"  onClick={(e) => deleteTodo(e,todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo((old) => ({ ...old, name: e.target.value }))} name="name" value={newTodo.name} />
						<input type="text" className="add-todo-input" onChange={e => setNewTodo((old) => ({ ...old, phoneNumber: e.target.value }))} name="phoneNumber" value={newTodo.phoneNumber} />
						<input type="text" className="add-todo-input" onChange={e => setNewTodo((old) => ({ ...old, date: e.target.value }))} name="date" value={newTodo.date} />
						<input type="text" className="add-todo-input" onChange={e => setNewTodo((old) => ({ ...old, directionOut: e.target.value }))} name="directionOut" value={newTodo.directionOut} />
						<input type="text" className="add-todo-input" onChange={e => setNewTodo((old) => ({ ...old, directionIn: e.target.value }))} name="directionIn" value={newTodo.directionIn} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;