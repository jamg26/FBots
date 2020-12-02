import React, { useState, useEffect } from "react";
import requireAuth from "./requireAuth";
import { Layout, Menu, Breadcrumb, PageHeader, Button, Typography } from "antd";
import Products from "./Products/";
import Categories from "./Categories/";
import Settings from "./Settings/";
import Automate from "./automate/";
import Users from "./Users";
import Orders from "./Orders/";
import IconFont from "./icon";
import { connect } from "react-redux";
import * as settingsActions from "../actions/settings";

const { Content, Sider } = Layout;
const { Text } = Typography;

const Home = (props) => {
  const [nav, setNav] = useState("products");

  useEffect(() => {
    props.getSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.title = props.settings?.pageName
      ? `${props.settings?.pageName} Control Panel`
      : "FBOTS";
  }, [props.settings]);

  const navigate = (value) => {
    const { key } = value;
    setNav(key);
  };

  return (
    <Layout className="layout">
      <div className="logo" />
      <PageHeader
        className="site-page-header"
        title={
          <Text style={{ color: "rgb(238, 14, 81)" }}>
            {props.settings?.pageName ? props.settings?.pageName : ""} Control
            Panel
          </Text>
        }
        avatar={{
          shape: "square",
          size: "large",
          alt: "logo",
          src: props.settings?.logo_url,
        }}
        extra={[
          <Button
            key="signout"
            danger
            onClick={() => props.history.push("/signout")}
          >
            Sign Out
          </Button>,
        ]}
      />
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          //collapsible
          breakpoint="md"
        >
          <Menu
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["products"]}
            onClick={navigate}
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
            {/* <Menu.Item key="users" icon={<IconFont type="icon-UserSettings" />}>
              Users
            </Menu.Item> */}
            <Menu.Item key="settings" icon={<IconFont type="icon-settings" />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 10px 10px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{nav}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              //padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {nav === "products" ? (
              <Products />
            ) : nav === "categories" ? (
              <Categories />
            ) : nav === "settings" ? (
              <Settings />
            ) : nav === "automate" ? (
              <Automate />
            ) : nav === "orders" ? (
              <Orders />
            ) : nav === "users" ? (
              <Users />
            ) : null}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings.get,
  };
};

export default connect(mapStateToProps, settingsActions)(requireAuth(Home));
