import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddStudent.css';
import authService from '../api-authorization/AuthorizeService';

export class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            specialityId: '',
        }
        this.createStudent = this.createStudent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    invalidInput() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    componentDidMount() {
        this.render();
    }

    async createStudent(specialityId) {
        console.log(this.state.name);
        var input = this.state.name;

        if (input === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            specialityId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createStudent(specialityId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: input,
                    specialityId: specialityId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")

                    }
                    else {
                        this.props.onStudentAdded(this.props.name);
                        this.state.name = '';
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
                        <input type="text" id="input-student"
                            placeholder = "Добави студент"
                            value={this.state.name}
                            onChange={(e) => this.setState({ 'name': e.target.value })}
                        />
                        <span className="addStudentBtn" onClick={this.createStudent}>Добави</span>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
