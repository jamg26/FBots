import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const columns = [
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
    title: "Page",
    dataIndex: "page_name",
    key: "page_name",
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: "Amount",
    dataIndex: "price",
    key: "price",
    render: (text) => <Text code>{text.toFixed(2)}</Text>,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
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

export default columns;
