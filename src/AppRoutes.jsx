import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { routesPath } from './components/page/routesPath';
import { PrivateRoute } from './components/PrivateRoute';
import MainPage from './components/page/MainPage/MainPage';
import { PopBrowsePage } from './components/page/PopBrowsePage/PopBrowsePage';
import { ExitPage } from './components/page/ExitPage/ExitPage';
import { LoginPage } from './components/page/LoginPage/LoginPage';
import { RegisterPage } from './components/page/RegisterPage/RegisterPage';
import { NotFound } from './components/page/NotFoundPage/NotFound';




export const AppRoutes = () => {

    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
  
    const login = () => {
      setIsAuth(true);
      navigate(routesPath.MAIN);
    }

    return (
        <Routes>
          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path={routesPath.MAIN} element={<MainPage />}>
              <Route path={routesPath.CARD_ID} element={<PopBrowsePage />} />
              <Route path={routesPath.EXIT} element={<ExitPage setIsAuth={setIsAuth} />} />
            </Route>
          </Route>
          <Route path={routesPath.LOGIN} element={<LoginPage login={login} />} />
          <Route path={routesPath.REGISTER} element={<RegisterPage />} />
          <Route path={routesPath.NOT_FOUND} element={<NotFound />} />
        </Routes>
      )
    };