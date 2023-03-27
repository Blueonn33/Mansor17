import React, { Component } from 'react';
import './EditTaskGroup.css';
import { endpoints } from "../../endpoints";
import { Link } from "react-router-dom";

export class EditTaskGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //value: '',
            errorMessage: '',
            textColor: '',
            currentTaskGroupName: '',
            taskGroupData: undefined,
            taskGroupHeaderName: ''
        }
        this.editTaskGroup = this.editTaskGroup.bind(this);
    }

    getTaskGroupName = async (taskGroupId) => {
        let splittedURL = window.location.pathname.split('/')
        taskGroupId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.getTaskGroupName(taskGroupId))
            .then(async (res) => {
                let taskGroupData = await res.json()
                this.setState({ 'taskGroupData': taskGroupData })
                this.setState({ 'currentTaskGroupName': taskGroupData.name })
                this.setState({ 'taskGroupHeaderName': taskGroupData.name })
            }
            )
    }

    editTaskGroup(event){
        console.log(this.state.currentTaskGroupName);
        event.preventDefault();
        var input = this.state.currentTaskGroupName;

        const errors = {
            success: "Променихте успешно името.",
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
        else {
            let splittedURL = window.location.pathname.split('/')
            let taskGroupId = splittedURL[splittedURL.length - 1]
            this.state.taskGroupData.name = this.state.currentTaskGroupName
            fetch(endpoints.editTaskGroup(taskGroupId), {
                method: 'PATCH',
                //body: JSON.stringify({ "Name": this.state.currentTaskGroupName })
            })
                .then((res) => {
                    this.getTaskGroupName(taskGroupId)
                    if (!res.ok) {
                        this.setState({ errorMessage: errors.existingTaskGroup });
                        this.setState({ textColor: color.error });
                    }
                    else {
                        this.setState({ errorMessage: errors.success });
                        this.setState({ textColor: color.success });
                    }
                })
                //.then((response) => {
                //    if (!response.ok) {
                //        this.setState({ errorMessage: errors.existingTaskGroup });
                //        this.setState({ textColor: color.error });
                //    }
                //    else {
                //        this.setState({ errorMessage: errors.success });
                //        this.setState({ textColor: color.success });
                //    }
                //})
                .catch(error => {
                    console.error(error);
                });
        }
    }
    componentDidMount() {
        this.render();
        this.getTaskGroupName();
    }
    close() {
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
        window.location.pathname = '/taskGroups'
    }
    render() {
        return (
            <div className="container">
                <div className="container" id="modal">
                    <button type="button" id="editTaskGroup" data-bs-toggle="modal" data-bs-target="#editTaskGroupModal">
                        Редактирай
                    </button>
                </div>
                <div className="modal fade" id="editTaskGroupModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                                <div className="title">
                                    <h4 className="modal-title" id="title">Преименувай</h4>
                                    <hr id="line"></hr>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div id="myForm">
                                    <form onSubmit={this.editTaskGroup}>
                                        <label htmlFor="taskGroupNameField" id="label-text">Име:</label>
                                        <input type="text" name="taskGroupNameField" className="form-control" id="name"
                                            value={this.state.currentTaskGroupName}
                                            onChange={(e) => this.setState({ 'currentTaskGroupName': e.target.value })}
                                            style={{ borderBottomColor: this.state.textColor }}
                                        />
                                        <div className="modal-footer border-0">
                                            <div id="errorTaskGroup">
                                                <p style={{ color: this.state.textColor }}>
                                                    {this.state.errorMessage}</p>
                                            </div>
                                            <Link to='/taskGroups' id='close' onClick={this.close}>Назад</Link>
                                            <button type="submit" id="submit" method="post" className="btn" name="editTaskGroup">Промени</button>
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