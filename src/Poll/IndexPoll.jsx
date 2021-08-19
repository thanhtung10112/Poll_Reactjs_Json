import React, { useEffect, useState } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';

import AddPoll from "./AddPoll";
import ListPoll from "./ListPoll";



function IndexPoll() {
    const [poll, setPoll] = useState([]);
    const [page, setPage] = useState(0);
    const [showPaginate, setShowPaginate] = useState(false);

    const displayPaginate = () => {
        setShowPaginate(!showPaginate);
    }

    useEffect(() => {
        let url = "http://localhost:3500/poll";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let numPage = Math.ceil(data.length / 4);
                setPage(numPage);
                paginate(numPage);
            });

        let url2 = "http://localhost:3500/poll?_page=1&_limit=4";
        fetch(url2)
            .then(res => res.json())
            .then(data => {
                setPoll(data);
                console.log("Lấy Loại tin: ", data);
            });
    }, []);

    const thempoll = () => {
        ReactDOM.render(
            <AddPoll hamThempoll={hamThempoll} />, document.getElementById('updateForm')
        )
    }

    const paginate = (page) => {
        let button = [];
        for (let i = 1; i <= page; i++) {
            button.push(<button key={i} onClick={(e) => hamPhanTrang(i, e)}>{i}</button>);
        }
        ReactDOM.render(button, document.getElementById("paginate"));
    }

    const DeletePoll = (id = 1) => {
        let url = `http://localhost:3500/poll/${id}`;
        fetch(url, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                fetch("http://localhost:3500/poll")
                    .then(res => res.json())
                    .then(data => {
                        let numPage = Math.ceil(data.length / 4);
                        setPage(numPage);
                        return numPage;
                    })
                    .then(numPage => {
                        hamPhanTrang(numPage);
                        paginate(numPage);
                    })
            });
    }

    const hamThempoll = (poll) => {
        let url = `http://localhost:3500/poll/`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(poll),
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        let numPage = Math.ceil(data.length / 4);
                        setPage(numPage);

                        return numPage;
                    })
                    .then((numPage) => {
                        hamPhanTrang(numPage);
                        paginate(numPage);
                    });
            })
    }

    const hamPhanTrang = (page, e) => {
        let url = `http://localhost:3500/poll?_page=${page}&_limit=4`;
        fetch(url).then(res => res.json()).then(data => {
            setPoll(data);
        });

        document.querySelectorAll(".paginate button").forEach(selector => {
            selector.classList.remove('active');
        })
    }

    return (
        <div className="container-fluid main">
            <div className="row align-items-center">

                <div className="col-lg-9">
                    <main>
                        {/* <Route path="/loai-xe" component={() =>  */}
                        <ListPoll
                            ListPoll={poll}
                            thempoll={thempoll}
                            DeletePoll={DeletePoll}
                        />
                        {/* </Route> */}
                        {/* <Route path="/xe" ></Route> */}
                        <div id="paginate" className={!showPaginate ? "paginate show" : "paginate"}></div>

                    </main>
                </div>
                <div className="col-lg-3">
                    <aside id="updateForm"></aside>
                </div>
            </div>
        </div>

    );
}

export default IndexPoll;