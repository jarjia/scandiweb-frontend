import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { categories } from "./helpers/consts";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to={categories[0]} />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/product/:product_id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
