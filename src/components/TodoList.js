import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

/*
Todo MVC
1. Add Todo
2. Display todos
3. Cross off todo
4. Show number of active todos
5. Filter all/active/complete
6. Delete Todo
7. Delete all complete
8. Button to toggle all On/Off
*/

export default class TodoList extends React.Component {

state = {
	todos : [],
	todoToShow : 'all',
	toggleAllComplete : true,
};

addTodo = (todo) => {
	this.setState(state => ({
		todos : [todo, ...state.todos]
	}));
};

toggleComplete = (id) => {
	this.setState(state => ({
		todos : state.todos.map(todo => {
			if (todo.id === id) {
				//suppose to update
				return {
					...todo,
					complete : !todo.complete
				};
			} else {
				return todo;
			}
		})
	}));
};

updateTodoToShow = s => {
	this.setState(state => ({
		todoToShow : s
	}));
};

handleDeleteTodo = id => {
	this.setState(state => ({
		todos : state.todos.filter(todo => todo.id !== id),
	}));
};

removeAllTodoThatAreComplete = () => {
	this.setState (state => (
		{todos : state.todos.filter(todo => !todo.complete)
	}));
};

	render() {

		let todos = [];

		if (this.state.todoToShow === "all") {
			todos = this.state.todos;
		} else if (this.state.todoToShow === "active") {
			todos = this.state.todos.filter(todo => !todo.complete);
		} else if (this.state.todotoShow === "complete") {
			todos = this.state.todos.filter(todo => todo.complete);
		}

		return <div>
		<TodoForm onSubmit={this.addTodo}/>
		{this.state.todos.map(todo => (
			<Todo 
				key={todo.id} 
				toggleComplete = {() => this.toggleComplete(todo.id)}
				onDelete = {() => this.handleDeleteTodo(todo.id)}
				todo={todo} 
			/>
			))}
		<div>
			todos left: {this.state.todos.filter(todo => !todo.complete).length}
		</div>
		<div>
			<button onClick={() => this.updateTodoToShow("all")}> All </button>
			<button onClick={() => this.updateTodoToShow("active")}> Active </button>
			<button onClick={() => this.updateTodoToShow("complete")}> Complete </button>
		</div>
		{this.state.todos.some(todo => todo.complete) ? 
		(<div>
			<button onClick={this.removeAllTodoThatAreComplete}> Remove all completed todos </button>
		</div>) : null }
		<div>
		<button 
			onClick={() => 
				this.setState({
					todos : this.state.todos.map(todo => ({
						...todo,
						complete : this.state.toggleAllComplete
					})),
					toggleAllComplete : !this.state.toggleAllComplete
				})
			}> 
			toggle all complete : {`${this.state.toggleAllComplete}`} 
		</button>
		</div>
		</div>;
	}
}