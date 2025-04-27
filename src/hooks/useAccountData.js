import { useState, useEffect } from "react";

const useAccountData = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch("http://localhost:3000/account");
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


