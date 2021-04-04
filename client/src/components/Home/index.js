import React, { useState, useEffect } from "react";
import requireAuth from "../requireAuth";
import {
  Layout,
  Breadcrumb,
  PageHeader,
  Typography,
  Drawer,
  Button,
} from "antd";
import Products from "../Products/";
import Categories from "../Categories/";
import Automate from "../automate/";
import Users from "../Users";
import Orders from "../Orders/";
import IconFont from "../icon";
import { connect } from "react-redux";
import * as settingsActions from "../../actions/settings";
import Logo from "../logo.png";
import Signout from "../Signout";
import Customers from "../Customer";
import SiderComponent from "./sider";
import BasicPanel from "../Settings/Basic";
import FacebookPanel from "../Settings/Facebook";
import StripePanel from "../Settings/Stripe";

const { Content } = Layout;
const { Text } = Typography;

const Home = (props) => {
  const [nav, setNav] = useState("products");
  const [width, setWidth] = useState(window.innerWidth);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (props.auth) props.getSettings();
    window.addEventListener("resize", updateDimensions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.title = props.settings?.pageName
      ? `${props.settings?.pageName} Control Panel`
      : "FBOTS";
  }, [props.settings]);

  const navigate = (value) => {
    const { key } = value;
    setDrawerVisible(false);
    setNav(key);
  };

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Layout className="layout">
        <div className="logo" />
        <PageHeader
          className="site-page-header"
          title={
            <Text
              style={{
                color: "rgb(238, 14, 81)",
                fontSize: props.settings?.pageName?.length >= 11 ? 14 : 20,
              }}
            >
              {props.settings?.pageName ? props.settings?.pageName : ""} Control
              Panel
            </Text>
          }
          avatar={{
            shape: "square",
            size: "large",
            style: { pointerEvents: "none" },
            alt: "logo",
            src: props.settings?.logo_url ? props.settings.logo_url : Logo,
          }}
          extra={
            <Button
              size="large"
              style={{
                display: width <= 991 ? "" : "none",
              }}
              onClick={showDrawer}
            >
              <IconFont type="icon--menu-" />
            </Button>
          }
        />
        <Layout>
          <SiderComponent width={width} navigate={navigate} />
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
              ) : nav === "automate" ? (
                <Automate />
              ) : nav === "orders" ? (
                <Orders />
              ) : nav === "customers" ? (
                <Customers />
              ) : nav === "users" ? (
                <Users />
              ) : nav === "sign_out" ? (
                <Signout />
              ) : nav === "basic" ? (
                <BasicPanel />
              ) : nav === "facebook" ? (
                <FacebookPanel />
              ) : nav === "stripe" ? (
                <StripePanel />
              ) : null}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Drawer
        title="Navigation"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerVisible}
        //key={placement}
      >
        <SiderComponent width={width} navigate={navigate} drawer={true} />
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings.get,
    auth: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, settingsActions)(requireAuth(Home));
