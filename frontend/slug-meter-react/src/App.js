import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import MainPage from "./pages/MainPage";
import PageOne from "./pages/page-one";
import PageTwo from "./pages/page-two";

function App() {
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/page-one" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        {/* <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
