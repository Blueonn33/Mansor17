import React, { Component } from 'react'
import '../SpecialityContainer/SpecialityContainer.css';

export default class SpecialityContainer extends Component {

    render() {
        return (
            <div className='specialitiesContainer d-flex' key={this.props.specialityData.id}>
                <div className='specialityNameWrapper'>
                    <span className='specialityName pageText'> {this.props.specialityData.name} </span>
                </div>
                <div className='useSpecialityButtonWrapper ml-auto'>
                    <button className='useButton'>
                        <a href={`https://localhost:44414/students/${this.props.specialityData.id}`} className='useButtonText'>Преглед</a>
                    </button>
                </div>
            </div>
        )
    }
}
