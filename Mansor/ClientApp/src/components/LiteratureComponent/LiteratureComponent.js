import React, { Component } from 'react';
import '../../custom.css';
import './LiteratureComponent.css';
import { AddLiterature } from '../AddLiterature/AddLiterature';
import LiteratureContainer from '../LiteratureContainer/LiteratureContainer';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';

export class LiteratureComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            literatures: [],
            taskGroupId: '',
            taskGroupData: undefined,
            literatureData: undefined,
        }
        this.loadLiteratures = this.loadLiteratures.bind(this);
    }
    async componentDidMount() {
        this.loadLiteratures();
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

    render() {
        return (
            <div className="literatureContainer">
                <div className="literatureHeader">
                    <h3 className="literatureHeaderContent">Литература</h3>
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
