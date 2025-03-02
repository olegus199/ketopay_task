import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import { pageNames } from "./data.ts";
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
          {pageNames.slice(1).map((pageName, idx) => (
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;