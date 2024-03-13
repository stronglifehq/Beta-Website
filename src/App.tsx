import Footer from "components/Footer";
import Header from "components/Header";
import DrawerNav from "pages/DrawerNav";
import Home from "pages/Home";
import Item from "pages/Item";
import Prod from "pages/Prod";
import { Route } from "wouter";

function App() {
  return (
    <div>
      <DrawerNav />
      <Header mode="light" />
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
