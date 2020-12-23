import React from "react";
import * as Facebook from "fb-sdk-wrapper";
import { Button } from "antd";

const FacebookButton = (props) => {
  const load = async () => {
    await Facebook.load();
    await Facebook.init({
      appId: "3462085153912509",
    });
    Facebook.getLoginStatus().then((response) => {
      if (response.status === "connected") {
        // logged in
        // console.log(1, response);
      } else {
        // not logged in
        //console.log(0, response);
      }
    });
  };

  React.useEffect(() => {
    load();
  }, []);

  const login = () => {
    Facebook.login({
      scope: "public_profile,email,pages_messaging",
      return_scopes: true,
    }).then((response) => {
      if (response.status === "connected") {
        //console.log(response);
        // logged in
      } else {
        // not logged in
      }
    });
  };

  const logout = () => {
    Facebook.logout().then((response) => {
      console.log("logged out");
      // logged out
    });
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
