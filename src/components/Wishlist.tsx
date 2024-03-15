import { Button, Drawer } from "antd";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDrawer } from "atom/drawer";
import useWishlist from "hooks/useWishlist";
import WishlistItem from "./WishlistItem";
import { ItemInfo } from "types/item";
import { colors } from "theme";
import { formatPrice, getTotalPrice } from "utils/price";
import { modal } from "atom/modal";

const Wishlist = () => {
  const [open, setOpen] = useRecoilState(isDrawer);
  const { wishlist, modifyWishlist } = useWishlist();
  const setModal = useSetRecoilState(modal);

  const onClose = () => {
    setOpen(null);
  };

  const handleSetQuantity = (item: ItemInfo, quantity: number) => {
    modifyWishlist(item, quantity);
  };

  return (
    <Drawer
      placement="right"
      width="calc(100% - 32px)"
      onClose={onClose}
      open={open === "wishlist"}
      extra={
        <div
          css={{
            color: colors.text,
            fontSize: "34px",
          }}
        >
          Cart
        </div>
      }
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {wishlist.map(({ item, quantity }) => (
            <WishlistItem
              key={item.id}
              item={item}
              quantity={quantity}
              setQuantity={(q: number) => handleSetQuantity(item, q)}
            />
          ))}
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              color: colors.text,
              fontSize: "20px",
              fontWeight: "medium",
            }}
          >
            <span>Total</span>
            <span>{formatPrice(getTotalPrice(wishlist))} 원</span>
          </div>
          <Button
            type="primary"
            css={{
              backgroundColor: colors.secondary,
              width: "100%",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            onClick={() => {
              setModal({
                title: "",
                children: (
                  <span>
                    현재는 주문이 불가능한 제품입니다.
                    <br /> 빠른 시일 내에 개선하겠습니다.
                  </span>
                ),
                open: true,
              });
            }}
          >
            주문하기
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Wishlist;
