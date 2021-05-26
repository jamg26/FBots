import { Layout, Menu } from "antd";
import IconFont from "../icon";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent = (props) => {
  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{
        display: props.drawer ? "" : props.width <= 991 ? "none" : "",
      }}
    >
      <Menu
        defaultOpenKeys={["products"]}
        style={{ height: "100%", borderRight: 0 }}
        defaultSelectedKeys={["products"]}
        onClick={props.navigate}
        mode="inline"
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
        <SubMenu
          key="sub4"
          icon={<IconFont type="icon-settings" />}
          title="Settings"
        >
          <Menu.Item key="basic" icon={<IconFont type="icon-basic-info" />}>
            Basic
          </Menu.Item>
          <Menu.Item key="facebook" icon={<IconFont type="icon-facebook" />}>
            Facebook
          </Menu.Item>
          <Menu.Item
            key="stripe"
            icon={<IconFont type="icon-zhifupingtai-stripe" />}
          >
            Stripe
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="sign_out" icon={<IconFont type="icon-sign_out" />}>
          Sign Out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderComponent;
