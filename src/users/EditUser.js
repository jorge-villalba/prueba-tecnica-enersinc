import axios from "axios";
import useEffect, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OpenNotification from "../notification/Notification";

const URI = "https://gorest.co.in/public/v2/users/"

const CompEditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate()
    //Get the id of the params of the url
    const { id } = useParams();


    //Do the changes in the user
    const edit = async (e) => {

        try {
            //Prevent the defaut of POST
            e.preventDefault();
            await axios.put(URI + id, {
                name: name,
                email: email,
                gender: gender,
                status: status
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07"
                }
            });
            //Print a notification of user added
            OpenNotification("success", "Edit", "The user has been edited successfully");
            //Return to the main page
            navigate("/");
        } catch (error) {
            //Save in a variable the data of the error response
            const response = error.response.data;
            //Print a error message for each error
            for (let index = 0; index < response.length; index++) {
                OpenNotification("error", response[index].field, response[index].message)
            }
        }
    }

    //Set the data in the form
    useEffect(() => {

        //Obtain the data with the id of the user
        const getUserById = async () => {
            const res = await axios.get(URI + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07"
                }
            });
            setName(res.data.name);
            setEmail(res.data.email);
            setGender(res.data.gender);
            setStatus(res.data.status);
        }
        getUserById();
    })



    return (
        <div className='container col-md-4 col-lg-4'>
            <h3 className='my-4'>Edit User</h3>
            <form onSubmit={edit}>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Gender</label>
                    <select value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        type="text"
                        className='form-select'>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <select value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        type="text"
                        className='form-select'>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mx-2">Edit</button>
                <a className="btn btn-secondary" href="/">Back</a>
            </form>
        </div>
    )
}

export default CompEditUser