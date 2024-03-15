import { Carousel } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firebase";
import { ItemInfo } from "types/item";
import ItemCard from "./ItemCard";
import { css } from "@emotion/react";

const NewArrivals = () => {
  const arrivals = [
    "9pGXLvCv6tKiaUWIVbGw",
    "SL55vGPdD2l3XMRbarHQ",
    "oS6GMpLn6xWWdugnkRp1",
    "dtWKC1asQNu3ntPCdJXf",
    "lK2X1DgLPBztesQQyU16",
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

  return (
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
  );
};

export default NewArrivals;
