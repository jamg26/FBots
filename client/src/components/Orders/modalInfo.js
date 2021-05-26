import { Modal, Popconfirm, Button, Space, Typography, Image } from "antd";

const { Text } = Typography;

const ModalOrderInfo = (props) => {
  return (
    <>
      <Modal
        title="Order Information"
        visible={props.infoVisible}
        onOk={props.handleOkInfo}
        onCancel={props.handleOkInfo}
        footer={
          <>
            <div style={{ float: "left" }}>
              {props.info?.status === "NOT_PAID" ? (
                <>
                  <Popconfirm
                    title="You sure you want to mark as paid?"
                    onConfirm={() => props.markAsPaid(props.info)}
                  >
                    <Button>Mark as paid</Button>
                  </Popconfirm>
                  <Popconfirm
                    title="You sure you want to mark as cancelled?"
                    onConfirm={() => props.markAsCancelled(props.info)}
                  >
                    <Button danger>Cancel</Button>
                  </Popconfirm>
                </>
              ) : props.info?.status === "PAID" ? (
                <Popconfirm
                  title="You sure you want to mark as shipped?"
                  onConfirm={() => props.markAsShipped(props.info)}
                  disabled={props.info?.address ? false : true}
                >
                  <Button disabled={props.info?.address ? false : true}>
                    Mark as shipped
                  </Button>
                </Popconfirm>
              ) : null}
            </div>
            <Space>
              <Button onClick={() => props.addAddress(props.info)}>
                Edit Address
              </Button>
              {/* <Button onClick={handleOkInfo}>OK</Button> */}
            </Space>
          </>
        }
      >
        <Space direction="vertical">
          <Text>
            Order ID: #<Text copyable>{props.info?._id}</Text>
          </Text>
          <Text>
            Page:{" "}
            <Text>
              <Text strong>{props.info?.page_name}</Text>
            </Text>
          </Text>
          <Text>Ordered By: {props.info?.order_by}</Text>
          <Text>
            Ordered Date:{" "}
            {new Date(props.info?.createdAt).toLocaleString("en-US", {
              hour12: true,
            })}
          </Text>
          <Text>Status: {props.info?.status}</Text>
          <Text>Amount: {props.info?.price.toFixed(2)}</Text>
          <Text>Product: {props.info?.product}</Text>
          <Image width={70} height={70} src={props.info?.product_image} />

          <Text>
            Contact: <Text type="danger">{props.info?.contact}</Text>
          </Text>
          <Text>Shipping Address: {props.info?.address}</Text>
        </Space>
      </Modal>
    </>
  );
};

export default ModalOrderInfo;
