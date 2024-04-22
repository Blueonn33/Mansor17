import React, { Component } from 'react';
import '../../custom.css';
import '../Specialities/SpecialitiesStyles.css';
import { IoChevronBackCircle } from "react-icons/io5";

export class SoftwareEngineering extends Component {
    static displayName = SoftwareEngineering.name;

    render() {
        return (
            <div>
                <div className="specialityInfoContainer">
                    <div className="specialityTitle">
                        <h3 id="specialityTitle">Софтуерно инженерство</h3>
                    </div>
                    <a href="schedule" className="specialitiesBackBtn"><IoChevronBackCircle /></a>

                    <div className="specialityInfoContent">
                        <p>
                            Бакалаврите по софтуерно инженерство могат да прилагат знанията и уменията си като софтуерни инженери в организации и фирми,
                            свързани с проектиране и разработка на софтуер. Могат да работят като:
                            <ul className="jobs">
                                <li>аналитици</li>
                                <li>проектанти</li>
                                <li>разработчици</li>
                                <li>специалисти по контрола на качеството</li>
                                <li>експерти</li>
                                <li>ръководители на проекти</li>
                                <li>консултанти</li>
                            </ul>
                            в бизнес организации или в публичната администрация.
                            Специалистите по Софтуерно инженерство са сред най-добре платените специалисти,
                            а търсенето им на пазара на труда е традиционно високо.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
