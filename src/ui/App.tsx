import React, { useEffect, useState } from "react";
import { getData, setData } from "@/utils/common";
import styles from "./app.module.less";

const App = () => {
  const [mockData, setMockData] = useState("");

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.optionsContainer}>
      <h1>API Mock Extension Options</h1>
      <textarea
        value={mockData}
        onChange={(e) => setMockData(e.target.value)}
        className={styles.textarea}
      ></textarea>
      <button onClick={handleSave} className={styles.button}>
        Save
      </button>
    </div>
  );
};

export default App;
