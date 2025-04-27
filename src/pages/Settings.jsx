import React from "react";
import useSettingsData from "../hooks/useSettingsData";
import SettingsForm from "../components/SettingsForm";
import MemberManager from "../components/MemberManager";
import CategoryManager from "../components/CategoryManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettingsData();
  if (!settings) return <p>Loading...</p>;

  const handleFormSubmit = (values) => {
    updateSettings({
      ...settings,
      accountName: values.accountName,
      accountPassword: values.accountPassword,
    });
  };

  return (
    <div className="d-flex w-md-50 m-auto justify-content-center align-items-center h-100">
      <div className="d-flex flex-column rounded w-md-50 custom-bg-base" style={{ padding: "32px" }}>
        <h3 className="display-6 custom-text-color-primary fw-bold mb-4 text-center">
          Settings
        </h3>

        <SettingsForm
          initialValues={{
            accountName: settings.accountName,
            accountPassword: settings.accountPassword,
          }}
          onSubmit={handleFormSubmit}
        />

        <CategoryManager
          categories={settings.categories}
          onChange={(cats) => updateSettings({ ...settings, categories: cats })}
        />

        <MemberManager
          members={settings.members}
          onChange={(mems) => updateSettings({ ...settings, members: mems })}
        />

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

