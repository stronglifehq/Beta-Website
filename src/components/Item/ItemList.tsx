import { ItemInfo } from "types/item";
import ItemCard from "./ItemCard";

type Props = {
  items: ItemInfo[];
};

const ItemList = ({ items }: Props) => {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(2, calc(50% - 8px))",
        rowGap: "8px",
        columnGap: "16px",
        boxSizing: "border-box",
        width: "calc(100vw - 64px)",
      }}
    >
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
