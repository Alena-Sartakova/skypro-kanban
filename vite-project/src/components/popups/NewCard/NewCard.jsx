import Calendar from "../../Calendar/Calendar";

const NewCardPopup = () => {
    return (<div className="pop-new-card" id="popNewCard">
        <div className="pop-new-card__container">
            <div className="pop-new-card__block">
                <div className="pop-new-card__content">
                    <h3 className="pop-new-card__ttl">Создание задачи</h3>
                    <a href="#" className="pop-new-card__close">&#10006;</a>
                    <div className="pop-new-card__wrap">
                        <htmlform className="pop-new-card__htmlform htmlform-new" id="htmlformNewCard" action="#">
                            <div className="htmlform-new__block">
                                <label htmlFor="htmlformTitle" className="subttl">Название задачи</label>
                                <input className="htmlform-new__input" type="text" name="name" id="htmlformTitle" placeholder="Введите название задачи..." autoFocus />
                            </div>
                            <div className="htmlform-new__block">
                                <label htmlFor="textArea" className="subttl">Описание задачи</label>
                                <textarea className="htmlform-new__area" name="text" id="textArea" placeholder="Введите описание задачи..."></textarea>
                            </div>
                        </htmlform>
                        <div className="pop-new-card__calendar calendar">
                            <p className="calendar__ttl subttl">Даты</p>
                            <Calendar />
                        </div>
                    </div>
                    <div className="pop-new-card__categories categories">
                        <p className="categories__p subttl">Категория</p>
                        <div className="categories__themes">
                            <div className="categories__theme _orange _active-category">
                                <p className="_orange">Web Design</p>
                            </div>
                            <div className="categories__theme _green">
                                <p className="_green">Research</p>
                            </div>
                            <div className="categories__theme _purple">
                                <p className="_purple">Copywriting</p>
                            </div>
                        </div>
                    </div>
                    <button className="htmlform-new__create _hover01" id="btnCreate">Создать задачу</button>
                </div>
            </div>
        </div>
    </div>);
}

export default NewCardPopup;