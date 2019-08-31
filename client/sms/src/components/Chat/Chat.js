import React, {Component} from 'react'
import { socket } from '../../App'
import './Chat.css' 
import { FaPaperPlane } from "react-icons/fa";

import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Card,
    Alert
} from 'reactstrap';
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
            this.setState({messages: [...this.state.messages, message]})
        })
    }

    handleSubmit(e){
        e.preventDefault()
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
                <Card style={{paddingBottom:"15px", border:"none", backgroundColor:"#f5f5f5"}}>
                    <div className="scroll" id="style-1">
                        <div className="message-align">
                        {this.state.messages.map( message => {
                            return( (message.createdAt)?
                                    ((socket.id !== message.socketId) ?   
                                        (<Card id = 'group_messages'>
                                            <p className="message-text">{message.text}</p>
                                            <p className="msg_time">{`${message.createdAt} | Username: ${message.socketId}`}</p>
                                        </Card>)
                                        :
                                        (<Card id='my_messages'>
                                            <p className="message-text">{message.text}</p>
                                            <p className="msg_time">{`${message.createdAt} | Username: ${message.socketId}`}</p>
                                        </Card>)
                                    ):(
                                    <Alert color="dark" id ='alert'>
                                        <p>{message.text}</p>
                                    </Alert>))
                            })}
                        </div>
                    </div>
                </Card>

                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input
                            type="text"
                            value={this.state.message}
                            onChange={this.handleChange}
                            placeholder={"Type message.."} 
                            required
                        />
                        <InputGroupAddon addonType="append">
                            <Button><FaPaperPlane size="1em" /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
            </div>
        )
    }
}

export default Chat;