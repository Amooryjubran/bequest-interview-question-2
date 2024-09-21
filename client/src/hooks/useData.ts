import { useState, useEffect } from "react";
import {
  getStoredHash,
  setStoredHash,
  getBackupData,
  setBackupData,
} from "utils/storage";
import { computeHash } from "utils/hash";

const API_URL = "http://localhost:8080";

export const useData = () => {
  const [data, setData] = useState<string>("");
  const [storedHash, setStoredHashState] = useState<string>("");
  const [backupData, setBackupDataState] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchData();
    const hash = getStoredHash();
    if (hash) {
      setStoredHashState(hash);
    }
    const backup = getBackupData();
    if (backup) {
      setBackupDataState(backup);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const { data } = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateData = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const hash = await computeHash(data);
      setStoredHashState(hash);
      setStoredHash(hash);

      setBackupDataState(data);
      setBackupData(data);

      setMessage("Data updated and hash stored.");
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const verifyData = async () => {
    const currentHash = await computeHash(data);
    if (currentHash === storedHash) {
      setMessage("Data is valid and has not been tampered with.");
    } else {
      setMessage("Data has been tampered with!");
    }
  };

  const recoverData = async () => {
    if (backupData) {
      setData(backupData);
      await updateData();
      setMessage("Data has been restored from the backup.");
    } else {
      setMessage("No backup data available to recover.");
    }
  };

  const tamperData = async () => {
    try {
      await fetch(`${API_URL}/tamper`, {
        method: "POST",
      });
      await fetchData();
      setMessage("Data has been tampered with on the server!");
    } catch (error) {
      console.error("Error tampering data:", error);
    }
  };

  return {
    data,
    setData,
    message,
    updateData,
    verifyData,
    recoverData,
    tamperData,
  };
};
