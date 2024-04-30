import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../LiteratureContainer/LiteratureContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class LiteratureContainer extends Component {

    async deleteLiterature(literatureId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.deleteLiterature(literatureId), {
            method: 'DELETE',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Resource deleted successfully');
            })
            .catch(error => {
                console.error('There was a problem deleting the resource:', error);
            });
        window.location.reload();
    }


    render() {
        return (
            <div className='literaturesContainer d-flex' key={this.props.literatureData.id}>
                <div className="literatureElement">
                    <div className='literatureTitleWrapper'>
                        <h5 className='literatureTitle pageText'> {this.props.literatureData.keyword} </h5>
                    </div>
                    <div className='literatureContentWrapper'>
                        <span className='literatureContent pageText'> {this.props.literatureData.value} </span>
                    </div>
                    <div className='deleteLiteratureButtonWrapper ml-auto'>
                        <button className='deleteLiteratureButton' onClick={() => this.deleteLiterature(this.props.literatureData.id)}>
                            Изтрий
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
