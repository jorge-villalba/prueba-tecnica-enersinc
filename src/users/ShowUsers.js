import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OpenNotification from '../notification/Notification';


const URI = "https://gorest.co.in/public/v2/users/"

const CompShowUsers = () => {

    const [users, setUser] = useState([]);
    useEffect(() => {
        getUsers()
    }, []);

    //Function to show all the users
    const getUsers = async () => {
        //Does the request to the backend
        const res = await axios.get(URI, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07"
            }
        });
        setUser(res.data);
    }

    //Function to delete a user
    const deleteUser = async (id) => {
        //Eliminate a user according to id
        await axios.delete(`${URI}${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07"
            }
        });
        //Open a nofification
        await OpenNotification("warning", "Delete", "The user has been deleted successfully")
        //Call get users to refresh the table 
        getUsers();
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to={"/add"} className="btn btn-primary my-3 px-2 fw-bold">
                        <i className="fa-solid fa-plus"></i> Add User
                    </Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Link to={`/${user.id}`} className="btn btn-light border border-secondary"><i className="fa-solid fa-eye"></i></Link>
                                        <Link to={`/${user.id}/edit`} className="btn btn-primary mx-2 my-1">Edit</Link>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowUsers