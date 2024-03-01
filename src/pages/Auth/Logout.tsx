import * as React from "react";
import { useForm} from "react-hook-form";
import Cookies from "universal-cookie";
import Left_nav from "../../components/layout/Left-nav/Left_nav";

const styles = {
    container: {
      width: "80%",
      margin: "0 auto",
    }
}
const Logout = () =>
{
  const ClearCookie=()=>{
    const cookies = new Cookies();
    cookies.remove('SecureToken', { path: "/" });
    window.location.href = "/";
  }
  return (
    <div className="holder">
    <Left_nav/>
    <div className="page-container">
      <div style={styles.container}>
        <h4>Logout</h4>
        </div>
        <button onClick={ClearCookie} type="button">Click to signout</button>
    </div>
    </div>

  );
}
export default Logout;