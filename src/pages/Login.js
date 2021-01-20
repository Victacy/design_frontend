import React,{useState,useContext} from 'react'
import { UserContext } from '../App'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


function Login() {
        const {state,dispatch}=useContext(UserContext)
        const history=useHistory()
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        function handleEmail(e){
          setEmail(e.target.value)
        }

        function handlePassword(e){
          setPassword(e.target.value)
        }


        const PostData=() =>{
          // eslint-disable-next-line
          if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#d50000 red accent-4"})
            return
          }
          fetch("/login",{
            method:"post",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              email,
              password

            })
          })
          .then(res =>res.json())
          .then(data =>{
            console.log(data)
            if(data.error){
              M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Logged in successfully",classes:"#2e7d32 green darken-3"})
                history.push('/')
            }
          }).catch(err =>{
            console.log(err)
          })
        }

        
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Designx</h2>
                <input type="email" placeholder="email" value={email} onChange={handleEmail}/>
            <input type="password" placeholder="password" value={password} onChange={handlePassword}/>
                     
            <form action="#" className="lit"><p>
                <label>
                  <input type="checkbox" className="filled-in"  />
                  <span>Remember me</span>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to='/forgot' className="pot">Forgot Password</Link>
              </p></form>
              
                 <button className="btn waves-effect waves-light #00c853 green accent-4"
                 type="submit" onClick={() =>PostData()}>
                    Login
                </button>
                <h6>
                <Link to='/signup'>Don't have an account ?</Link>
            </h6>

            </div>

           
        </div>
    )
}

export default Login
