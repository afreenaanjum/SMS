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
            console.log(message)
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
                <Card style={{paddingBottom:"15px", border:"none", backgroundColor:"#f5f5f5"}}>
                    <div className="scroll" id="style-1">
                        <div className="force-overflow">
                        <div className="message-align">
                        {this.state.messages.map( message => {
                            return( (message.createdAt)?
                                    ((socket.id !== message.socketId) ?   
                                        (<Card style={{ backgroundColor: "#d9f7be", 
                                                            border:"none",
                                                            marginTop: "4px", 
                                                            marginRight: "50px",
                                                            marginLeft: "8px", 
                                                            paddingLeft:"6px",
                                                            paddingTop:"6px",
                                                            paddingRight:"6px" }}>
                                            <p className="message-text">{message.text}</p>
                                            <p className="msg_time">{`${message.createdAt} | Username: ${message.socketId}`}</p>
                                        </Card>)
                                        :
                                        (<Card style={{ backgroundColor: "#b7eb8f",
                                                            border:"none",
                                                            marginTop: "4px", 
                                                            marginLeft: "50px", 
                                                            marginRight: "8px", 
                                                            paddingLeft:"6px",
                                                            paddingTop:"6px",
                                                            paddingRight:"6px" }}>
                                            <p className="message-text">{message.text}</p>
                                            <p className="msg_time">{`${message.createdAt} | Username: ${message.socketId}`}</p>
                                        </Card>)
                                    ):(
                                    <Alert
                                        color="dark"
                                        style={{ border:"none",
                                                 padding:"1px",
                                                 margin:"100px",
                                                 textAlign:"center",
                                                 marginTop: "4px",
                                                 marginBottom: "7px",
                                                 fontSize: "13px",
                                                 height: "20px"
                                                 }}>
                                        <p style={{  }}>{message.text}</p>
                                    </Alert>))
                            })}
                        </div>
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