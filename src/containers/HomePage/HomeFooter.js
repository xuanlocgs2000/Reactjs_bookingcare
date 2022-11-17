import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2022 xuanlocgs2000. More infomation in github.
          <a target="_blank" href="https://github.com/xuanlocgs2000">
            &nbsp;Click here
          </a>
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.user.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
