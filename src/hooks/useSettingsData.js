import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SETTINGS_URL = "http://localhost:3000/settings";

const useSettingsData = () => {
  const [settings, setSettings] = useState({
    accountName: "",
    accountPassword: "",
    categories: [],
    members: [{ name: "You", role: "Owner" }],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(SETTINGS_URL);
      if (!res.ok) throw new Error("Failed to load settings");
      const data = await res.json();
      setSettings({
        accountName: data.accountName || "",
        accountPassword: data.accountPassword || "",
        categories: data.categories || [],
        members: data.members || [{ name: "You", role: "Owner" }],
      });
    } catch {
      toast.error("Error loading settings");
    }
  };

  const updateSettings = async (payload) => {
    try {
      const res = await fetch(SETTINGS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Error saving settings");
    }
  };

  return { settings, setSettings, updateSettings };
};

export default useSettingsData;
