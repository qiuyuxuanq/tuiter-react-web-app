import Nav from "src/nav";
import NavigationSidebar
  from "./navigation-sidebar";
  import {Link}
  from "react-router-dom";

function Tuiter() {
 return (
   <div>
       <Link to="/">Lab</Link> |
   <Link to="/hello">Hello</Link> |
   <Link to="/tuiter">Tuiter</Link>
   <h1>Tuiter</h1>
     <Nav/>
     <NavigationSidebar active="home"/>
     <h1>Tuiter</h1>
   </div>
 )
}

export default Tuiter
