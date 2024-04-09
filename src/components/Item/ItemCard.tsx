import { Rate } from "antd";
import { colors } from "theme";
import { ItemInfo } from "types/item";
import { formatPrice } from "utils/price";
import { useLocation } from "wouter";
import Typography from "../common/Typography";

const ItemCard = ({ item, mode }: { item: ItemInfo; mode?: string }) => {
  const [_, setLocation] = useLocation();
  return (
    <div
      css={{
        boxSizing: "border-box",
        fontSize: "16px",
      }}
      onClick={() => setLocation(`/item/${item.id}`)}
    >
      <img
        src={item.images[0]}
        alt={item.title}
        css={{
          width: "100%",
          objectFit: "contain",
          aspectRatio: "3/4",
          backgroundColor: "#EEE",
        }}
      />
      <Rate
        disabled
        allowHalf
        defaultValue={item.rating / 20}
        style={{
          marginTop: "8px",
          color: colors.secondary,
          transform: "scale(0.6)",
          transformOrigin: "left center",
        }}
      />
      <Typography
        s={{
          boxSizing: "border-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
        fw="semi-bold"
        fs={16}
      >
        {item.title}
      </Typography>
      {mode === "arrivals" && (
        <Typography fw="semi-bold" fs={16}>
          {formatPrice(item.options.attributes[item.selected_option].price)}
        </Typography>
      )}
    </div>
  );
};

export default ItemCard;
