import { Table, Space, Button, Typography, Popconfirm } from "antd";
import IconFont from "../icon";

const { Text } = Typography;

const CustomerTable = (props) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => props.removeCustomer(text)}
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
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page",
      dataIndex: "page",
      key: "page",
      render: (text) => <Text>{text.pagename}</Text>,
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Text>
          {new Date(text).toLocaleString("en-US", {
            hour12: true,
          })}
        </Text>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.customers}
        loading={props.customers ? false : true}
        rowKey="_id"
        size="small"
      />
    </>
  );
};

export default CustomerTable;
