import React,{useState,useEffect,useContext} from 'react'
//import Live from '../images/thy.jpg'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'

// 5fe328da109c10129477690a


function User() {
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch}=useContext(UserContext)
    const {userid} =useParams()
    
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
          
             setProfile(result)
        })
     },[])

    return (
        <>
              {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={userProfile.user.pic} alt=""
                   />
               </div>
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.works.length} views</h6>
                       <h6>10 views</h6>
                   </div>
            </div>
            </div>
        <div className="gallery">
        {
                 userProfile.works.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.pic} alt={item.title}/>  
                       )
                   })
               }
            
           
        </div>
        </div>
        
        
        :<h2>loading...!</h2>}
        
        </>
    )
}

export default User
