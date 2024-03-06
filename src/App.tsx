import Footer from "components/Footer";
import Header from "components/Header";
import Item from "pages/Item";
import { Route } from "wouter";

function App() {
  return (
    <div>
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
        <Route path="/item/:itemId" component={Item} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
