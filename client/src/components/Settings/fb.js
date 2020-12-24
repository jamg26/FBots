import React from "react";
import { Button } from "antd";

const FacebookButton = (props) => {
  const login = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log(response);
          // window.FB.api("/me", function (response) {
          //   console.log(response);
          // });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "public_profile,email,pages_messaging",
      }
    );
  };

  return (
    <>
      <Button onClick={login} type="primary">
        Authorize Facebook
      </Button>
    </>
  );
};

export default FacebookButton;
