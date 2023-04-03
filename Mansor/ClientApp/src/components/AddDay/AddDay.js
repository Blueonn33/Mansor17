import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddDay.css';

export class AddDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.createDay = this.createDay.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    invalidInput() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    componentDidMount() {
        this.render();
    }

    async createDay() {
        console.log(this.state.value);
        var input = this.state.value;

        if (input === '') {
            this.invalidInput();
        }
        else {
            await fetch(endpoints.createDay(), {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: input,
                    userId: "3b6f5e57-edde-4dac-84bd-fcf320be8dad"
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")
                    }
                    else {
                        this.props.onDayAdded(this.props.value);
                        this.state.value = '';
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="container">
                        <input type="text" id="input-day"
                            value={this.state.value}
                            onChange={(e) => this.setState({ 'value': e.target.value })}
                        />
                        <span className="addNoteBtn" onClick={this.createDay}>Добави</span>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}


