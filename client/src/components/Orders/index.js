import { useState, useEffect } from "react";
import { Modal, Form, Input, Tabs, Statistic, Card, Row, Col } from "antd";
import { connect } from "react-redux";
import * as orderActions from "../../actions/order";
import OrderTable from "./table";
import ModalOrderInfo from "./modalInfo";

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
    setInfoVisible(false);
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

  const dateChangeHandler = (date, dateString) => {
    if (date) props.getDateRange(date);
    if (!date) props.getOrders();
  };

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

      <ModalOrderInfo
        infoVisible={infoVisible}
        handleOkInfo={handleOkInfo}
        info={info}
        markAsPaid={markAsPaid}
        markAsCancelled={markAsCancelled}
        markAsShipped={markAsShipped}
        addAddress={addAddress}
      />

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Order List" key="1">
          <OrderTable
            orders={props.orders}
            setInfoVisible={setInfoVisible}
            setInfo={setInfo}
            removeOrder={removeOrder}
            setSearch={setSearch}
            searchOrder={searchOrder}
            stats={props.stats}
            dateChangeHandler={dateChangeHandler}
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
