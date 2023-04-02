import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import SignUpp from './components/SignUpp';
import Table from './components/Table';
import ShowBlog from './components/ShowBlog';
import { Route, Switch, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { LoginActions } from './store/slices/login-slice';

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  if (localStorage.getItem('authToken') === null) {
    history.push('/signUp')
  } else {
    dispatch(LoginActions.setLogin(true))
    history.push('/all_blogs')
  }
  return (
    < >
      <Navbar />
      <Switch>
        <Route path='/login' exact><Login /></Route>
        <Route path='/signUp' exact><SignUpp /></Route>
        <Route path='/all_blogs' exact><Table /></Route>
        <Route path='/blog' exact><ShowBlog /></Route>
        <Route path='/add_edit_blog' exact><BlogForm /></Route>
      </Switch>
    </>
  );
}

export default App;
