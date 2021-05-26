import { Table, Space, Button, Typography, Popconfirm, Tag } from "antd";
import IconFont from "../icon";

const { Text } = Typography;

const ProductTable = (props) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => props.editProduct(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => props.deleteProduct(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Name",
      render: (text) => (
        <Text delete={text.enabled === false ? true : false}>
          {text.name.slice(0, 20)}
          {text.name[21] ? "..." : ""}
        </Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (text) => (
        <Text code type="danger">
          {text.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
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

  return (
    <>
      <Table
        title={() => (
          <Button onClick={props.addProductButton}>
            <IconFont type="icon-add_database" />
          </Button>
        )}
        columns={columns}
        dataSource={props.products}
        loading={props.products ? false : true}
        rowKey="_id"
        scroll={{ x: "100%" }}
        size="small"
      />
    </>
  );
};

export default ProductTable;
