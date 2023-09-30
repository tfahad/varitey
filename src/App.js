import "./App.css";
import "./MediaQuery.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Navbar/Layout";
import Product from "./Components/Product/Product";
import Home from "./Components/Home/Home";
import Kitchen from "./Components/Product/Kitchen/Kitchen";
import Cart from "./Components/Cart/Cart";
import { ShopContextProvider } from "./Components/Context/ShopContext";
import Dashpage from "./Components/Dashboard/Dashpage";
export const udetails = ['admin', '@MAINadmin123'];


function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Kitchen" element={<Kitchen />} />
            <Route path="/Cart" element={<Cart />} />
            </Route>
            <Route path="/Dashpage" element={<Dashpage/>}/>

        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
