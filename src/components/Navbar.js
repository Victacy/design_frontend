import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

function Navbar() {
  const searchModal=useRef(null)
  const [search,setSearch] =useState("")
  const [userDetails,setUserDetails]=useState([])
    const {state,dispatch} =useContext(UserContext)
    const history= useHistory()
    useEffect(() => {
      M.Modal.init(searchModal.current)
    },[])

    const renderList= () => {
      if(state){
        return [
          <li key="1"><i data-target="modal1" className="large material-icons modal-trigger">search</i></li>,
          <li key="2"><Link to="/profile">Profile</Link></li>,
            <li key="3"><Link to="/work">Work</Link></li>,
            <li key="4">
                <button className="btn waves-effect #c63828 red darken-3"
                 type="submit" onClick={() =>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/login')
                  }}>
                    Logout
                </button>
            </li>
        ]
      }else{
        return [
          
          <li key="5"><Link to="/signup">Signup</Link></li>,
          <li key="6"><Link to="/login">Login</Link></li>
        ]
      }
    }

    
    function handleSearch(e){
      fetchUser(e.target.value)
    }


    const fetchUser = (query)=>{
      setSearch(query)
      fetch('/search',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        // console.log(results)
        setUserDetails(results.user)
      })
   }

    return (
        <nav>
        <div className="nav-wrapper #00c853 green accent-4">
          <Link to={state?"/" : "/login"} className="brand-logo left">Designx</Link>
          <ul id="nav-mobile" className="right ">
            {renderList()}
            
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal}style={{color:"black"}}>
        <div className="modal-content">
        <input type="text" placeholder="search" value={search} onChange={handleSearch}/>
        </div >
            <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item" style={{color:"black"}}>{item.name}</li></Link> 
               })}
               
              </ul>
        <div className="modal-footer">
          <button  className="modal-close waves-effect waves-green btn-flat" onClick={() =>setSearch('')}>Close</button>
        </div>
      </div>
      </nav>
    ) 
}

export default Navbar
