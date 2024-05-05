import PopUser from "./PopUser";
import * as S from "./Header.styled.js";

function Header({ addCard }) {
    return (
        <S.Header>

            <div className="container">
                <S.HeaderBlock>

                    <div className="header__logo _show _light">
                        <a href="" target="_self"><img src="images/logo.png" alt="logo" /></a>
                    </div>
                    <div className="header__logo _dark">
                        <a href="" target="_self"><img src="images/logo_dark.png" alt="logo" /></a>
                    </div>
                    <S.HeaderNav>

                        <button className="header__btn-main-new _hover01" id="btnMainNew"><a href="#popNewCard" onClick={addCard}>Создать новую задачу</a></button>
                        <PopUser />
                    </S.HeaderNav>

                </S.HeaderBlock>
            </div></S.Header>
    );
}

export default Header;