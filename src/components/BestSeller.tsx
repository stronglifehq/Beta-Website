import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firebase";
import { ItemInfo } from "types/item";
import ItemList from "./Item/ItemList";

const BestSeller = () => {
  const [items, setItems] = useState<ItemInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsRef = collection(db, "items");

      const q = query(itemsRef, where("tag", "==", "Best"));

      const querySnapshot = await getDocs(q);

      const items: ItemInfo[] = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as ItemInfo);
        });
      } else {
        console.log("No items found in this category!");
      }
      console.log(items);

      setItems(items);
    };

    fetchData();
  }, []);

  return <ItemList items={items} />;
};

export default BestSeller;
