import React, { Component } from 'react';
import '../../custom.css';
import '../Specialities/SpecialitiesStyles.css';
import { IoChevronBackCircle } from "react-icons/io5";

export class AppliedMathematics extends Component {

    render() {
        return (
            <div>
                <div className="specialityInfoContainer">
                    <div className="specialityTitle">
                        <h3 id="specialityTitle">Приложна математика</h3>
                    </div>
                    <a href="schedule" className="specialitiesBackBtn"><IoChevronBackCircle /></a>

                    <div className="specialityInfoContent">
                        <p>
                            Завършилите специалността имат възможности за реализация навсякъде,
                            където математиката се използва като инструмент за получаване на практически резултати:
                            в банки, застрахователни дружества, в промишлеността, търговията,
                            както и в научноизследователски групи.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
