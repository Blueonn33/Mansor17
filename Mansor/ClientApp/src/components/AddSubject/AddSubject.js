import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddSubject.css';
import authService from '../api-authorization/AuthorizeService';

export class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            duration: '',
            dayId: '',
        }
        this.createSubject = this.createSubject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    invalidInput() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    handleChange(event) {
        this.setState({ subject: event.target.value });
        this.setState({ duration: event.target.value });
    }

    componentDidMount() {
        this.render();
    }

    async createSubject(dayId) {
        console.log(this.state.duration);
        console.log(this.state.subject);
        var subjectInput = this.state.subject;
        var durationInput = this.state.duration;

        if (subjectInput === '') {
            this.invalidInput();
        }
        else if (durationInput === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            dayId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createSubject(dayId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: subjectInput,
                    duration: durationInput,
                    dayId: dayId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")
                    }
                    else {
                        this.state.subject = '';
                        this.state.duration = '';
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
                    <button className='subjectsBackBtn'>
                        <a href={`https://localhost:44414/timeTable`} className='subjectsBackBtnText'>Назад</a>
                    </button> 
                    <div className='subjectsText'>
                        <span className='enterSubject'>Предмет</span>
                        <span className='enterDuration'>Продължителност</span>
                    </div>
                    <div className="container">
                        <input type="text" id="input-subject"
                            value={this.state.subject}
                            onChange={(e) => this.setState({ 'subject': e.target.value })}
                        />
                        <input type="text" id="input-subject" placeholder="8:00 - 8:45"
                            value={this.state.duration}
                            onChange={(e) => this.setState({ 'duration': e.target.value })}
                        />
                        <button type="button" className="addSubject" onClick={this.createSubject}>Добави</button>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
