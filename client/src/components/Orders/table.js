import {
  Typography,
  Table,
  Button,
  Space,
  Popconfirm,
  Divider,
  Input,
  Popover,
  DatePicker,
} from "antd";
import IconFont from "../icon";
import PrintOrder from "./printOrders";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const OrderTable = (props) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              props.setInfoVisible(true);
              props.setInfo(record);
            }}
          >
            <IconFont type="icon-icon-test" />
          </Button>
          <Popconfirm
            title="You sure you want to remove?"
            onConfirm={() => props.removeOrder(record)}
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
      title: "Name",
      dataIndex: "order_by",
      key: "order_by",
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
    <Table
      title={() => (
        <>
          <Space>
            <Input
              placeholder="Search"
              onChange={(e) => props.setSearch(e.target.value)}
              allowClear
            />
            <Button onClick={props.searchOrder}>
              <IconFont type="icon-search" />
            </Button>
            <Divider type="vertical" />
            <PrintOrder
              orders={props.orders}
              stats={props.stats}
              icon={<IconFont type="icon-print" />}
            />
            <Popover
              content={
                <RangePicker size="small" onChange={props.dateChangeHandler} />
              }
              title="Select Date Range"
            >
              <Button>
                <IconFont type="icon-ziyuan" />
              </Button>
            </Popover>
          </Space>
        </>
      )}
      columns={columns}
      dataSource={props.orders}
      loading={props.orders ? false : true}
      rowKey="_id"
      size="small"
    />
  );
};
export default OrderTable;
