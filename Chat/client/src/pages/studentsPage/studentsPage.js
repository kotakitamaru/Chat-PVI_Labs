import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import "./studentStyles.css";
import deleteIcon from "./delete.png";
import editIcon from "./pencil.png";
import { AuthContext } from '../../authContext';

function StudentsPage()
{
    const [users, setUsers] = useState([]);
    const [idToEdit, setIdToEdit] = useState(null);
    const fetchUserData = () => {
        fetch("http://localhost:3001/students")
          .then(response => {
            return response.json();
          })
          .then(data => {
            setUsers(data);
            console.log(users.length > 0 ? users : "Дані ще не завантажені");
          })
      }
    useEffect(()=>{
        fetchUserData();
    },[]);

    const [isFormVisible,setFormVisible] = useState(false);
    
    const {register,handleSubmit,setValue} = useForm();
    const sendData = (data) => {
      let tempData;
        tempData = {
          id:idToEdit,
          ...data
        }
        const Valid = ValidateStudent(data);
        if(!Valid.isValid)
        {
          alert(Valid.message);
          return;
        }
        fetch('http://localhost:3001/students', {
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(tempData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      })
      .then((response)=>{
          window.location.reload(false);
      })
    }

    const ValidateStudent = (data) => {
      if(data.group == "" || data.firstName == "" || data.lastName =="" || data.gender == "" || data.birthday == ""){
        return {isValid: false,message:"All fields must be filled"};
      }
      if(!/^[A-Za-z]*$/.test(data.firstName)){
        return {isValid: false,message:"First name must contain only latin letters"};
      }
      if(!/^[A-Za-z]*$/.test(data.lastName)){
        return {isValid: false,message:"Last name must contain only latin letters"};
      }
      fetch('http://localhost:3001/students/findSimilar', {
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      })
      .then((res)=>{
        if(res.hasSame)
          return {isValid:false,message:"This student is already in table"};    
      });
      return {isValid:true,message:"Valid"};
    }


    const deleteStudent = (id) => {
        console.log(id);
        const data = {
            _id:id,
        }
        fetch("http://localhost:3001/students/delete",{
            method: 'POST',
            mode:'cors',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
        setUsers((users)=>{
            return [...users].filter(x => x._id !== id);
        })
    }
    const editStudent = (x) => {
      fetch("http://localhost:3001/students/" + x)
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data);
            setValue('group',data.group);
            setValue('firstName',data.firstName);
            setValue('lastName',data.lastName);
            setValue('gender',data.gender);
            setValue('birthday',data.birthday.slice(0,10))
            console.log(users.length > 0 ? users : "Дані ще не завантажені");
          })
      setIdToEdit(() => {return x;});
      setFormVisible(true)
    }

    return <div>
        <div className="table" style={{marginTop:'5%'}}>
        <p style={{textAlign: "left", fontSize: 32+ "px"}}>Students</p>   
        <button className="add-button btn btn-outline-dark" onClick={() => {setFormVisible(true); setIdToEdit(null);}}>+</button>        
        <form id="addForm" onSubmit={handleSubmit(sendData)}>
        <div className="overlay" id = "add-student-overlay" style={{display: isFormVisible?"block":"none"}}>
            <div className="overlay-inner">
                <div className = "overlay-inner-top">
                    <button type="reset" className="btn btn-outline-dark" style={{padding: '5px 10px', margin: 2+'%'}}
                    onClick={()=>setFormVisible(false)}>X</button>
                    <p id="form-header" style={{fontSize: 'large', fontWeight: 'bold', margin: 3+'%'}}>Add student</p>
                </div>
                <div className = "overlay-inner-center">
                    <div className = "overlay-inputs">
                    <input type = "hidden" className ="id "name ="id" id="id"/>
                    <div className="form-group row">
                    <label htmlFor="group" className="col-sm-3 col-form-label">Group:</label>
                    <div className="col-sm-6">
                    <select className="form-control" defaultValue={""} id="group" {...register("group")}  >
                        <option value="" disabled>Select group</option>
                        <option value="PZ-21">PZ-21</option>
                        <option value="PZ-22">PZ-22</option>
                        <option value="PZ-23">PZ-23</option>
                        <option value="PZ-24">PZ-24</option>
                        <option value="PZ-25">PZ-25</option>
                        <option value="PZ-26">PZ-26</option>
                    </select></div></div><br/>
                    
                    <div className="form-group row">
                        <label htmlFor="inputFirstName" className="col-sm-3 col-form-label">Fisrt Name</label>
                        <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputFirstName" placeholder="Fisrt Name" {...register("firstName")}/>
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <label htmlFor="inputLastName" className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" {...register("lastName")}/>
                        </div>
                    </div><br/>
                    <div className="form-group row">
                    <label htmlFor="gender" className="col-sm-3 col-form-label">Gender:</label>
                    <div className="col-sm-6">
                    <select className="form-control" defaultValue={""} id="gender" {...register("gender")}>
                    <option value="" disabled>Select gender</option>
                        <option value="M">male</option>
                        <option value="F">female</option>
                    </select></div></div><br/>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="birthday">Birthday:</label>
                        <div className="col-sm-6">
                        <input type="date" max={new Date().toISOString().split("T")[0]} className="form-control" {...register("birthday")} id="birthday"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className = "overlay-inner-bottom">
                    <button type="reset" className="btn btn-outline-dark" style={{margin:'2%', padding: '5px 10px'}} 
                    onClick={()=>setFormVisible(false)}>Cancel</button>
                    <button type="submit" className="btn btn-outline-dark" id = "submit-button" style={{margin:'2%', padding: '5px 10px'}}>Ok</button>
                </div>
            </div>
        </div>  
        </form>

        <table className="table table-bordered" style = {{width: 100+'%'}}>
            <thead style={{textAlign: 'center'}}>
            <tr style={{fontFamily: 'sans-serif', fontSize: 75+'%', fontWeight:'normal'}}>
                <td style={{width: 9+'%'}}></td>
                <td style={{width: 18+'%'}}>Group</td>
                <td style={{width: 26+'%'}}>Name</td>
                <td style={{width: 6+'%'}}>Gender</td>
                <td style={{width: 18+'%'}}>Bitrhday</td>
                <td style={{width: 9+'%'}}>Status</td>
                <td style={{width: 14}}>Options</td>
            </tr>
            </thead>
            <tbody id="TableBody" style={{fontFamily: 'sans-serif', fontWeight:'bold', fontSize: 'medium'}}>
                {
                    users.length > 0 && users.map(user=>
                        <tr key={user._id}>
                        <td hidden key={user._id + "-id"}></td>
                        <td key={user._id + "-checkbox"}>
                          <input key={user._id + "-chkbox"} type="checkbox" />
                        </td>
                        <td key={user._id + "-group"}>{user.group}</td>
                        <td key={user._id + "-name"}>{user.firstName + " " + user.lastName}</td>
                        <td key={user._id + "-gender"}>{user.gender}</td>
                        <td key={user._id + "-birthday"}>{new Date(user.birthday).toLocaleString('en', { day: '2-digit' }) + "." 
                                                        + new Date(user.birthday).toLocaleString('en', { month: '2-digit' }) +"."
                                                        + new Date(user.birthday).getFullYear()}</td>
                        <td key={user._id + "-status"}>
                          <input key={user._id + "-chkboxstatus"} type="checkbox" className="status-button" />
                        </td>
                        <td key={user._id + "-buttons"}>
                          <button
                            key={user._id + "-editButton"}
                            onClick={() => editStudent(user.id)}
                            style={{
                              backgroundImage: `url(${editIcon})`,
                              backgroundSize: "auto 50%",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center"
                            }}
                          ></button>
                          <button
                            key={user._id + "-deleteButton"}
                            onClick={() => deleteStudent(user._id)}
                            style={{
                              backgroundImage: `url(${deleteIcon})`,
                              backgroundSize: "auto 50%",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              marginLeft: "4px"
                            }}
                          ></button>
                        </td>
                      </tr>)
                }
    </tbody>
</table>
</div>
    </div>
}

export default StudentsPage;