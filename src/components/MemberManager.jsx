import React, { useState } from "react";

export default function MemberManager({ members, onChange }) {
  const [newMember, setNewMember] = useState("");

  const handleAdd = () => {
    const name = newMember.trim();
    if (!name) return;
    const updated = [...members, { name, role: "Member" }];
    onChange(updated);
    setNewMember("");
  };

  const handleRemove = (idx) => {
    const updated = members.filter((_, i) => i !== idx);
    onChange(updated);
  };

  return (
    <div className="my-4">
      <label className="form-label">Members</label>
      <div className="w-100">
        {members.map((member, i) => (
          <div
            key={i}
            className="d-flex flex-row justify-content-between w-100 align-items-center border p-1 rounded my-1"
          >
            <span>
              {member.name} - <strong>{member.role}</strong>
            </span>
            {member.role !== "Owner" && (
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="btn btn-sm btn-secondary custom-bg-secondary"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex mt-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add member name"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-sm btn-secondary custom-bg-secondary"
          onClick={handleAdd}
        >
          Add Member
        </button>
      </div>
    </div>
  );
}




