import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser; //dùng lodash check rỗng
    // let { currentUser } = this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log("didmount edit modal: ", this.props.currentUser);
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, id) => {
    //
    //bad code here
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state,
    //   },
    //   () => {
    //     console.log("check bad state:", this.state);
    //   }
    // );
    //good code here
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    // console.log("event:", event.target.value, id);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return true;
  };

  handleSaveUser = () => {
    let isvalid = this.checkValidateInput();
    if (isvalid === true) {
      //call api eidt user
      this.props.editUser(this.state);
    }
  };

  render() {
    // console.log("this check props from parent", this.props); //lay thuoc tinh tu cha
    // console.log("check child props", this.props);
    // console.log("check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label className="">Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "email")}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label className="">Password</label>
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "password")
                }
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container">
              <label className="">First name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "firstName")
                }
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label className="">Last name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "lastName")
                }
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label className="">Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
