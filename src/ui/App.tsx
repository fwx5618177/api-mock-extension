import React, { useEffect, useState } from "react";
import { getData, setData } from "@/utils/common";
import styles from "./app.module.less";

const App = () => {
  const [mockData, setMockData] = useState("");
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState("");

  const fetchData = async () => {
    const data = await getData("mockData");
    if (data) {
      setMockData(data);
    }
  };

  const handleSave = async () => {
    await setData("mockData", mockData);
    console.log("Mock data saved");
  };

  const handleSendRequest = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.optionsContainer}>
      <h1>API Mock Manager</h1>
      <input
        type="text"
        placeholder="Enter URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={styles.input}
      />
      <textarea
        placeholder="Enter mock data here..."
        value={mockData}
        onChange={(e) => setMockData(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleSave} className={styles.button}>
        Save Mock Data
      </button>
      <button onClick={handleSendRequest} className={styles.button}>
        Test Request
      </button>
      {response && (
        <div className={styles.responseContainer}>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
