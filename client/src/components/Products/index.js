import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Select,
  InputNumber,
  Popconfirm,
  Upload,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as categoryActions from "../../actions/category";
import * as productActions from "../../actions/product";
import { connect } from "react-redux";
import { uploader } from "../uploader";
import IconFont from "../icon";

const { Option } = Select;
const { Text } = Typography;

const Products = (props) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getCategories();
    props.getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onCategoryChange = (value) => {
    form.setFieldsValue({
      category: value,
    });
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => editProduct(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => deleteProduct(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Text>
          {text.slice(0, 30)}
          {text[31] ? "..." : ""}
        </Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <Text code>{text.toFixed(2)}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <Text>
          <Tag>{text}</Tag>
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
      render: (text) => (
        <Text>
          {text.slice(0, 50)}
          {text[51] ? "..." : ""}
        </Text>
      ),
    },
  ];

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    if (id) {
      await props.editProduct(id, values);
    } else {
      await props.addProduct(values);
    }
    props.getProducts();
    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const addProductButton = () => {
    setVisible(true);
    form.resetFields();
    setImage(null);
    setId(null);
  };

  const deleteProduct = async (record) => {
    await props.deleteProduct(record);
    props.getProducts();
  };

  const editProduct = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
    setImage(record.image_url);
  };

  const uploadImage = async (image) => {
    const url = await uploader(image.file);
    setImage(url.location);
    form.setFieldsValue({ image_url: url.location });
  };

  return (
    <>
      <Modal
        title="Add Product"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          size="large"
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your product name!" },
            ]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input.TextArea placeholder="Product Description" rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <InputNumber placeholder="0.00" />
          </Form.Item>

          <Form.Item name="category" rules={[{ required: true }]}>
            <Select placeholder="Select a category" onChange={onCategoryChange}>
              {props.categories?.map((cat) => {
                return (
                  <Option key={cat._id} value={cat.name}>
                    {cat.name}
                  </Option>
                );
              })}
            </Select>
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
          <Button onClick={addProductButton}>
            <IconFont type="icon-createnewpost" />
          </Button>
        )}
        columns={columns}
        dataSource={props.products}
        rowKey="_id"
        scroll={{ x: "100%" }}
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

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(categoryActions.getCategory()),
    addProduct: (product) => dispatch(productActions.addProduct(product)),
    getProducts: () => dispatch(productActions.getProduct()),
    deleteProduct: (product) => dispatch(productActions.deleteProduct(product)),
    editProduct: (id, product) =>
      dispatch(productActions.updateProduct(id, product)),
  };
};

const mapStateToProps = (state) => {
  return {
    categories: state.category?.get_all,
    products: state.products?.get_all,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
