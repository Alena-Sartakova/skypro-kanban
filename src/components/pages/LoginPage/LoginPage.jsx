import { Link, Navigate, useNavigate } from "react-router-dom";

import * as S from '../../pages/LoginPage/LoginPage.styled.js';
import { Wrapper } from "./LoginPage.styled.js";
import { routesPath } from "../routesPath.js";
import { useState } from "react";
import { loginUser } from "../../../api.js";


export function LoginPage({ setUser }) {
    const navigate = useNavigate();
    const loginForm = {
        login: "",
        password: "",
      };
    
      const [loginData, setLoginData] = useState(loginForm);
    
      const [addLoginError, setAddLoginError] = useState(null);
    
      const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginData.login || loginData.login.trim().length === 0) {
          setAddLoginError("Не введён логин.");
          return;
        }
    
        if (!loginData.password || loginData.password.trim().length === 0) {
          setAddLoginError("Не введён пароль");
          return;
        }
    
        try {
          await loginUser(loginData).then((data) => {
            console.log(data);
            setUser(data.user);
            navigate(routesPath.MAIN);
          });
        } catch (error) {
          console.log(error);
          setAddLoginError(error.message);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };

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
                                    
                                    placeholder="Эл. почта"
                                    value={loginData.login}
                                    onChange={handleInputChange}
                                />
                                <S.ModalInput
                                    type="password"
                                    name="password"
                                    
                                    placeholder="Пароль"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                />
                                 {addLoginError && <p style={{color: 'red'}}>{addLoginError}</p>}
                                <S.ModalBtnEnter id="btnEnter">
                                    <S.ModalBtnEnterA onClick={handleLogin}>
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