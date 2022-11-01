import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userSevice";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    //luu gia tri bien component
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  /**
   * Lifce cycle for
   * Run component...
   * 1.Run contruct--> init state
   * 2.Did mount(set state)><un mount
   * 3.Render
   */ //props con là state của cha
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUsers: response.users,
        }
        // () => {
        //   console.log("check state1: ", this.state.arrUsers);
      );
      // console.log("check state1: ", this.state.arrUsers);
      // }
      // console.log("node.js: ", response);
    }
  };
  handleAddnewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  handleEditUser = (user) => {
    console.log("check eidt user: ", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
    // console.log("click save user: ", res);
  };
  handleDeleteUser = async (user) => {
    // console.log("delete user", user);
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
        // alert("delete user");
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModal: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
      console.log("response create new user:", response);
    } catch (e) {
      console.log(e);
    }
    console.log("check data from child: ", data);
  };
  render() {
    console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser} // không có () do chỉ truyền function thuần từ cha sang con , không có input
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            // isOpen={true}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit} //TRUYEN PROPS
            editUser={this.doEditUser}
            // createNewUser={this.createNewUser}
          />
        )}
        <div className="title text-center">Manage users </div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddnewUser()}
          >
            <i className="fas fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  // console.log("check map:", item, index);
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
