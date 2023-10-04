import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./components/Layout";
import SumToNPage from "./components/SumToN";
import WalletPage from "./components/WalletPage";
import FancyFormPage from "./components/fancy-form";
import HomePage from "./components/home-page";

function App() {
    return (
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/three-ways-sum-to-n" element={<SumToNPage />} />
                <Route path="/fancy-form" element={<FancyFormPage />} />
                <Route path="/messy-react" element={<WalletPage />} />
            </Routes>
        </DefaultLayout>
    );
}

export default App;
