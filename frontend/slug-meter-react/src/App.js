import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import MainPage from "./pages/MainPage";
import PageOne from "./pages/Trends";
import PageTwo from "./pages/About";
import PageThree from "./pages/Data";
import Card from "./components/ui/Card";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Trends" element={<PageOne />} />
          <Route path="/About" element={<PageTwo />} />
          <Route path="/Data" element={<PageThree />} />
          {/* <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> */}
        </Routes>
        <Card>
          <p
            style={{
              textAlign: "center",
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
