import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about ">
        <div className="section-about-header">Thông tin giới thiệu</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/uHK4cp3goaQ"
              title="FIFA WORLD CUP 2022 - All 32 Teams | Offical World cup song FIFA Qatar 2022."
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              metus neque, ultrices tempus sodales eget, feugiat et velit.
              Curabitur mi felis, accumsan et sapien eu, egestas sollicitudin
              tortor. Vestibulum elementum sapien nec purus dapibus, sed dictum
              lorem tincidunt. Aliquam bibendum pulvinar elit id ultrices.
              Quisque vestibulum dignissim mi, eget sagittis tortor aliquam vel.
              Sed a velit id dolor consequat porta quis et metus.
            </p>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(About);
