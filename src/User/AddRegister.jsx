import React from "react";


class AddRegister extends React.Component {

    constructor(props) {
        super();
        this.state = { user: {}, input: {}, errors: {} }
        this.id = React.createRef();

        this.Username = React.createRef();
        this.Password = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {

            let user = {
                Username: this.state.input.Username,
                Password: this.state.input.Password,
            }
            this.props.themUser(user);
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["Username"]) {
            isValid = false;
            errors["Username"] = "Please enter your name.";
        }

        if (!input["Password"]) {
            isValid = false;
            errors["Password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["Password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["Password"] != input["confirm_password"]) {
                isValid = false;
                errors["Password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }



    render() {
        return (
            <div className="bodys" >
                <div className="mt-20"></div>
                <div className="form" id="signin-form">
                    <a href className="form-logo">
                        <h1 >Register</h1>
                    </a>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="User Name" id="signin-email"
                                name="Username"
                                value={this.state.input.Username}
                                onChange={this.handleChange}
                                id="Username"
                                ref={this.Username} />
                            <div className="text-danger">{this.state.errors.Username}</div>

                        </div>
                        <div className="form-group">
                            <input type="password" className="form-input" placeholder="Password" id="signin-password"
                                name="Password"
                                value={this.state.input.Password}
                                onChange={this.handleChange}
                                id="Password"
                                ref={this.Password} />
                            <div className="text-danger">{this.state.errors.Password}</div>

                        </div>

                        <div className="form-group">
                            <input type="password" className="form-input" placeholder="Confirm password" id="signin-password"
                                name="confirm_password"
                                value={this.state.input.confirm_password}
                                onChange={this.handleChange}
                                id="confirm_password"
                            />

                        </div>


                        <button type="submit" className="form-btn" id="signin-btn" >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        );
    };
}
export default AddRegister;