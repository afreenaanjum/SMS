import React from 'react';
import { submitLogin } from '../../actions/userAuth';
import { connect } from 'react-redux';

// style components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      details: {}
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
    this.props.dispatch(submitLogin(this.state.details));
    this.toggle()
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login Form</ModalHeader>
          <ModalBody>
            <Form id="login">
              <FormGroup>
                <Input
                  type="text"
                  name="mobileOrEmail"
                  id="mobileOrEmail"
                  onChange={this.updateDetail}
                  required
                  placeholder="Email or Mobile" />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.updateDetail}
                  required
                  placeholder="Password" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="login" color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect()(Login);