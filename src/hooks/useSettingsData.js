import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../constants/utility";

const SETTINGS_URL = `${API_URL}/api/accounts/1`;

export default function useSettingsData() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(SETTINGS_URL);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSettings(data);
      } catch {
        toast.error("Error loading settings");
      }
    })();
  }, []);

  const updateSettings = async (updated) => {
    try {
      const res = await fetch(SETTINGS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error();
      setSettings(updated);
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Error saving settings");
    }
  };

  return { settings, updateSettings };
}


