﻿import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddTaskItem.css';
import authService from '../api-authorization/AuthorizeService';

export class AddTaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            taskGroupId: '',
        }
        this.createTaskItem = this.createTaskItem.bind(this);
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

    async createTaskItem(taskGroupId) {
        console.log(this.state.value);
        var input = this.state.value;

        if (input === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            taskGroupId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createTaskItem(taskGroupId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    value: input,
                    color: '#B3B3B3',
                    taskGroupId: taskGroupId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")
               
                    }
                    else {
                        this.props.onTaskItemAdded(this.props.value);
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
                        <input type="text" id="input-item"
                            value={this.state.value}
                            onChange={(e) => this.setState({ 'value': e.target.value })}
                        />
                        <span className="addItemBtn" onClick={this.createTaskItem}>Добави</span>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
