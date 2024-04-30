import React, { Component } from 'react';
import './AddTaskGroup.css';
import { endpoints } from "../../endpoints";
import { Link } from "react-router-dom";
import authService from '../api-authorization/AuthorizeService';

export class AddTaskGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            errorMessage: '',
            textColor: '',
        }
        this.createTaskGroup = this.createTaskGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async createTaskGroup(semesterId){
        //event.preventDefault();
        console.log(this.state.value);
        var input = this.state.value;

        const errors = {
            success: "",
            minLength: "",
            maxLength: "",
            existingTaskGroup: ""
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
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            semesterId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createTaskGroup(semesterId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: input,
                    semesterId: semesterId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        this.setState({ errorMessage: errors.existingTaskGroup });
                        this.setState({ textColor: color.error });
                    }
                    else {
                        this.setState({ errorMessage: errors.success });
                        this.setState({ textColor: color.success });
                        this.props.onTaskGroupAdded(this.props.value);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    componentDidMount() {
        this.render();
    }
    close() {
        this.setState({ 'value': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
    }
    render() {
        return (
            <div className="container">
                <div className="container" id="modal">
                    <button type="button" id="createTaskGroup" data-bs-toggle="modal" data-bs-target="#addTaskGroupModal">
                        Добави
                    </button>
                </div>
                <div className="modal fade" id="addTaskGroupModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                                <div className="title">
                                    <h4 className="modal-title" id="groupsTitle">Нова дисциплина</h4>
                                    <hr id="line"></hr>
                                </div>

                            </div>
                            <div className="modal-body">
                                <div id="myForm">
                                    <form onSubmit={this.createTaskGroup}>
                                        <label htmlFor="taskGroupNameField" id="label-text">Име:</label>
                                        <input type="text" name="taskGroupNameField" className="form-control" id="name"
                                            onChange={(e) => this.setState({ 'value': e.target.value })}
                                            style={{ borderBottomColor: this.state.textColor }}
                                        />
                                        <div className="modal-footer border-0">
                                            <div id="errorTaskGroup">
                                                <p style={{ color: this.state.textColor}}>
                                                    {this.state.errorMessage}</p>
                                            </div>
                                            {/*<Link to='/taskGroups' id='close' onClick={this.close}>Назад</Link>*/}
                                            <button type="submit" id="submit" method="post" className="btn" name="addTaskGroup">Добави</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}