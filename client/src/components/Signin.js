import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as settingsActions from "../actions/settings";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import bg from "./signin_background.jpg";

const { Text } = Typography;

const Signin = (props) => {
  const [ip, setIP] = React.useState(null);

  useEffect(() => {
    //props.getSettings();

    text("https://www.cloudflare.com/cdn-cgi/trace").then((data) => {
      let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
      let ip = data.match(ipRegex)[0];
      setIP(ip);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    props.signin(values, () => {
      props.history.push("/");
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
            cover={
              <img
                src="https://ecommerce26.s3-ap-southeast-1.amazonaws.com/fb_cpanel_bot/w2jUb3Gf2wn5NpPsfybi33.png"
                alt="cover"
              />
            }
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
                <Button type="ghost" block htmlType="submit">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (values, callback) => dispatch(actions.signin(values, callback)),
    getSettings: () => dispatch(settingsActions.getSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
