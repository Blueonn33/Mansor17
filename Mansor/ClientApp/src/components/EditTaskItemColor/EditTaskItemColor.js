import React, { Component } from 'react';
import './EditTaskItemColor.css';
import '../../custom.css';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

export class EditTaskItemColor extends Component {
    static displayColor = EditTaskItemColor.name;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentColor: '',
            newColor: '',
            errorMessage: '',
            textColor: '',
        }
    }

    changedColor() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    async componentDidMount() {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        let taskItemId = splittedURL[splittedURL.length - 1]
        fetch(endpoints.getTaskItemColor(taskItemId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ currentColor: data.color });
            });
        this.render();
    }

    checkIfColorCodeIsValid(colorCodeString) {
        let colorCodeRegex = new RegExp(`^#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}$`)
        let isColorCodeValid = colorCodeRegex.test(colorCodeString)
        return isColorCodeValid
    }

    handleColorChange = event => {
        this.setState({ newColor: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        var input = this.state.newColor;
        console.log(input);

        const errors = {
            invalidColor: "Невалиден цвят.",
            existingColor: "Цветът е като предишния."
        }

        const color = {
            error: "red",
            success: "green"
        }

        if (!this.checkIfColorCodeIsValid(input)) {
            this.setState({ errorMessage: errors.invalidColor });
            this.setState({ textColor: color.error });
        }
        else if (!input.startsWith('#')) {
            this.setState({ errorMessage: errors.invalidColor });
            this.setState({ textColor: color.error });
        }
        else if (input.length > 7) {
            this.setState({ errorMessage: errors.invalidColor });
            this.setState({ textColor: color.error });
        }
        else if (input == this.state.currentColor) {
            this.setState({ errorMessage: errors.existingColor });
            this.setState({ textColor: color.error });
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            let taskItemId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.editTaskItem(taskItemId), {
                method: 'PATCH',
                body: JSON.stringify({ color: this.state.newColor }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ currentColor: data.color, newColor: '' });
                    this.setState({ errorMessage: '' });
                    this.changedColor();
                })
                .catch(error => {
                    console.error(error);
                });
        }
        
    };

    render() {
        return (
            <div className="editTaskItemContainer">
                <div id="editItemForm">
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="currentColor">{this.state.currentColor}</h3>
                        <hr id="line"></hr>
                        <label htmlFor="" id="editColor-text">Нов цвят:</label>
                        <input type="text" name="taskItemColorField" id="editInput"
                            value={this.state.newColor}
                            onChange={this.handleColorChange}
                            style={{ borderBottomColor: this.state.textColor }}
                            placeholder = "#......"
                        />
                        <div id="errorEditItem">
                            <p style={{ color: this.state.textColor }}>
                                {this.state.errorMessage}</p>
                        </div>
                        <button id='editBack' onClick={this.close}>
                            <a href={`https://localhost:44414/taskGroups`} id="editBack-text">Назад</a>
                        </button>
                        <button type="submit" id="editSubmit" method="post" className="btn" name="editTaskItem">Промени</button>
                    </form>
                </div>
                <div id="snackbar">Успешно променихте цвета</div>
            </div>

        );
    }
}
