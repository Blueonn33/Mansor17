import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddCourse.css';
import authService from '../api-authorization/AuthorizeService';

export class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            specialityId: '',
        }
        this.createCourse = this.createCourse.bind(this);
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

    async createCourse(specialityId) {
        console.log(this.state.value);
        var input = this.state.value;

        if (input === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            specialityId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createCourse(specialityId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    value: input,
                    specialityId: specialityId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")
                    }
                    else {
                        this.props.onCourseAdded(this.props.value);
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
                <div className="addCourseContainer">
                    <input type="text" id="input-course"
                        value={this.state.value}
                        onChange={(e) => this.setState({ 'value': e.target.value })}
                    />
                    <button className="addCourseBtn" onClick={this.createCourse}>Добави</button>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
