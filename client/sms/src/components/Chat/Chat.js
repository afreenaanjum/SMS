import React, {Component} from 'react'
import { socket } from '../../App'
import { Socket } from 'net';

class Chat extends Component{
    constructor(){
        super()
        this.state={
            messages:[],
            message:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        socket.on("message", (message) => {
            // console.log(message)
            this.setState({messages: [...this.state.messages, message]})
        })
    }

    handleSubmit(e){
        e.preventDefault()
        console.log(e.target.value)
        socket.emit("message", this.state.message)
        this.setState({message:""})
    }

    handleChange(e){
        const message = e.target.value
        this.setState({message})
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <div>
                    {
                        this.state.messages.map( message => {
                            return(
                                <div>
                                    <div>{message.text}</div>
                                    <div>{message.createdAt}</div>
                                    <div>{message.socketId}</div>
                                </div>)
                        })
                    }
                </div>
                <form onSubmit={this.handleSubmit}>
                      <input
                            id="typedMessage" 
                            type="text"
                            value={this.state.message}
                            onChange={this.handleChange}
                            placeholder={"Type message.."} 
                            required
			            />
                        <input type='submit'/>
				</form>
            </div>
        )
    }
}

export default Chat;