import { db } from "services/firebase"; // Assume you've initialized Firestore
import { Carousel, Rate, Divider, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { colors } from "theme";
import { formatPrice } from "utils/price";
import NumericInput from "components/NumericInput";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import EmailCollection from "components/EmailCollection";

type ItemInfo = {
  id: string;
  category: string;
  title: string;
  images: string[];
  price: number;
  details: string[];
  url: string;
  rating: number;
};

const Item = () => {
  const [item, setItem] = useState<ItemInfo>();

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "상세정보",
      children: (
        <>
          {item?.details.map((url, index) => (
            <img
              src={url}
              alt={item.title}
              key={index}
              css={{ width: "100%", objectFit: "cover" }}
            />
          ))}
        </>
      ),
    },
  ];

  const { itemId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (!itemId) return;
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() } as ItemInfo);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [itemId]); // Dependency array to re-run the effect if the documentId changes

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: colors.text,
        width: "100vw",
      }}
    >
      {item && (
        <div>
          <Carousel
            autoplay
            css={{
              margin: "16px  0",
              width: "calc(100vw - 64px)",
            }}
          >
            {item.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={item.title}
                  css={{ width: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              gap: "16px",
            }}
          >
            <Rate
              disabled
              allowHalf
              defaultValue={item.rating / 20}
              style={{
                color: colors.secondary,
                transform: "scale(0.75)",
                transformOrigin: "left center",
              }}
            />
            <div css={{ width: "calc(100vw - 64px)", fontSize: "30px" }}>
              {item.title}
            </div>
            <div css={{ fontSize: "20px", color: colors.textSecondary }}>
              {item.category}
            </div>
            <div css={{ fontSize: "30px" }}>{formatPrice(item.price)} 원</div>
          </div>
          <Divider />
          <div
            css={{
              margin: "16px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              gap: "16px",
            }}
          >
            <div
              css={{
                display: "flex",
                gap: "8px",
                fontSize: "14px",
                width: "calc(100vw - 64px)",
              }}
            >
              <NumericInput initialCount={1} />
              <Button icon={<HeartOutlined />} css={{ flexGrow: 1 }}>
                Whishlist
              </Button>
            </div>
            <Button
              type="primary"
              css={{
                backgroundColor: colors.secondary,
                width: "calc(100vw - 64px)",
                height: "32px",
              }}
            >
              공동구매 알림 신청하기
            </Button>
          </div>
          <Collapse
            items={items}
            ghost
            defaultActiveKey={["1"]}
            style={{
              width: "calc(100vw - 64px)",
              padding: 0,
              fontSize: "18px",
              marginBottom: "16px",
            }}
          />
        </div>
      )}
      {!item && <p>Loading...</p>}
      <EmailCollection />
    </div>
  );
};

export default Item;
