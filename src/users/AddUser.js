import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenNotification from '../notification/Notification';

const URI = "http://localhost:8000/"

const CompAddUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate()

    //Funstion to save the new data
    const add = async (e) => {
        try {
            e.preventDefault(); //Prevent the redirection of the post method
            await axios.post(URI, {
                name: name,
                email: email,
                gender: gender,
                status: status
            })
            //Print a notification of user added
            OpenNotification("success","Add","The user has been added successfully");
            //Return to the main page
            navigate('/')
        } catch (error) {
            //Save in a variable the data of the error response
            const response = error.response.data;
            //Print a error message for each error
            for (let index = 0; index < response.length; index++) {
                OpenNotification("error",response[index].field,response[index].message)
            }
        }
    }

    return (
        <div className='container col-md-4 col-lg-4'>
            <h3 className='my-4'>Create User</h3>
            <form onSubmit={add}>
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
                <button type="submit" className="btn btn-primary mx-2">Add</button>
                <a className="btn btn-secondary" href="/">Back</a>
            </form>
        </div>
    )

}

export default CompAddUser;