import Footer from "components/Footer";
import Header from "components/Header";
import DrawerNav from "components/DrawerNav";
import Home from "pages/Home";
import Item from "pages/Item";
import Prod from "pages/Prod";
import { Route } from "wouter";
import Wishlist from "components/Wishlist";
import { ConfigProvider, Modal } from "antd";
import { colors } from "theme";
import { useRecoilState } from "recoil";
import { modal } from "atom/modal";
import Curation from "pages/Curation";

function App() {
  const [isModal, setIsModal] = useRecoilState(modal);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: colors.text,
          colorPrimary: colors.secondary,
          colorBgTextActive: colors.primary,
          colorPrimaryTextActive: colors.primary,
        },
      }}
    >
      <DrawerNav />
      <Wishlist />
      <Header />
      <div
        css={{
          position: "fixed",
          top: "60px",
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "scroll",
        }}
      >
        <Route path="/" component={Home} />
        <Route path="/item/:itemId" component={Item} />
        <Route path="/prod/:prodId" component={Prod} />
        <Route path="/curation" component={Curation} />
        <Footer />
      </div>
      <Modal
        title={isModal.title}
        open={isModal.open}
        onCancel={() =>
          setIsModal({
            ...isModal,
            open: false,
          })
        }
        onOk={() =>
          setIsModal({
            ...isModal,
            open: false,
          })
        }
        cancelButtonProps={{
          style: {
            backgroundColor: colors.primary,
            color: colors.text,
          },
        }}
        okButtonProps={{ style: { display: "none" } }}
        width={"calc(100vw - 64px)"}
        css={{ top: "30%", textAlign: "center" }}
      >
        <div
          css={{
            fontSize: "16px",
            fontWeight: "bold",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {isModal.children}
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default App;
