import React, { useEffect, useState } from "react";
import usePUT from "../hooks/usePUT";
import SettingsForm from "../components/SettingsForm";
import MemberManager from "../components/MemberManager";

export default function SettingsPage() {
  const [account, setAccount] = useState(null);
  const { putData, loading, error } = usePUT("http://localhost:3000/account");

  // Fetch account data from db.json
  useEffect(() => {
    fetch("http://localhost:3000/account")
      .then((res) => res.json())
      .then((data) => {
        setAccount({
          accountName: data.accountName,
          accountPassword: data.accountPassword,
          members: data.members,
        });
      })
      .catch((err) => {
        console.error("Error fetching account data:", err);
      });
  }, []);

  if (!account) return <p>Loading...</p>;
  if (loading) return <p>Saving...</p>;
  if (error) return <p>Error saving settings.</p>;

  const saveAccount = async (updatedFields) => {
    const updated = {
      accountName: updatedFields.accountName ?? account.accountName,
      accountPassword: updatedFields.accountPassword ?? account.accountPassword,
      members: updatedFields.members ?? account.members,
    };
    setAccount(updated);
    await putData({
      accountName: updated.accountName,
      accountPassword: updated.accountPassword,
      members: updated.members,
    });
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
            accountName: account.accountName,
            accountPassword: account.accountPassword,
          }}
          onSubmit={({ accountName, accountPassword }) =>
            saveAccount({ accountName, accountPassword })
          }
        />

        <MemberManager
          members={account.members}
          onChange={(members) => saveAccount({ members })}
        />
      </div>
    </div>
  );
}



