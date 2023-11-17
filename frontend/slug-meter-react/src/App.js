import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import MainPage from "./pages/MainPage";
import PageOne from "./pages/page-one";
import PageTwo from "./pages/page-two";
import Card from "./components/ui/Card";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/page-one" element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
          {/* <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> */}
        </Routes>
        <Card>
          <p
            style={{
              textAlign:"center",
              padding: "1rem",
            }}
          >
            A component with card-style css applied to it.
          </p>
        </Card>
      </div>
    </Layout>
  );
}

export default App;
