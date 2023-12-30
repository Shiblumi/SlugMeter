import "../styles/index.css";

// Date Picker Dependencies
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MainPage from "./MainPage";
// Next.js components
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MainPage/>
    </LocalizationProvider>
  );
}

export default MyApp;