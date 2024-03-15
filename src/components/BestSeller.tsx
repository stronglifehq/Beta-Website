import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firebase";
import { ItemInfo } from "types/item";
import ItemList from "./ItemList";

const BestSeller = () => {
  const arrivals = [
    "XiWhrF8EigGfnDzlIK7V",
    "YRUOZMiEdOVupaffqdKD",
    "YktFzKBKNM4Q0GRYJsOw",
    "ZBcrRa43rYlZGyAeSI2g",
    "aZqsQhrKyomGAkNQzZAB",
    "biTxct86kFFnOqc33RAQ",
    "dHYUXYqrPYX2TOgBnzko",
    "deKwIQnluws5uTq4ixIu",
    "dtWKC1asQNu3ntPCdJXf",
    "fyR4JPlTgTotwX0xAsBZ",
    "iB701cGDo49okNPTzrIP",
    "iIlJOZ79mSZOi838vvwb",
    "jl7pQQGhgjB6PiKbwxqt",
    "kwehL7JJ7TexYK4B6uFC",
    "lK2X1DgLPBztesQQyU16",
    "lRkBsSyyiG4kBqDCJ8CG",
  ];
  const [items, setItems] = useState<ItemInfo[]>([]);

  useEffect(() => {
    const fetchItemsByIds = async (ids: string[]) => {
      try {
        const promises = ids.map((id) => {
          const docRef = doc(db, "items", id);
          return getDoc(docRef);
        });
        const snapshots = await Promise.all(promises);
        const items = snapshots
          .filter((snapshot) => snapshot.exists())
          .map(
            (snapshot) =>
              ({
                id: snapshot.id,
                ...snapshot.data(),
              } as ItemInfo)
          );
        setItems(items);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchItemsByIds(arrivals);
  }, []);

  return <ItemList items={items} />;
};

export default BestSeller;
