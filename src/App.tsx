import Header from 'components/Header/Header';
import { Admin, Auth } from 'pages';
import AddCard from 'pages/AddCard/AddCard';
import EditJet from 'pages/AddCard/EditJet';
import EditYacht from 'pages/AddCard/EditYacht';
import Jet from 'pages/Card/Jet';
import Yacht from 'pages/Card/Yacht';
import EditRequest from 'pages/EditRequest/EditRequest';
import Request from 'pages/Request/Request';
import Drafts from 'pages/Search/Drafts';
import Requests from 'pages/Search/Requests';
import Search from 'pages/Search/Search';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getProfile, setIsAuth, signOut } from 'redux/ducks/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { profileRolesEnum } from 'types/reduxTypes/profileTypes';
import './App.scss';

function App() {
  const { isAuth, profileName } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(signOut(""))
  }

  React.useEffect(() => {
    isAuth && dispatch(getProfile(""))
  }, [isAuth])

  return (
    <div className="App">
      <Header role={isAuth ? profileRolesEnum.admin : undefined} onLogout={logoutHandler} name={profileName} />
      <Switch>
        {!isAuth && <Route path="/" exact component={Auth}/>}
        {isAuth && <Route path="/admin" component={Admin}/>}
        {isAuth && <Route path="/search" component={Search}/>}
        {isAuth && <Route path="/drafts" component={Drafts}/>}
        {isAuth && <Route path="/requests" exact component={Requests}/>}
        {isAuth && <Route path="/requests/:id" exact component={Request}/>}
        {isAuth && <Route path="/requests/:id/edit" exact component={EditRequest}/>}
        {isAuth && <Route path="/add" component={AddCard}/>}
        {isAuth && <Route path="/yacht/:id" component={Yacht}/>}
        {isAuth && <Route path="/jet/:id" component={Jet}/>}
        {isAuth && <Route path="/edit/yacht/:id" exact component={EditYacht} />}
        {isAuth && <Route path="/edit/jet/:id" exact component={EditJet} />}
        {isAuth && <Redirect to="/search" />}
        {!isAuth && <Redirect to="/" />}
      </Switch>
    </div>
  );
}

export default App;
