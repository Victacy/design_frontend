import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter as Router,Switch,Route,useHistory} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.js'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
 import Profile from './pages/Profile'
import Work from './pages/Work'
import User from './pages/User'
import {reducer,initialState} from './reducers/userReducer'
export const UserContext = createContext()

const Position =() =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    dispatch({type:"USER",payload:user})
    if(user){
      history.push('/')
    }else{
           history.push('/login')
    }
  },[])
  return(
  <Switch>
  <Route exact path='/' component={Home}/>
  <Route path='/login' component={Login}/>
  <Route path='/signup' component={Signup}/>
  <Route exact path='/profile' component={Profile}/>
  <Route path='/work' component={Work}/>
  <Route path='/profile/:userid' component={User}/>
</Switch>
  )
}

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <Navbar/>
      <Position/>
   </Router>
   </UserContext.Provider>
    
  );
}

export default App;
