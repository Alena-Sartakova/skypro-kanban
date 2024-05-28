import { Link, useNavigate } from "react-router-dom";

import * as S from '../../pages/RegisterPage/RegisterPage.styled.js';
import { Wrapper } from "../LoginPage/LoginPage.styled.js";
import { routesPath } from "../routesPath.js";
import { useState } from "react";
import { regUser } from "../../../api.js";



export const RegisterPage = ({ setUser }) => {
    const navigate = useNavigate();

    const regForm = {
        login: "",
        name: "",
        password: "",
    };

    const [regData, setRegData] = useState(regForm);

    const [addRegError, setAddRegError] = useState(null);

    const handleReg = async (e) => {
        e.preventDefault();

        if (!regData.name || regData.name.trim().length === 0) {
            setAddRegError("Не введено имя");
            return;
        }

        if (!regData.login || regData.login.trim().length === 0) {
            setAddRegError("Не введена почта");
            return;
        }

        if (!regData.password || regData.password.trim().length === 0) {
            setAddRegError("Не введён пароль");
            return;
        }

        try {
            await regUser(regData).then((data) => {
                console.log(data);
                setUser(data.user);
                navigate(routesPath.MAIN);
            });
        } catch (error) {
            setAddRegError(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setRegData({
            ...regData,
            [name]: value,
        });
    };

    return (
        <Wrapper>

            <S.ContainerRegister>
                <S.Modal>
                    <S.ModalBlock>
                        <S.ModalTtl>
                            <h2>Регистрация</h2>
                        </S.ModalTtl>
                        <S.ModalFormLogin id="formLogUp" action="#">
                            <S.ModalInput
                                type="text"
                                value={regData.name}
                                onChange={handleInputChange}
                                name="name"
                                placeholder="Имя"
                            />
                            <S.ModalInput
                                type="text"
                                value={regData.login}
                                onChange={handleInputChange}
                                name="login"
                                placeholder="Логин"
                            />
                            <S.ModalInput
                                type="password"
                                value={regData.password}
                                onChange={handleInputChange}
                                name="password"
                                placeholder="Пароль"
                            />
                            {addRegError && <p style={{ color: "red" }}>{addRegError}</p>}
                            <Link to={routesPath.MAIN}>
                                <S.ModalBtnRegisterEnter id="RegistrEnter">
                                    <S.ModalBtnRegisterEnterA onClick={handleReg}>
                                        Зарегистрироваться
                                    </S.ModalBtnRegisterEnterA>
                                </S.ModalBtnRegisterEnter>
                            </Link>
                            <S.ModalFormGroup>
                                <S.ModalFormGroupAP>Уже есть аккаунт?</S.ModalFormGroupAP>
                                <Link to={routesPath.LOGIN}>
                                    <S.ModalFormGroupAP>Войдите здесь</S.ModalFormGroupAP>
                                </Link>
                            </S.ModalFormGroup>
                        </S.ModalFormLogin>
                    </S.ModalBlock>
                </S.Modal>
            </S.ContainerRegister>
        </Wrapper>
    );
}
