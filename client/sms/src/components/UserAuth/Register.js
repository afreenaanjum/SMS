import React from 'react';
import { submitRegister } from '../../actions/userAuth';
import { connect } from 'react-redux';

// style components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup } from 'reactstrap';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      details: { }
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  updateDetail = (event) => {
    let updateDetails = Object.assign({}, this.state.details);
    updateDetails[event.target.id] = event.target.value;
    this.setState({
        details: updateDetails   
    });
  }

  onSubmit = () => {
    this.props.dispatch(submitRegister(this.state.details));
    this.toggle()
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Register</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register Form</ModalHeader>
          <ModalBody>
            <Form id="register">
                <FormGroup>
                    <Input 
                        type="text" 
                        name="username" 
                        id="username"
                        onChange={this.updateDetail} 
                        placeholder="Name" />
                </FormGroup>
                <FormGroup>
                    <Input 
                        type="text" 
                        name="email" 
                        id="email"
                        onChange={this.updateDetail} 
                        placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Input 
                        type="text" 
                        name="mobile" 
                        id="mobile"
                        onChange={this.updateDetail} 
                        placeholder="mobile" />
                </FormGroup>
                <FormGroup>
                    <Input 
                        type="password" 
                        name="password" 
                        id="password"
                        onChange={this.updateDetail} 
                        placeholder="password" />
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="register" color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect()(Register);