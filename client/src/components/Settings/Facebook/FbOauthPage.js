import React from "react";

const FBOauthPage = (props) => {
  const [status, setStatus] = React.useState("Please allow popup if blocked.");
  React.useEffect(() => {
    window.FB && login();
  }, []);

  const login = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          //if (!props.fb_page_tokens.length) setFbCreds(response);
          console.log(response);
          setStatus(
            "Success! You may close this browser and try to order again."
          );
        } else {
          setStatus("Please allow me to have your basic information.");
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "public_profile,email",
      }
    );
  };
  return (
    <>
      <h1>{status}</h1>
      {/* <div
        class="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="rounded"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div> */}
    </>
  );
};

export default FBOauthPage;
