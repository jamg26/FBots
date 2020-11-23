import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Popconfirm,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as categoryActions from "../../actions/category";
import { uploader } from "../uploader";
import IconFont from "../icon";

const { Text } = Typography;

const Categories = (props) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => editCategory(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => deleteCategory(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete1" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
    },
  ];

  const deleteCategory = async (record) => {
    await props.deleteCategory(record);
    props.getCategory();
  };

  const editCategory = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
    setImage(record.image_url);
  };

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    if (id) {
      await props.updateCategory(id, values);
    } else {
      await props.addCategory(values);
    }
    props.getCategory();
    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleCancel = (e) => {
    setVisible(false);
    setId(null);
    form.resetFields();
  };

  const addCategory = () => {
    form.resetFields();
    setVisible(true);
    setImage(null);
    setId(null);
  };

  const uploadImage = async (image) => {
    const url = await uploader(image.file);
    setImage(url.location);
    form.setFieldsValue({ image_url: url.location });
  };

  return (
    <>
      <Modal
        title="Add Category"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          size="large"
          onFinishFailed={onFinishFailed}
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
              onChange={uploadImage}
            >
              <div>
                {image ? (
                  <img src={image} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  <>
                    <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
                  </>
                )}
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        title={() => (
          <Button onClick={addCategory}>
            <IconFont type="icon-add" />
          </Button>
        )}
        columns={columns}
        dataSource={props.categories}
        rowKey="_id"
        size="small"
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       setVisible(true);
        //       form.setFieldsValue(record);
        //       setId(record);
        //       setImage(record.image_url);
        //     }, // click row
        //   };
        // }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.category.get_all,
  };
};

export default connect(mapStateToProps, categoryActions)(Categories);
