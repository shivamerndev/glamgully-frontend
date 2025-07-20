import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductContext from "./context/ProductContext.jsx";
import AdminContext from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <AdminContext>
    <ProductContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductContext>
  </AdminContext>
);
