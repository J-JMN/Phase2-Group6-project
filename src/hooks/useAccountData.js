import { useState, useEffect } from "react";
import { API_URL } from "../constants/utility";

const useAccountData = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/accounts/1`);
        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, []); 

  return { account, setAccount };
};

export default useAccountData;


