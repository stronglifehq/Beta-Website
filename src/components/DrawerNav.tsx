import logo from "assets/logo.svg";
import { Drawer, Input, Menu, MenuProps, Space } from "antd";
import { useRecoilState } from "recoil";
import { isDrawer } from "atom/drawer";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "wouter";

type MenuItem = Required<MenuProps>["items"][number];

const DrawerNav = () => {
  const [open, setOpen] = useRecoilState(isDrawer);
  const [location, setLocation] = useLocation();

  const onClose = () => {
    setOpen(null);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setLocation(e.key);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    getItem("Home", "/"),

    { type: "divider" },

    getItem("Product", "prod", null, [
      getItem("영양제 및 보조제", "/prod/1"),
      getItem("헬스용품", "/prod/2"),
      getItem("여성 의류", "/prod/3"),
      getItem("남성 의류", "/prod/4"),
    ]),

    { type: "divider" },

    getItem("Contact Us", "/contact"),
  ];

  return (
    <Drawer
      placement="left"
      width="calc(100% - 32px)"
      onClose={onClose}
      open={open === "menu"}
      extra={
        <Space>
          <img src={logo} alt="logo" />
        </Space>
      }
    >
      <Input
        placeholder="검색"
        prefix={<SearchOutlined className="site-form-item-icon" />}
        css={{
          height: "46px",
          fontSize: "16px",
          marginBottom: "16px",
        }}
      />
      <Menu
        onClick={onClick}
        style={{ width: "1" }}
        selectedKeys={[location]}
        mode="inline"
        items={items}
      />
    </Drawer>
  );
};

export default DrawerNav;
