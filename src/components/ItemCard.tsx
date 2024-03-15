import { Rate } from "antd";
import { colors } from "theme";
import { ItemInfo } from "types/item";
import { formatPrice } from "utils/price";
import { useLocation } from "wouter";

const ItemCard = ({ item, mode }: { item: ItemInfo; mode?: string }) => {
  const [_, setLocation] = useLocation();
  return (
    <div
      css={{
        boxSizing: "border-box",
        fontSize: "16px",
        // width: "fit-content",
      }}
      onClick={() => setLocation(`/item/${item.id}`)}
    >
      <img
        src={item.images[0]}
        alt={item.title}
        css={{
          width: "100%",
          objectFit: "cover",
        }}
      />
      <Rate
        disabled
        allowHalf
        defaultValue={item.rating / 20}
        style={{
          marginTop: "8px",
          color: colors.secondary,
          transform: "scale(0.75)",
          transformOrigin: "left center",
        }}
      />
      <div
        css={{
          boxSizing: "border-box",
          fontWeight: "bold",
          fontSize: "16px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {item.title}
      </div>
      {mode === "arrivals" && (
        <div
          css={{
            color: colors.secondary,
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {formatPrice(item.options.attributes[item.selected_option].price)}
        </div>
      )}
    </div>
  );
};

export default ItemCard;
