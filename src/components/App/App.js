import React from "react";
import {Route, Switch} from 'react-router-dom';
import {UserLoginContext} from '../../contexts/UserLoginContext'
import MainPage from "../MainPage/MainPage";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = React.useState(false);

  const onSignOut = () => {
    setCurrentUser({});
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  return (
    <div className={`page__content`}>
      <UserLoginContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute onSignOut={onSignOut} user={currentUser} path="/saved-news" component={SavedNewsPage}/>
          <Route exact path="/">
            <MainPage onSignOut={onSignOut} setCurrentUser={setCurrentUser}/>
          </Route>
        </Switch>
        <Footer/>
      </UserLoginContext.Provider>
    </div>
  );
}

export default App;
