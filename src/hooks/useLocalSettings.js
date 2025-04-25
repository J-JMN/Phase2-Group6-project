import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const STORAGE_KEY = "appSettings";
const DEFAULT = {
  accountName: "",
  accountPassword: "",
  categories: [],
  members: [{ name: "You", role: "Owner" }],
};

export default function useLocalSettings() {
  const [settings, setSettings] = useState(DEFAULT);

  useEffect(() => {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
      try {
        setSettings(JSON.parse(json));
      } catch {
        toast.error("Corrupt settings, reset to defaults");
        setSettings(DEFAULT);
      }
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  return { settings, saveSettings };
}
