import React from "react";
import { Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CategoriesForm = (props) => {
  return (
    <>
      <Form
        name="basic"
        onFinish={props.onFinish}
        form={props.form}
        size="large"
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input your category name!" },
          ]}
        >
          <Input placeholder="Category Name" />
        </Form.Item>
        <Form.Item name="image_url">
          <Upload
            fileList=""
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={props.uploadImage}
          >
            <div>
              {props.image ? (
                <img src={props.image} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <>
                  <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
                </>
              )}
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoriesForm;
