import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PageOne from "./pages/Trends";
import PageTwo from "./pages/About";
import PageThree from "./pages/Scan";
import Card from "./components/ui/Card";
import Layout from "./components/layout/Layout";

// Date Picker Dependencies
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Trends" element={<PageOne />} />
            <Route path="/About" element={<PageTwo />} />
            <Route path="/Scan" element={<PageThree />} />
          </Routes>
        </div>
      </Layout>
    </LocalizationProvider>
  );
}

export default App;
