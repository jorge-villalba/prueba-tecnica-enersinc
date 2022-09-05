import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OpenNotification from "../notification/Notification";

const URI = "http://localhost:8000/"

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
        e.preventDefault();
        await axios.put(URI + id, {
            name: name,
            email: email,
            gender: gender,
            status: status
        });
        //Print a notification of user added
        OpenNotification("success","Edit","The user has been edited successfully");
        //Return to the main page
        navigate("/");
    }

    //Set the data in the form
    useEffect(() => {

        //Obtain the data with the id of the user
        const getUserById = async () => {
            const res = await axios.get(URI + id)
            setName(res.data.name);
            setEmail(res.data.email);
            setGender(res.data.gender);
            setStatus(res.data.status);
        }
        getUserById();
    }, [])



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
                    <input
                        list="genders"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                    <datalist id="genders">
                        <option value="male" />
                        <option value="female" />
                    </datalist>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <input
                        list="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                    <datalist id="status">
                        <option value="active" />
                        <option value="inactive" />
                    </datalist>
                </div>
                <button type="submit" className="btn btn-primary mx-2">Edit</button>
                <a className="btn btn-secondary" href="/">Back</a>
            </form>
        </div>
    )
}

export default CompEditUser