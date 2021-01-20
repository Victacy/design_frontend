import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Work() {
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    useEffect(()=>{
        if(url){
         fetch("/creatework",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 title,
                 body,
                 pic:url
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])

     const workDetails = ()=>{
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

    function handleTitle(e){
        setTitle(e.target.value)
      }

      function handleBody(e){
        setBody(e.target.value)
      }

      
    return (
        <div className="card input-field" 
        style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
            <input type="text" placeholder="title" value={title} onChange={handleTitle}/>
            <input type="text" placeholder="body" value={body} onChange={handleBody }/>

                
                <div className="file-field input-field">
        <div className="btn #00c853 green accent-4 ">
            <span>Upload image</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>
        <button className="btn waves-effect waves-light #00c853 green accent-4" type="submit"  onClick={() =>workDetails()}>
            Save
        </button>
        </div>
    )
}

export default Work
