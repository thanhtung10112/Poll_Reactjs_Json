import React from 'react';

class AddPoll extends React.Component {
    constructor(props) {
        super();
        this.state = { poll: {} }
        this.id = React.createRef();
        this.Name = React.createRef();
        this.Option_1 = React.createRef();
        this.Option_2 = React.createRef();
    }

    hamThempoll = () => {
        let poll = {
            id: this.id.current.value,
            Name: this.Name.current.value,
            Option_1: this.Option_1.current.value,
            Option_2: this.Option_2.current.value,
        }
        this.props.hamThempoll(poll);
        console.log(poll);
    }
    render() {
        return (
            <div className="ThemLoaiSach m-2">
                <h5 className="mb-3">Thêm Loại Tin </h5>
                <div className="mb-3">
                    <label htmlFor="">Mã loại</label>
                    <input className="form-control" placeholder="Mã loại id "
                        ref={this.id} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Tên </label>
                    <input className="form-control" placeholder="Tên loại tin"
                        ref={this.Name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Option 1:  </label>
                    <input className="form-control" placeholder="Thứ tự"
                        ref={this.Option_1} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Option : 2</label> <br />
                    <input className="form-control" placeholder="Ẩn hiện"
                        ref={this.Option_2} />
                </div>
                <div className="mb-3">
                    <button onClick={this.hamThempoll} type="button" className="btn btn-primary" >
                        ADD
                    </button>
                </div>
            </div>
        )
    }
};

export default AddPoll;