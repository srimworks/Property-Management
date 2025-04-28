import React,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router';
// import { Link } from 'react-router';
import { IMAGES } from '../utils/images';
import { Link } from 'react-router';

const ProfileDashboardNav = () => {

    // const [authenticated,setAuthenticated]=useState(null);
    // // const navigate=useNavigate()
    // useEffect(()=>{
    //   const loggedInUser=sessionStorage.getItem("authenticated");
    //   if (loggedInUser){
    //     setAuthenticated(loggedInUser)
    //   }
    //   // if(!loggedInUser){
    //   //   navigate("/signin")
    //   // }
    // },[])
  
    const DashboardTabs=[
   
      {
        name:"My Activity",
        link:"/",
        Icon:IMAGES.CHEVRON_RIGHT
      },
      {
        name:"My Transactions",
        link:"/",
        Icon:IMAGES.MY_TRANSACTION_ICON
      },
      {
        name:"Edit Profile",
        link:"/",
        Icon:IMAGES.EDIT_ICON
      },
 
    ]
    // const  pathname=window.location.pathname
  
    // console.log(pathname)

  return (
    <div>
        <div>
            <img src={IMAGES.AVATAR_ICON} alt='profile-img'/>
            <h2>Teja</h2>
            <h2>mahalteja01@gmail.com</h2>
        </div>

        <div>
        <ul>
          {
            DashboardTabs.map((item,index)=>{
              return  <Link to={item.link} key={item.name}><li>{item.name}</li></Link>
            })
          }
       
        </ul>
        {/* <li className={false ? "side-tab-active" : "side-tab" }><IMAGES.LOGOUT_ICON/>Logout</li> */}
        </div>

    </div>
  )
}

export default ProfileDashboardNav