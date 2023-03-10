import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [USDChange, setUSDChange] = useState("");
  const [myMoney, seyMyMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    setUSDChange(event.target.value);
  };

  const CoinPrice = (event) => {
    seyMyMoney(event.target.value);
  };
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        The Coins! ({loading ? "" : coins.length})
      </h1>

      <div className={styles.contain}>
        <div className={styles.change}>
          <input
            onChange={onChange}
            type="number"
            placeholder="How many daller"
            value={USDChange}
          ></input>
          <h1 className={styles.USDPrice}>
            {(USDChange * 0.000045).toFixed(6)} BTC
          </h1>
        </div>

        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={CoinPrice} className={styles.select}>
            <option>Select coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
        )}

        <div className={styles.BTC}>
          You can buy <b />{" "}
          <i className={styles.BTC_price}>{USDChange / myMoney}.</i>
        </div>
      </div>
    </div>
  );
}

export default App;
