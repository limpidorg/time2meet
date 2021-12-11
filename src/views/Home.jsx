import React from "react";
import { API } from "../t2m"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            email: "",
            password: "",
        }
        this.updateUserState()
    }

    updateUserState() {
        API.endpoint("get-user")().then(res => {
            this.setState({
                user: res.user,
                token: res.token,
                userId: res.userId,
                loggedIn: true
            })
        }).catch(err => {
            this.setState({
                loggedIn: false
            })
        })
    }
    attemptLogin() {
        API.login(this.state.email, this.state.password).then(res => {
            this.updateUserState()
        }).catch(err => {
            alert(err.message)
            this.setState({
                password: ""
            })
        })
    }

    render() {
        return (
            <div className="max-w-md text-center mx-auto my-10">
                <div className="text-xl font-bold">Prototype</div>
                <div className={"flex flex-col mt-5 " + (this.state.loggedIn ? "bg-green-100" : "bg-red-100")
                }>
                    { // if user is logged in
                        this.state.loggedIn ? (
                            <div>
                                <div>{this.state.user.userName ?? "Loading..."}</div>
                                <button onClick={
                                    () => {
                                        API.logout().then(res => {
                                            this.updateUserState()
                                        })
                                    }
                                }>Logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col text-center">
                                <div>You are not logged in.</div>
                                <div className="flex mx-auto text-center">
                                    <input onChange={
                                        (e) => {
                                            this.setState({
                                                email: e.currentTarget.value
                                            })
                                        }
                                    } value={this.state.email}></input>
                                </div>
                                <div className="flex mx-auto text-center">
                                    <input type="password" onKeyPressCapture={
                                        (e) => {
                                            if (e.key === "Enter") {
                                                this.attemptLogin()
                                            }
                                        }
                                    } onChange={
                                        (e) => {
                                            this.setState({
                                                password: e.currentTarget.value
                                            })
                                        }
                                    } value={this.state.password}></input>
                                </div>
                                <button onClick={
                                    () => {
                                        this.attemptLogin()
                                    }
                                }>Login</button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export { Home };