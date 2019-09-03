
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userName: ''
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleSignUp(e) {
        this.setState({ userName: e.target.value })



        render() {
            return (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <Input name='username' value={this.state.userName} placeholder='Enter Username' />
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={handleSignUp}>SignUp</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }

    export default Modal