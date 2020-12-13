import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as settingsActions from "../actions/settings";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import bg from "./signin_background.jpg";
import cover from "./cover.png";

const { Text } = Typography;

const Signin = (props) => {
  const [ip, setIP] = React.useState(null);
  const [btnState, setBtnState] = React.useState(false);

  useEffect(() => {
    //props.getSettings();
    text("https://www.cloudflare.com/cdn-cgi/trace").then((data) => {
      let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
      let ip = data.match(ipRegex)[0];
      setIP(ip);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.auth) props.history.push("/");
  });

  const onFinish = async (values) => {
    setBtnState(true);
    await props.signin(values, () => {
      //props.history.push("/");
      setBtnState(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function text(url) {
    return fetch(url).then((res) => res.text());
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        minHeight: "100%",
        minWidth: "100%",
        position: "fixed",
        top: 0,
      }}
    >
      <Row justify="space-around" align="middle" style={{ height: "100vh" }}>
        <Col xs={24} sm={18} md={14} lg={8}>
          <Card
            bordered
            size="small"
            title=" "
            cover={<img src={cover} alt="cover" />}
            actions={[<Text>Your ip is {ip}</Text>]}
          >
            <Form
              name="basic"
              size="large"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                autoComplete="chrome-off"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<KeyOutlined />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="ghost"
                  block
                  htmlType="submit"
                  disabled={btnState}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    settings: state.settings.get,
    auth: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (values, callback) => dispatch(actions.signin(values, callback)),
    getSettings: () => dispatch(settingsActions.getSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
