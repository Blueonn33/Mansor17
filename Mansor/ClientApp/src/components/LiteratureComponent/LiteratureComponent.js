import React, { Component } from 'react';
import '../../custom.css';
import './LiteratureComponent.css';
import { AddLiterature } from '../AddLiterature/AddLiterature';
import LiteratureContainer from '../LiteratureContainer/LiteratureContainer';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';
import { Link } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

export class LiteratureComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            literatures: [],
            taskGroupId: undefined,
            taskGroupData: undefined,
            literatureData: undefined,
            taskItemId: undefined
        }
        this.loadLiteratures = this.loadLiteratures.bind(this);
    }
    async componentDidMount() {
        this.loadLiteratures();
        this.historyBack();
    }

    async loadLiteratures(taskGroupId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        taskGroupId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/literatures/${taskGroupId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ literatures: res }))
            .catch(error => console.error(error));
    }

    historyBack() {
        let splittedURL = window.location.pathname.split('/')
        let routeId = splittedURL[splittedURL.length - 1]
        this.setState({ taskItemId: routeId });
    }

    render() {
        return (
            <div className="literatureContainer">
                <div className="literatureHeader">
                    <h3 className="literatureHeaderContent">Учебни ресурси</h3>
                </div>
                <div className="literatureBackBtnContainer">
                    <a href={`https://localhost:44414/taskItems/${this.state.taskItemId}`} className="literaturesBackBtn"><IoChevronBackCircle /></a>
                </div>
                <div className="literatureContent">
                    <AddLiterature />
                </div>
                <div className='literatureContentContainer'>
                    {this.state.literatures.map((literature) => {
                        return (
                            <LiteratureContainer literatureData={literature} key={literature.id} />
                        )
                    })}
                </div>
            </div>
        );
    }
}
