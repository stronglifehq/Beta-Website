import ItemList from "components/ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firebase";
import { colors } from "theme";
import { ItemInfo } from "types/item";
import { useParams } from "wouter";

const Prod = () => {
  const { prodId } = useParams();

  const [items, setItems] = useState<ItemInfo[]>([]);

  useEffect(() => {
    const category = id2name(prodId);
    const fetchData = async () => {
      if (!category) return;

      console.log(category);

      const itemsRef = collection(db, "items");

      const q = query(itemsRef, where("category", "==", category));

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
  }, [prodId]); // Dependency array to re-run the effect if the documentId changes

  const id2name = (id: string | undefined) => {
    switch (id) {
      case "1":
        return "영양제 및 보조제";
      case "2":
        return "헬스용품";
      case "3":
        return "여성 의류";
      case "4":
        return "남성 의류";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: colors.text,
        width: "100vw",
        padding: "32px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        css={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        {id2name(prodId)}
      </div>
      <ItemList items={items} />
    </div>
  );
};

export default Prod;
