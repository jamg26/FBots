import React from "react";
import { Form, Input } from "antd";

const FacebookForm = (props) => {
  return (
    <>
      {" "}
      <Form
        name="basic"
        onFinish={props.onFinish}
        form={props.form}
        size="large"
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          name="pagename"
          rules={[{ required: true, message: "Please input Page Name!" }]}
        >
          <Input placeholder="Page Name" />
        </Form.Item>
        <Form.Item
          name="pageid"
          rules={[{ required: true, message: "Please input Page ID!" }]}
        >
          <Input placeholder="Page ID" />
        </Form.Item>
        <Form.Item
          name="pagetoken"
          rules={[{ required: true, message: "Please input Page Token!" }]}
        >
          <Input.TextArea rows={4} placeholder="Page Token" />
        </Form.Item>
      </Form>
    </>
  );
};

export default FacebookForm;
