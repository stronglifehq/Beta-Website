import { Carousel } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firebase";
import { ItemInfo } from "types/item";
import ItemCard from "./Item/ItemCard";
import Points from "./Points";

type NewArrivalsProps = {
  children?: React.ReactNode;
};

const NewArrivals = ({ children }: NewArrivalsProps) => {
  const [items, setItems] = useState<ItemInfo[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const itemsRef = collection(db, "items");

      const q = query(itemsRef, where("tag", "==", "New"));

      const querySnapshot = await getDocs(q);

      const items: ItemInfo[] = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as ItemInfo);
        });
      } else {
        console.log("No items found in this category!");
      }

      setItems(items);
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "calc(100% - 64px)",
        }}
      >
        {children}
        <Points length={items.length} index={index} />
      </div>
      <div
        css={{
          boxSizing: "border-box",
        }}
      >
        <Carousel
          css={{
            width: "200vw",
          }}
          slidesToShow={3}
          autoplay
          afterChange={(index) => setIndex(index)}
        >
          {items.map((item) => (
            <div
              css={{
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <ItemCard key={item.id} item={item} mode="arrivals" />
            </div>
          ))}
        </Carousel>
        <div>hello</div>
      </div>
    </>
  );
};

export default NewArrivals;
