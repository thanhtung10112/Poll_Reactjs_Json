import React from 'react';
import { useHistory } from 'react-router';


function Dash() {
    // let user = JSON.parse(localStorage.getItem('user'))

    const history = useHistory();


    function handleLogout() {
        localStorage.clear();
        history.push("/Login")
    }

    return (
        <div>
            Login thành Công
            <br />
            <input type="button" value="Logout" onClick={handleLogout} />
        </div>
    );
};

export default Dash;