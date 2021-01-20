import React,{useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


function Signup() {
        const history=useHistory()
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [name, setName] = useState("");
        const [image,setImage] =useState("")
        const [url,setUrl] =useState(undefined)

        function handleEmail(e){
          setEmail(e.target.value)
        }

        function handlePassword(e){
          setPassword(e.target.value)
        }

        function handleName(e){
          setName(e.target.value)
        }

        useEffect(() =>{
          if(url){
            Fields()
          }
        },[url])

        const addPic=() =>{
          const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","portfolio")
        data.append("cloud_name","victory")
        fetch("https://api.cloudinary.com/v1_1/victory/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        }

        const Fields =() => {
          // eslint-disable-next-line
          if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#d50000 red accent-4"})
            return
          }
          fetch("/signup",{
            method:"post",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              name,
              email,
              password,
              pic:url

            })
          })
          .then(res =>res.json())
          .then(data =>{
            // console.log(data)
            if(data.error){
              M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }
            else{
              M.toast({html: data.message,classes:"#2e7d32 green darken-3"})
              history.push('/login')
            }
          }).catch(err =>{
            console.log(err)
          })
        }
        

        const PostData=() =>{
          if(image){
            addPic()
          }else{
            Fields()
          }

        }
          
 
       
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Designx</h2>
            <input type="text" placeholder="username" value={name} onChange={handleName}/>
            <input type="email" placeholder="email" value={email} onChange={handleEmail}/>
            <input type="password" placeholder="password" value={password} onChange={handlePassword}/>
            <input type="password" placeholder="repeat password" value={password} onChange={handlePassword}/>

            <div className="file-field input-field">
        <div className="btn #00c853 green accent-4 ">
            <span>Upload Pic</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>
     
                    <form action="#" className="lit"><p>
              <label>
                <input type="checkbox" class="filled-in" />
                <span>Remember me</span>
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to='/forgot' className="pot">Forgot Password</Link>
            </p></form>
                        <div className="switch lit">
                <label>
                  <input type="checkbox"/>
                  <span className="lever"></span>
                  I agree to the Terms and Conditions
                </label>
              </div>
             
             <button className="btn waves-effect waves-light #00c853 green accent-4" type="submit" onClick={() =>PostData()}>
                Signup
            </button>
            <h6>
                <Link to='/login'>Already have an account ?</Link>
            </h6>


        </div>

       
    </div>
    )
}

export default Signup
