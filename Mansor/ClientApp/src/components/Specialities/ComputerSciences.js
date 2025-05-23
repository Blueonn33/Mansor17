﻿import React, { Component } from 'react';
import '../../custom.css';
import '../Specialities/SpecialitiesStyles.css';
import { IoChevronBackCircle } from "react-icons/io5";

export class ComputerSciences extends Component {

    render() {
        return (
            <div>
                <div className="specialityInfoContainer">
                    <div className="specialityTitle">
                        <h3 id="specialityTitle">Компютърни науки</h3>
                    </div>
                    <a href="schedule" className="specialitiesBackBtn"><IoChevronBackCircle /></a>

                    <div className="specialityInfoContent">
                        <p>
                            Завършилите тази специалност получават  образователно-квалификационната степен “бакалавър”.
                            Могат да продължат образованието си във втората степен на обучение – магистратура.
                            Могат да намерят реализация в:
                            <ul className="jobs">
                                <li>компютърни фирми</li>
                                <li>разработващи системен и приложен софтуер и хардуер</li>
                                <li>във всички отрасли на икономиката</li>
                                <li>селското стопанство</li>
                                <li>държавната администрация</li>
                                <li>сферата на образованието</li>
                            </ul>
                            Те ще бъдат високо квалифицирани специалисти, способни да поддържат и развиват компютърно-базирани системи за науката, технологиите и бизнеса в новото столетие. Ще могат да проектират, разработват, прилагат и поддържат компютърните системи и използват информационните и комуникационни технологии. Могат да продължат обучението си в магистърска степен.
                            Студентите изучават в дълбочина принципите и теорията на компютърните науки, както и тяхното практическо използване.
                            Ще бъдат силно мотивирани специалисти, имащи задълбочени знания по изграждане на компютърно базирани системи, програмиране, системно анализиране, управление на проекти. Получават знания и умения както за самостоятелна професионална работа, така  и за работа в екип.
                            Те ще бъдат добре подготвени със знания на западни езици и по-специално английски език.
                            Физическото възпитание и спорта е елемент от общата подготовка на обучаемите.
                            Дипломирането става с полагане на държавен изпит или чрез разработване на дипломен проект.
                            При разработването на учебния план са отчетени изискванията и стандартите  на асоциациите ACM и IEEE.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
