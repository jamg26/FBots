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
  Tabs,
  Statistic,
  Card,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";
import * as orderActions from "../../actions/order";
import PrintOrder from "./printOrders";
import IconFont from "../icon";

const { Text } = Typography;
const { TabPane } = Tabs;

const OrdersComponent = (props) => {
  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [info, setInfo] = useState(null);
  const [id, setId] = useState(null);
  const [search, setSearch] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reRender = () => {
    setInfoVisible(false);
    props.getOrders();
  };

  const handleOk = (e) => {
    form.submit();
  };

  const handleOkInfo = (e) => {
    setInfoVisible(false);
  };

  const onFinish = async (values) => {
    await props.updateOrder(id, { ...values, type: "address" });
    setVisible(false);
    reRender();
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

  const addAddress = (data) => {
    setId(data);
    setVisible(true);
  };

  const markAsPaid = async (data) => {
    await props.updateOrder(data, { status: "PAID", type: "status" });
    reRender();
  };
  const markAsCancelled = async (data) => {
    await props.updateOrder(data, { status: "CANCELLED", type: "status" });
    reRender();
  };
  const markAsShipped = async (data) => {
    await props.updateOrder(data, { status: "SHIPPED", type: "status" });
    reRender();
  };

  const searchOrder = async (e) => {
    props.searchOrder(search);
  };

  const removeOrder = async (record) => {
    await props.removeOrder(record);
    props.getOrders();
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              setInfoVisible(true);
              setInfo(record);
            }}
          >
            <IconFont type="icon-icon-test" />
          </Button>
          <Popconfirm
            title="You sure you want to remove?"
            onConfirm={() => removeOrder(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Text
          type={
            text === "NOT_PAID"
              ? "secondary"
              : text === "PAID" || text === "SHIPPED"
              ? "success"
              : text === "CANCELLED"
              ? "danger"
              : ""
          }
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (text) => (
        <Text code type="danger">
          {text?.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "right",
      render: (text) => (
        <Text>
          {new Date(text).toLocaleString("en-US", {
            hour12: true,
          })}
        </Text>
      ),
      responsive: ["md"],
    },
    {
      title: "Shipping Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Text type={text ? "default" : "secondary"}>
          {text ? text : "Please fill shipping address."}
        </Text>
      ),
      responsive: ["md"],
    },
  ];

  return (
    <>
      <Modal
        title="Shipping Address"
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
          initialValues={{
            address: id?.address,
          }}
        >
          <Form.Item name="address">
            <Input.TextArea rows={4} placeholder="Enter shipping address" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Order Information"
        visible={infoVisible}
        onOk={handleOkInfo}
        onCancel={handleOkInfo}
        footer={
          <>
            <div style={{ float: "left" }}>
              {info?.status === "NOT_PAID" ? (
                <>
                  <Popconfirm
                    title="You sure you want to mark as paid?"
                    onConfirm={() => markAsPaid(info)}
                  >
                    <Button>Mark as paid</Button>
                  </Popconfirm>
                  <Popconfirm
                    title="You sure you want to mark as cancelled?"
                    onConfirm={() => markAsCancelled(info)}
                  >
                    <Button danger>Cancel order</Button>
                  </Popconfirm>
                </>
              ) : info?.status === "PAID" ? (
                <Popconfirm
                  title="You sure you want to mark as shipped?"
                  onConfirm={() => markAsShipped(info)}
                  disabled={info?.address ? false : true}
                >
                  <Button disabled={info?.address ? false : true}>
                    Mark as shipped
                  </Button>
                </Popconfirm>
              ) : null}
            </div>
            <Space>
              <Button onClick={() => addAddress(info)}>Edit Address</Button>
              <Button onClick={handleOkInfo}>OK</Button>
            </Space>
          </>
        }
      >
        <Space direction="vertical">
          <Text>
            Order ID: #<Text copyable>{info?._id}</Text>
          </Text>
          <Text>
            Page ID:{" "}
            <Text>
              {info?.pageid} ({info?.page_name})
            </Text>
          </Text>
          <Text>Ordered By: {info?.order_by}</Text>
          <Text>
            Ordered Date:{" "}
            {new Date(info?.createdAt).toLocaleString("en-US", {
              hour12: true,
            })}
          </Text>
          <Text>Status: {info?.status}</Text>
          <Text>Amount: {info?.price.toFixed(2)}</Text>
          {/* <Text>Shipping Fee: {info?.shipping_fee?.toFixed(2)}</Text> */}
          <Text>Product: {info?.product}</Text>
          <img
            src={info?.product_image}
            alt="product"
            width="50px"
            height="50px"
          />
          <Text>Contact: {info?.contact}</Text>
          <Text>Shipping Address: {info?.address}</Text>
        </Space>
      </Modal>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Order List" key="1">
          <Table
            title={() => (
              <>
                <Space>
                  <Input
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                  />
                  <Button onClick={searchOrder}>Search</Button>
                  <PrintOrder orders={props.orders} stats={props.stats} />
                </Space>
              </>
            )}
            columns={columns}
            dataSource={props.orders}
            rowKey="_id"
            size="small"
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       setInfoVisible(true);
            //       setInfo(record);
            //     }, // click row

            //   };
            // }}
          />
        </TabPane>
        <TabPane tab="Reports" key="2">
          <Card>
            <Row>
              <Col lg={4}>
                <Card>
                  <Statistic title="Total Orders" value={props.stats?.total} />
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <Statistic title="Total Paid" value={props.stats?.paid} />
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <Statistic
                    title="Total Cancelled"
                    value={props.stats?.cancelled}
                  />
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <Statistic
                    title="Total Shipped"
                    value={props.stats?.shipped}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.get_all,
    stats: state.orders.stats,
  };
};

export default connect(mapStateToProps, orderActions)(OrdersComponent);
