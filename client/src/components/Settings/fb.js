import React from "react";
import { Button } from "antd";
import axios from "axios";

const FacebookButton = (props) => {
  const login = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log(response.authResponse);
          console.log(response.authResponse.accessToken);
          console.log(response.authResponse.userID);
          axios
            .get(
              `https://graph.facebook.com/${response.authResponse.userID}/accounts?access_token=${response.authResponse.accessToken}`
            )
            .then((data) => {
              console.log(data.data);
            });

          // window.FB.api("/me", function (response) {
          //   console.log(response);
          // });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "public_profile,email,pages_messaging,pages_show_list",
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
