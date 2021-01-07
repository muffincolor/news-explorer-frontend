import React from "react";
import {Route, Switch, useHistory} from 'react-router-dom';
import {UserLoginContext} from '../../contexts/UserLoginContext'
import MainPage from "../MainPage/MainPage";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoginPopupActive, setLoginPopupActive] = React.useState(false);

  const onSignOut = () => {
    setCurrentUser({});
    localStorage.removeItem("jwt");
  }

  React.useEffect(() => {
    history.listen((location, action) => {
      if(action === "PUSH" && location.pathname === "/") {
        setLoginPopupActive(false);
      }
    })
  });

  return (
    <div className={`page__content`}>
      <UserLoginContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute setLoginPopupActive={setLoginPopupActive} onSignOut={onSignOut} user={currentUser} path="/saved-news" component={SavedNewsPage}/>
          <Route exact path="/">
            <MainPage isLoginPopupActive={isLoginPopupActive} setLoginPopupActive={setLoginPopupActive} onSignOut={onSignOut} setCurrentUser={setCurrentUser}/>
          </Route>
        </Switch>
        <Footer/>
      </UserLoginContext.Provider>
    </div>
  );
}

export default App;
