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
      details: {}
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <form>
        <div>
          <CustomTextField
            type="text"
            label="User Name"
            value={userName}
            onChange={this.handleUserName}
            notchedOutlineSelect={classes.notchedOutlineSelect}
            inputStyles={classes.textField}
            styles={classes.textField}
          />
        </div>
        <div>
          <CustomTextField
            type="text"
            label="Email"
            value={email}
            onChange={this.handleEmail}
            notchedOutlineSelect={classes.notchedOutlineSelect}
            styles={classes.textField}
          />
        </div>
        <div>
          <CustomTextField
            type="text"
            label="Mobile"
            value={mobileNumber}
            onChange={this.handleMobile}
            notchedOutlineSelect={classes.notchedOutlineSelect}
            styles={classes.textField}
          />
        </div>
        <div>
          <CustomTextField
            type="password"
            label="Password"
            value={password}
            onChange={this.handlePassword}
            notchedOutlineSelect={classes.notchedOutlineSelect}
            styles={classes.textField}
          />
        </div>
        <div>
          <CustomTextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={this.handleConfirmPassword}
            notchedOutlineSelect={classes.notchedOutlineSelect}
            styles={classes.textField}
          />
        </div>
        <Button
          disabled={
            !userName ||
            !email ||
            !mobileNumber ||
            !password ||
            password !== confirmPassword
          }
          type="submit"
          onClick={(e) => this.handleSignUp(e)}
          classes={{
            root: classes.button,
          }}
        >
          Sign Up
                      </Button>
      </form>
    );
  }
}

export default connect()(Register);