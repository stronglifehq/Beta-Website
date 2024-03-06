import { colors } from "theme";
import logo from "assets/logo.svg";
import menu from "assets/menu.svg";
import shop from "assets/shop.svg";
type Props = {
  mode: "light" | "dark";
};

const Header = ({ mode }: Props) => {
  return (
    <div
      css={{
        background: mode === "light" ? colors.primary : colors.secondary,
        color: mode === "light" ? colors.text : colors.primary,
        padding: "0 20px",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        zIndex: 100,
      }}
    >
      <div>
        <img src={menu} alt="menu" />
        <img src={logo} alt="logo" />
      </div>
      <div>
        <img src={shop} alt="shop" />
      </div>
    </div>
  );
};

export default Header;
