import React from "react";
import { Layout, Menu } from "antd";
import IconFont from "../icon";

const { Sider } = Layout;

const SiderComponent = (props) => {
  return (
    <Sider
      width={200}
      className="site-layout-background"
      //collapsible
      // breakpoint="lg"
      style={{
        display: props.drawer ? "" : props.width <= 991 ? "none" : "",
      }}
    >
      <Menu
        defaultOpenKeys={["products"]}
        style={{ height: "100%", borderRight: 0 }}
        defaultSelectedKeys={["products"]}
        onClick={props.navigate}
      >
        <Menu.Item key="products" icon={<IconFont type="icon-product" />}>
          Products
        </Menu.Item>
        <Menu.Item
          key="categories"
          icon={<IconFont type="icon-category-item-select" />}
        >
          Categories
        </Menu.Item>
        <Menu.Item
          key="automate"
          icon={<IconFont type="icon-AUTOMATEDPLANNING" />}
        >
          Automated Response
        </Menu.Item>
        <Menu.Item key="orders" icon={<IconFont type="icon-Orders" />}>
          Orders
        </Menu.Item>
        <Menu.Item key="customers" icon={<IconFont type="icon-customer1" />}>
          Customers
        </Menu.Item>
        {/* <Menu.Item key="users" icon={<IconFont type="icon-UserSettings" />}>
          Users
        </Menu.Item> */}
        <Menu.Item key="settings" icon={<IconFont type="icon-settings" />}>
          Settings
        </Menu.Item>

        <Menu.Item key="sign_out" icon={<IconFont type="icon-sign_out" />}>
          Sign Out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderComponent;
