import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URI = "http://localhost:8000/"

const CompSeeUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    //Get the id of the params of the url
    const { id } = useParams();


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
            <h3 className='my-4'>{`USER ${id}`}</h3>
            <form>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className='form-control'
                        readOnly
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className='form-control'
                        readOnly
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Gender</label>
                    <input
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        type="text"
                        className='form-control'
                        readOnly
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <input
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        type="text"
                        className='form-control'
                        readOnly
                    />
                </div>
                <a className="btn btn-secondary" href="/">Back</a>
            </form>
        </div>
    )
}

export default CompSeeUser