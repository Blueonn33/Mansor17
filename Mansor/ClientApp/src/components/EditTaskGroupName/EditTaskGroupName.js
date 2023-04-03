import React, { Component } from 'react';
import './EditTaskGroupName.css';
import '../../custom.css';
import { endpoints } from '../../endpoints';
import { Link } from "react-router-dom";

export class EditTaskGroupName extends Component {
    static displayName = EditTaskGroupName.name;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentName: '',
            newName: '',
            errorMessage: '',
            textColor: '',
        }
    }
    renamedTaskGroup() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    componentDidMount() {
        let splittedURL = window.location.pathname.split('/')
        let taskGroupId = splittedURL[splittedURL.length - 1]
        let url = endpoints.getTaskGroupName(taskGroupId);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ currentName: data.name });
            });
        this.render();
    }

    handleNameChange = event => {
        this.setState({ newName: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var input = this.state.newName;
        console.log(input);

        const errors = {
            minLength: "Името е твърде кратко.",
            maxLength: "Името е твърде дълго.",
            existingTaskGroup: "Името е като предишното."
        }

        const color = {
            error: "red",
            success: "green"
        }

        if (input.length < 3) {
            this.setState({ errorMessage: errors.minLength });
            this.setState({ textColor: color.error });
        }
        else if (input.length > 50) {
            this.setState({ errorMessage: errors.maxLength });
            this.setState({ textColor: color.error });
        }
        else if (input == this.state.currentName) {
            this.setState({ errorMessage: errors.existingTaskGroup });
            this.setState({ textColor: color.error });
        }
        else {
            let splittedURL = window.location.pathname.split('/')
            let taskGroupId = splittedURL[splittedURL.length - 1]
            let url = endpoints.editTaskGroup(taskGroupId);
            fetch(url, {
                method: 'PATCH',
                body: JSON.stringify({ name: this.state.newName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ currentName: data.name, newName: '' });
                    this.setState({ errorMessage: '' });
                    this.renamedTaskGroup();
                })
                .catch(error => {
                    console.error(error);
                });
        }
        
    };

    render() {
        return (
            <div className="editTaskGroupContainer">
                <div id="editGroupForm">
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="currentName">{this.state.currentName}</h3>
                        <hr id="line"></hr>
                        <label htmlFor="" id="editName-text">Ново име:</label>
                        <input type="text" name="taskGroupNameField" id="editInput"
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                            style={{ borderBottomColor: this.state.textColor }}
                        />
                        <div id="errorEditGroup">
                            <p style={{ color: this.state.textColor }}>
                                {this.state.errorMessage}</p>
                        </div>
                            <button id='editBack' onClick={this.close}>
                                <a href={`https://localhost:44414/taskGroups`} id="editBack-text">Назад</a>
                            </button>
                            <button type="submit" id="editSubmit" method="post" className="btn" name="editTaskGroup">Промени</button>
                    </form>
                </div>
                <div id="snackbar">Успешно променихте името</div>
            </div>

        );
    }
}
