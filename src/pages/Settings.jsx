import React from "react";
import useSettingsData from "../hooks/useSettingsData"; 
import SettingsForm from "../components/SettingsForm"; 
import CategoryManager from "../components/CategoryManager"; 
import MemberManager from "../components/MemberManager"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const SettingsPage = () => {
  
  const { settings, setSettings, updateSettings } = useSettingsData();

  const handleSubmit = async (values) => {
    const payload = {
      accountName: values.accountName,
      accountPassword: values.accountPassword,
      categories: settings.categories,
      members: settings.members,
    };
    
    updateSettings(payload);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <SettingsForm
        initialValues={{
          accountName: settings.accountName,
          accountPassword: settings.accountPassword,
        }}
        onSubmit={handleSubmit}
      />
      
      <CategoryManager
        categories={settings.categories}
        setCategories={(cats) => setSettings({ ...settings, categories: cats })}
      />
      
      <MemberManager
        members={settings.members}
        setMembers={(mems) => setSettings({ ...settings, members: mems })}
      />
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SettingsPage;