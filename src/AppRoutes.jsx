import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { routesPath } from './components/pages/routesPath';
import { PrivateRoute } from './components/PrivateRoute';
import MainPage from './components/pages/MainPage/MainPage';
import { PopBrowsePage } from './components/pages/PopBrowsePage/PopBrowsePage';
import { ExitPage } from './components/pages/ExitPage/ExitPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage';
import { NotFound } from './components/pages/NotFoundPage/NotFound';




export const AppRoutes = () => {

  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // const login = () => {
  //   setIsAuth(true);
  //   navigate(routesPath.MAIN);
  // }

  return (
    <Routes>
      <Route element={<PrivateRoute user={user} />}>
        <Route path={routesPath.MAIN} element={<MainPage user={user}/>}>
          <Route path={routesPath.CARD_ID} element={<PopBrowsePage />} />
          <Route path={routesPath.EXIT} element={<ExitPage setUser={setUser} />} />
        </Route>
      </Route>
      <Route path={routesPath.LOGIN} element={<LoginPage setUser={setUser} />} />
      <Route path={routesPath.REGISTER} element={<RegisterPage setUser={setUser}/>} />
      <Route path={routesPath.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
};