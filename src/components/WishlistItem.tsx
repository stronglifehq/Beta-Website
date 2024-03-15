import { Divider } from "antd";
import { ItemInfo } from "types/item";
import NumericInput from "./NumericInput";
import { CloseOutlined } from "@ant-design/icons";
import { colors } from "theme";
import { formatPrice, getPrice } from "utils/price";

type Props = {
  item: ItemInfo;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const WishlistItem = ({ item, quantity, setQuantity }: Props) => {
  return (
    <>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          color: colors.text,
          width: "100%",
          gap: "16px",
        }}
      >
        <img src={item.images[0]} alt={item.title} css={{ width: "80px" }} />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            <div
              css={{
                fontSize: "18px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "150px",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </div>
            <CloseOutlined />
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            <NumericInput count={quantity} setCount={setQuantity} />
            <div
              css={{
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {formatPrice(getPrice(item) * quantity)} 원
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default WishlistItem;
