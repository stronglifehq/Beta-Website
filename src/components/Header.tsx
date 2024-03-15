import { colors } from "theme";
import logo from "assets/logo.svg";
import logoDark from "assets/logo-dark.svg";
import shop from "assets/shop.svg";
import shopDark from "assets/shop-dark.svg";
import { useSetRecoilState } from "recoil";
import { isDrawer } from "atom/drawer";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "wouter";

const Header = () => {
  const setIsDrawer = useSetRecoilState(isDrawer);
  const [location, _] = useLocation();
  const isLightPath = ["/item/"];
  const mode = isLightPath.some((path) => location.startsWith(path))
    ? "light"
    : "dark";

  return (
    <div
      css={{
        background: mode === "light" ? colors.primary : colors.secondary,
        color: mode === "light" ? colors.text : colors.primary,
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        zIndex: 100,
      }}
    >
      <div
        css={{
          display: "flex",
          gap: "4px",
        }}
      >
        <MenuOutlined
          css={{
            width: "24px",
          }}
          color={mode === "light" ? "#FFF" : "#000"}
          onClick={() => {
            setIsDrawer("menu");
          }}
        />
        <img src={mode === "light" ? logo : logoDark} alt="logo" />
      </div>
      <div>
        <img
          src={mode === "light" ? shop : shopDark}
          alt="shop"
          onClick={() => {
            setIsDrawer("wishlist");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
