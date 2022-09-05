import { notification } from 'antd';
//Import antd
import "antd/dist/antd.min.css"

//Create a component of notification
const OpenNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description:description,
    });
};

export default OpenNotification;