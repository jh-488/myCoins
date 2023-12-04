import React, { useState, useEffect } from "react";
import Coin from "../../components/Coin";
import "./Home.css";
import { Link } from "react-router-dom";
import CoinInfo from "../coinInfo/CoinInfo";
import axios from "axios";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(10);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rows}&page=1&sparkline=false&locale=en`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rows]);

  return (
    <>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="container">
          <div className="rows-select-wrapper">
            <label htmlFor="rows-select">Rows:</label>
            <select 
              id="rows-select" 
              className="rows-select"
              value={rows}
              onChange={(e) => setRows(e.target.value)}  
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="title grid6">
            <p>#</p>
            <p>Coin</p>
            <p>Price</p>
            <p>24H</p>
            <p className="hide-mobile">Volume</p>
            <p className="hide-mobile">Market Cap</p>
          </div>

          {coins.map((coin) => {
            return (
              <Link
                to={`/mycoins/coin/${coin.id}`}
                element={<CoinInfo />}
                key={coin.id}
              >
                <Coin coin={coin} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
