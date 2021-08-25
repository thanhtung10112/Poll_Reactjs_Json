import React from 'react';
import ReactDOM from 'react-dom';

class ListPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: false
        }
    }
    componentDidMount() {

    }

    thempoll() {
        this.props.thempoll();
    }

    DeletePoll(id = 1, e) {
        // this.props.xoaLoaiSach(id);
        this.setState({ message: true });
        let index = this.props.ListPoll.findIndex((ls) => { return ls.id === id })
        let poll = this.props.ListPoll[index];
        ReactDOM.render(
            <>
                <div className="box">
                    <h3>Xóa loại tin</h3>
                    <p>Bạn có chắc muốn xóa loại tin: <span className="bold">{poll.Name}</span>?</p>
                </div>
                <div className="control">
                    <button onClick={() => this.setState({ message: false })} className="btn mr-2">Hủy bỏ</button>
                    <button onClick={(e) => this.chacChanXoa(id)} className='btn px-3 btn-sm btn-danger'>
                        Vẫn xóa
                    </button>
                </div>
            </>
            ,
            document.getElementById("warning"))
    }

    // Xác nhận sẽ xóa 
    chacChanXoa(id) {
        this.props.DeletePoll(id);
        this.setState({ message: false })
    }


    render() {
        let warning = <>
            <div id="warning" className={this.state.message ? "show delMessage" : "delMessage"}>
            </div>
        </>

        let kq = null;
        if (this.props.ListPoll !== null)
            kq = <div className="columns columns-center row" >
                <h4 className="mt-4 mb-3 d-flex justify-content-between align-items-center">
                    <span className="title">Danh sách Poll</span>
                    <span>
                        <button onClick={() => this.thempoll()} className="btn btn-success"><i className="fas fa-plus"></i></button>
                    </span>
                </h4>
                {this.props.ListPoll.map(poll => (
                    <div className="col-4 Poll-columns" >
                        <div className="Poll-content" >
                            <div className="Poll-header">
                                <p className="Poll-title">{poll.Name} ?</p>
                                <div className="Poll-icon">
                                    <button onClick={(e) => this.DeletePoll(poll.id, e)} type='button' className='btn btn-sm btn-danger'> <i class="far fa-minus-circle"></i> </button>
                                </div>
                            </div>

                            <div className="Poll-card">
                                <div className="vote" onClick={() => { this.props.handleClickPoll1(poll.id) }}>
                                    <div className='left bg-left'> </div>
                                    <p className="text" > {poll.Option_1}:  {poll.opId1} </p>
                                </div>

                                <div className="vote" onClick={() => { this.props.handleClickPoll2(poll.id) }}>
                                    <div className='left2 bg-left'> </div>
                                    <p className="text"> {poll.Option_2}: {poll.opId2} </p>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        return (<> {kq} {warning}</>);

    };
}
export default ListPoll;