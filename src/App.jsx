import React, { createContext, useState } from "react";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import CoinInfo from "./pages/coinInfo/CoinInfo";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="app" id={theme}>
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <Routes>
          <Route path="/mycoins" element={<Home />} />
          <Route path="/mycoins/coin/:coinId" element={<CoinInfo />} />
        </Routes>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App;
