import { useLocalStorage } from "@uidotdev/usehooks";
import { ItemInfo } from "types/item";

type WishlistItem = {
  item: ItemInfo;
  quantity: number;
};

const useWishlist = () => {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(
    "wishlist",
    []
  );

  const addToWishlist = (item: ItemInfo, quantity: number) => {
    const existingItem = wishlist.find(
      (wishlistItem) => wishlistItem.item.id === item.id
    );

    if (existingItem) {
      const updatedWishlist = wishlist.map((wishlistItem) => {
        if (wishlistItem === existingItem) {
          return {
            ...wishlistItem,
            quantity: wishlistItem.quantity + quantity,
          };
        }
        return wishlistItem;
      });

      setWishlist(updatedWishlist);
    } else {
      const newWishlistItem: WishlistItem = {
        item,
        quantity,
      };

      setWishlist([...wishlist, newWishlistItem]);
    }
  };

  const modifyWishlist = (item: ItemInfo, quantity: number) => {
    const updatedWishlist = wishlist
      .map((wishlistItem) => {
        if (wishlistItem.item.id === item.id) {
          const newQuantity = quantity;
          if (newQuantity <= 0) {
            return null; // Remove item from wishlist
          }
          return {
            ...wishlistItem,
            quantity: newQuantity,
          };
        }
        return wishlistItem;
      })
      .filter(Boolean) as WishlistItem[]; // Remove null values from the wishlist
    setWishlist(updatedWishlist);
  };

  return {
    wishlist,
    addToWishlist,
    modifyWishlist,
  };
};

export default useWishlist;
