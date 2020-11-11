import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as settingsActions from "../actions/settings";
import { Form, Input, Button, Row, Col, Card } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

const Signin = (props) => {
  useEffect(() => {
    //props.getSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    props.signin(values, () => {
      props.history.push("/");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row justify="space-around" align="middle" style={{ height: "100vh" }}>
        <Col xs={24} sm={18} md={14} lg={8}>
          <Card
            cover={
              <img
                src="https://ecommerce26.s3-ap-southeast-1.amazonaws.com/fb_cpanel_bot/w2jUb3Gf2wn5NpPsfybi33.png"
                alt="cover"
              />
            }
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
    </>
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
