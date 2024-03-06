import Header from "components/Header";
import Item from "pages/Item";
import { Route } from "wouter";

function App() {
  return (
    <div>
      <Header mode="light" />
      <div>
        <Route path="/item/:itemId" component={Item} />
      </div>
    </div>
  );
}

export default App;
