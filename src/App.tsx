import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import { footerLinks, sitemap } from "./data.ts";
import Page from "./pages/Page/Page.tsx";
import Home from "./pages/Home/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<Home />}
          />
          {sitemap.slice(1).map((pageName, idx) => (
            <Route
              key={idx}
              path={pageName}
              element={
                <Page>
                  <div>{pageName} page</div>
                </Page>
              }
            />
          ))}
          {footerLinks.filter((link) => link !== "sitemap").map((link, idx) => (
            <Route
              key={idx}
              path={link}
              element={
                <Page>
                  <div>{link} page</div>
                </Page>
              }
            />

          ))}
          <Route
            path="*"
            element={
              <Page>
                <div>page not found</div>
              </Page>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;