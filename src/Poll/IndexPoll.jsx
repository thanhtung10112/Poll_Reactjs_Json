import React, { useEffect, useState } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

import AddPoll from "./AddPoll";
import ListPoll from "./ListPoll";



function IndexPoll() {
    const [poll, setPoll] = useState([]);
    const [count, setcount] = useState(null);
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
    }, [count]);

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
                    })
                    .then(d => Swal.fire('...', 'Thêm Thành Công!', 'success').then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/IndexPoll"
                        }
                    }));
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

    const handleClickPoll1 = async (id, CountPoll) => {
        const index = poll.findIndex(x => x.id === id);
        console.log(index);
        if (index >= 0) {
            poll[index].opId1 += 1;
            const newpoll = [...poll]
            console.log(newpoll[index]);
            let url2 = `http://localhost:3500/poll/${id}`;
            await fetch(url2, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newpoll[index]),
            })
                .then(res => res.json())
                .then(data => {
                    setcount(data);
                });
        }
    }

    const handleClickPoll2 = async (id) => {
        const index = poll.findIndex(x => x.id === id);
        console.log(index);
        if (index >= 0) {
            poll[index].opId2 += 1;
            const newpoll = [...poll]
            console.log(newpoll[index]);
            let url2 = `http://localhost:3500/poll/${id}`;
            await fetch(url2, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newpoll[index]),
            })
                .then(res => res.json())
                .then(data => {
                    setcount(data);
                });
        }
    }

    return (
        <div className="container-fluid main">
            <div className="row align-items-center">

                <div className="col-lg-9">
                    <main>

                        <ListPoll
                            ListPoll={poll}
                            thempoll={thempoll}
                            DeletePoll={DeletePoll}
                            handleClickPoll1={handleClickPoll1}
                            handleClickPoll2={handleClickPoll2} />

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