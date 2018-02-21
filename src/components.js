import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ShoppingListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem(name) {
        const items = [...this.state.items, name];
        this.setState({
            items
        });
    }

    render() {
        return (
            <div>
                <InputArea onSubmit={this.addItem} />
                <ShoppingList items={this.state.items} />
            </div>
        );
    }
}

export class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.setText = this.setText.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    setText(event) {
        this.setState({ text: event.target.value });
    }

    handleClick() {
        this.props.onSubmit(this.state.text);
    }

    render() {
        return (
            <div>
                <input value={this.state.text} onChange={this.setText} />
                <button onClick={this.handleClick}>Add</button>
            </div>
        );
    }
}

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul>
                {this.props.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    }
}

ShoppingList.defaultProps = { items: [] };