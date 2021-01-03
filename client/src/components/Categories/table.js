import React from "react";
import { Table, Space, Button, Typography, Popconfirm } from "antd";
import IconFont from "../icon";

const { Text } = Typography;

const CategoriesTable = (props) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => props.editCategory(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => props.deleteCategory(record)}
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
  ];

  return (
    <>
      <Table
        title={() => (
          <Button onClick={props.addCategory}>
            <IconFont type="icon-add_database" />
          </Button>
        )}
        columns={columns}
        dataSource={props.categories}
        rowKey="_id"
        size="small"
      />
    </>
  );
};

export default CategoriesTable;
