import React,{ChangeEvent, useEffect, useState} from "react";
import { useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import { BreadCrumb } from 'primereact/breadcrumb';
import Left_nav from "../../components/layout/Left-nav/Left_nav";

    const styles = {
        container: {
          width: "80%",
          margin: "0 auto",
        },
        input: {
          width: "100%",
        },
        span:{
            color: "red",
        }
      };
const ValidateForm =() =>
{
  const { register, handleSubmit, setError,formState: { errors } } = useForm();
  const [email,setEmail] = useState("");
  
  const handleChange =(value:any)=>{
    setEmail(value);
    console.log(email);
  }
  function onSubmit(data: any) {
    console.log(data);
  }
  const items = [
    {label: 'Computer',url: '/primeform'},
    {label: 'Notebook'},
    {label: 'Accessories'},
    {label: 'Backpacks'},
    //{label: 'Options', icon: 'pi pi-fw pi-cog',command:()=>{ window.location.href = "http://localhost:3000/primeform";}},
    {label: 'Sign Out', icon: 'pi pi-fw pi-power-off'} 
];

const home = { icon: 'pi pi-home', url: '/primeform' }
//const onSubmit = data => console.log(data);
  return (
    <div className="holder">
      <Left_nav/>
      <div className="page-container">      
        <div style={styles.container}>
        <div className="card">
                <BreadCrumb model={items} home={home} />
        </div> 
          <h4>My Form</h4>
          <form onSubmit={handleSubmit(onSubmit)}> 
          <div className="form-group row">     
          <label htmlFor="username" className="col-sm-1 col-form-label text-right text-success">username</label>      
          <div className="col-sm-8">
          <input  {...register('username',{
                required: { 
                    value: true, 
                    message: "required name" 
                  },
                minLength: {
                    value:6,
                    message: "minimum length should be 6"
                },
                maxLength: 20,          
              },
              )}    
              style={{ ...styles.input, borderColor: errors.username && "red" }}
              placeholder="Username"
            />
          </div>
          <div className="col-sm-3">
          {errors.username && <p style={styles.span} >{errors.username.message}</p>}    
          </div>
          <label htmlFor="email" className="col-sm-1 col-form-label text-right text-success">email</label>      
          <div className="col-sm-8">
          <input {...register('email',{
                required: {
                    value: true, 
                    message: "email is required" 
                }, 
                maxLength:  {
                    value: 30, 
                    message: "maximum length should be 30" 
                }, 
              },
              )}
              style={{ ...styles.input, borderColor: errors.email }}
              placeholder="Email" type="email" 
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
          {errors.email && <p style={styles.span}>{errors.email.message}</p>}
          </div>
          <label htmlFor="mobile" className="col-sm-1 col-form-label text-right text-success">mobile</label>      
          <div className="col-sm-8">
          <input {...register('mobile',{
                required: {
                    value: true, 
                    message: "mobile required" 
                },            
                minLength: {
                    value:10,
                    message: "minimum length should be 10"
                },
                maxLength:{
                    value:13,
                    message: "maximum length should be 13"
                },
              },
              )}
              style={{ ...styles.input, borderColor: errors.email  }}
              placeholder="mobile"
            />
          </div>
          <div className="col-sm-3">
          {errors.mobile && <p style={styles.span}>{errors.mobile.message}</p>}
          </div>
          <label htmlFor="password" className="col-sm-1 col-form-label text-right text-success">password</label>      
          <div className="col-sm-8">
          <input {...register('password',{
                required: {
                    value: true, 
                    message: "password required" 
                },            
                minLength: {
                    value:6,
                    message: "minimum length should be 6"
                },
                maxLength: 13,
              },
              )}
              style={{ ...styles.input, borderColor: errors.password  }}
              placeholder="Password" type="password"
            />
          </div>
          <div className="col-sm-3">
          {errors.password && <p style={styles.span}>{errors.password.message}</p>}
          </div>
        </div>  
            <br/><br/>
            <button type="submit" >
              Submit
            </button>
          </form>
          <Link to="/primeform">primeform</Link>
        </div>
      </div>
    </div>
  );
}
export default ValidateForm;


