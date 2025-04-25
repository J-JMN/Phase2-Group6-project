import React from "react";
import useLocalSettings from "../hooks/useLocalSettings";
import SettingsForm from "../components/SettingsForm";
import CategoryManager from "../components/CategoryManager";
import MemberManager from "../components/MemberManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingsPage = () => {
  const { settings, saveSettings } = useLocalSettings();

  const handleSubmit = (values) => {
    const updated = {
      accountName: values.accountName,
      accountPassword: values.accountPassword,
      categories: settings.categories,
      members: settings.members,
    };
    saveSettings(updated);
  };

  return (
    <div className="d-flex w-md-50 m-auto justify-content-center align-items-center h-100">
      <div
        className="d-flex flex-column rounded w-md-50 custom-bg-base"
        style={{ padding: "32px" }}
      >
        <div className="text-align-center d-flex flex-column align-items-center justify-content-center w-100 my-4">
          <h3 className="display-6 custom-text-color-primary fw-bold mb-4">
            Settings
          </h3>
        </div>

        <SettingsForm
          initialValues={{
            accountName: settings.accountName,
            accountPassword: settings.accountPassword,
          }}
          onSubmit={handleSubmit}
        />

        <CategoryManager
          categories={settings.categories}
          setCategories={(cats) =>
            saveSettings({ ...settings, categories: cats })
          }
        />

        <MemberManager
          members={settings.members}
          setMembers={(mems) =>
            saveSettings({ ...settings, members: mems })
          }
        />

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default SettingsPage;
