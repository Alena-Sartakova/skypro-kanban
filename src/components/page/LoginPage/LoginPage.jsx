import { Link } from "react-router-dom";

import * as S from '../../page/LoginPage/LoginPage.styled.js';
import { Wrapper } from "./LoginPage.styled.js";
import { routesPath } from "../routesPath.js";


export const LoginPage = ({ login }) => {

    return (
        <>
            <Wrapper>
                <S.ContainerLogin>
                    <S.Modal>
                        <S.ModalBlock>
                            <S.ModalTtl>
                                <h2>Вход</h2>
                            </S.ModalTtl>
                            <S.ModalFormLogin id="formLogIn" action="#">
                                <S.ModalInput
                                    type="text"
                                    name="login"
                                    id="formlogin"
                                    placeholder="Эл. почта"
                                />
                                <S.ModalInput
                                    type="password"
                                    name="password"
                                    id="formpassword"
                                    placeholder="Пароль"
                                />
                                <S.ModalBtnEnter id="btnEnter">
                                    <S.ModalBtnEnterA onClick={login}>
                                        Войти
                                    </S.ModalBtnEnterA>
                                </S.ModalBtnEnter>
                                <S.ModalFormGroup>
                                    <S.ModalFormGroupAP>
                                        Нужно зарегистрироваться?
                                    </S.ModalFormGroupAP>
                                    <Link to={routesPath.REGISTER}>
                                        <S.ModalFormGroupAP>
                                            Регистрируйтесь здесь
                                        </S.ModalFormGroupAP>
                                    </Link>
                                </S.ModalFormGroup>
                            </S.ModalFormLogin>
                        </S.ModalBlock>
                    </S.Modal>
                </S.ContainerLogin>
            </Wrapper>
        </>
    );
}