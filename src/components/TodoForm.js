import React from "react";
// import shortid from 'shortid';

export default class TodoForm extends React.Component{

state = {
	text : ''
};

handleChange = event => {
	this.setState({
		[event.target.name] : event.target.value
	});
};

handleSubmit = (event) => {
	event.preventDefault();
	this.props.onSubmit({
		id : "1",
		text : this.state.text,
		complete : false
	})
};

	render() {
		return (
		<form onSubmit = {this.handleSubmit}>	
		<input 
			name = "text"
			value = {this.state.text}
			onChange = {this.handleChange}
			placeholer = "todo..." 
		/>
		<button onClick={this.handleSubmit} > Add Todo</button>
		</form>
	);
	}
}