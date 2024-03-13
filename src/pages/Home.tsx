import { useEffect, useState } from "react";
import { colors } from "theme";
import { Category } from "types/category";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "services/firebase";
import { ItemInfo } from "types/item";

const Home = () => {
  const [category, setCategory] = useState<Category>("영양제 및 보조제");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;

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
    };

    fetchData();
  }, [category]); // Dependency array to re-run the effect if the documentId changes

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: colors.primary,
        color: colors.text,
      }}
    ></div>
  );
};

export default Home;
