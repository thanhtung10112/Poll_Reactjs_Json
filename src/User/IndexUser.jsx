import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import AddRegister from "./AddRegister";
import Login from './Login';

function IndexUser() {
    const [user, setUser] = useState([]);


    useEffect(() => {
        let url = "http://localhost:3500/user";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                console.log("Lấy user tin: ", data);
            });
    }, []);

    const hamThemUser = (user) => {
        let url = `http://localhost:3500/user/`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                console.log("Thêm User: ", data);
            });
    }

    return (
        <div>

            <AddRegister themUser={hamThemUser} />
            {/* <Login /> */}
        </div>
    );
};

export default IndexUser;