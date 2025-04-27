import React from "react";
import { useAuth } from "../components/Auth/AuthContext";
import useSettingsData from "../hooks/useSettingsData";
import SettingsForm from "../components/SettingsForm";
import CategoryManager from "../components/CategoryManager";
import MemberManager from "../components/MemberManager";
import { ToastContainer, toast } from "react-toastify";

export default function SettingsPage() {
  const { logout } = useAuth();
  const { settings, updateSettings } = useSettingsData();

  // if (!isAuthenticated) {
  //   return (
  //     <div className="d-flex flex-column align-items-center mt-5">
  //       <h2>You must log in to view Settings</h2>
  //       <button className="btn btn-primary mt-3" onClick={login}>
  //         Log In
  //       </button>
  //     </div>
  //   );
  // }

  if (!settings) return <p>Loading...</p>;

  const handleFormSubmit = (values) => {
    updateSettings({
      ...settings,
      accountName: values.accountName,
      accountPassword: values.accountPassword,
    });
    toast.success("Settings updated!");
  };

  return (
    <div className="d-flex w-md-50 m-auto justify-content-center align-items-center h-100">
      <div className="d-flex flex-column rounded w-md-50 bg-white" style={{ padding: "32px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="display-6 custom-text-color-primary fw-bold mb-0">
            Settings
          </h3>
          <button className="btn btn-sm btn-outline-secondary" onClick={logout}>
            Log Out
          </button>
        </div>

        <SettingsForm
          initialValues={{
            accountName: settings?.accountName,
            accountPassword: settings?.accountPassword,
          }}
          onSubmit={handleFormSubmit}
        />

        <CategoryManager
          categories={settings?.categories}
          onChange={(cats) => updateSettings({ ...settings, categories: cats })}
        />

        <MemberManager
          members={settings?.members}
          onChange={(mems) => updateSettings({ ...settings, members: mems })}
        />

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}



