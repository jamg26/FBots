import React from "react";
import IconFont from "../icon";
import { Button, Space, Popconfirm, Typography, Table, Tooltip } from "antd";

const { Text } = Typography;

const FacebookTable = (props) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => props.editPage(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>

          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => props.deletePage(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Page ID",
      dataIndex: "pageid",
      key: "pageid",
      render: (text) => <Text copyable>{text}</Text>,
    },
    {
      title: "Page Name",
      dataIndex: "pagename",
      key: "pagename",
      responsive: ["md"],
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page Token",
      dataIndex: "pagetoken",
      key: "pagetoken",
      responsive: ["md"],
      render: (text) => (
        <Tooltip title={text}>
          <Text>...{text.slice(-10)}</Text>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      {" "}
      <Table
        title={() => (
          <Space>
            <Button onClick={props.addPage}>
              <IconFont type="icon-add_database" />
            </Button>
          </Space>
        )}
        columns={columns}
        dataSource={props.pages}
        rowKey="_id"
        size="small"
        style={{ padding: 10 }}
      />
    </>
  );
};

export default FacebookTable;
