import { ItemInfo } from "types/item";

const ItemCard = (props: ItemInfo) => {
  return (
    <div>
      <img src={props.images[0]} alt={props.title} />
      <div>{props.title}</div>
      <div>{props.options.attributes[props.selected_option].price}</div>
    </div>
  );
};

export default ItemCard;
