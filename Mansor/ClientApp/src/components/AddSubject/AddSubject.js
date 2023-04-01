import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddSubject.css';

export class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            duration: '',
            timeTableDayId: '',
            isDeleted: ''
        }
        this.createSubject = this.createSubject.bind(this);
    }

    invalidInput() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    componentDidMount() {
        this.render();
    }

    async createSubject(timeTableDayId) {
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
            let splittedURL = window.location.pathname.split('/')
            timeTableDayId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createSubject(timeTableDayId), {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    value: subjectInput,
                    duration: durationInput,
                    timeTableDayId: timeTableDayId,
                    isDeleted: false
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")
                    }
                    else {
                        this.props.onSubjectAdded(this.props.value);
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
                            onChange={(e) => this.setState({ 'subject': e.target.value })}
                        />
                        <input type="text" id="input-subject" placeholder="8:00 - 8:45"
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
