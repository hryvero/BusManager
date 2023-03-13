import { useEffect, useState } from 'react';
const api_base = 'http://127.0.0.1:3001';

function App() {
	const [bus, setBus] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newBus, setNewBus] = useState("");

	useEffect(() => {
		GetBuses();
	}, []);

	const GetBuses = () => {
		fetch(api_base + '/api/')
			.then(res => res.json())
			.then(({data}) => setBus(data))
			.catch((err) => console.error("Error: ", err));
	}

	const completeTodo = async (e,id)  => {
		e.preventDefault();
		const data =  await fetch(api_base + '/api/complete/' + id, {method: "PUT"} ).then(res => res.json());

		setBus(bus => bus.map(item => {
			if (item._id === data._id) {
				return data;
			}

			return item;
		}));
		
	}
     
	const addBus = async () => {
		const data = await fetch(api_base + "/api/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				 name: newBus.name,
				 phoneNumber: newBus.phoneNumber,
				 date: newBus.date,
				 directionStart: newBus.directionStart,
				 directionFinish: newBus.directionFinish

			})
		}).then(res => res.json());

		
		console.log(data)
		setBus([...bus, data]);

		setPopupActive(false);
		setNewBus("");
	}

	const deleteBus = async (e,id) => {
		e.stopPropagation();
		const data = await fetch(api_base + '/api/' + id, { method: "DELETE" }).then(res => res.json());


		console.log(data)
		setBus(bus => bus.filter(item => item._id !== id));
	}

	return (
		<div className="App">
			<h1>Welcome, User</h1>
			<h4>Bus schedule:</h4>

			<div className="todos">
				{bus.length > 0 ? bus.map(bus => (
					<div className={
						"todo" + (bus.complete ? " is-complete" : " is-not-complete")
					} key={bus._id} onClick={(e) => completeTodo(e,bus._id)}>
						<div className="checkbox"></div>
					
						<div className="text">Name of driver:{bus.name}</div>
						<div className="text">Phone number:{bus.phoneNumber}</div>
						<div className="text">Date&time: {bus.date}</div>
						<div className="text">From:{bus.directionStart}</div>
						<div className="text">To:{bus.directionFinish}</div>
					
						<div className="delete-todo"  onClick={(e) => deleteBus(e,bus._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no buses</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewBus((old) => ({ ...old, name: e.target.value }))} name="name" value={newBus.name} />
						<input type="text" className="add-todo-input" onChange={e => setNewBus((old) => ({ ...old, phoneNumber: e.target.value }))} name="phoneNumber" value={newBus.phoneNumber} />
						<input type="text" className="add-todo-input" onChange={e => setNewBus((old) => ({ ...old, date: e.target.value }))} name="date" value={newBus.date} />
						<input type="text" className="add-todo-input" onChange={e => setNewBus((old) => ({ ...old, directionStart: e.target.value }))} name="directionOut" value={newBus.directionStart} />
						<input type="text" className="add-todo-input" onChange={e => setNewBus((old) => ({ ...old, directionFinish: e.target.value }))} name="directionIn" value={newBus.directionFinish} />
						<div className="button" onClick={addBus}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;