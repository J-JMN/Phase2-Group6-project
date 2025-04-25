import React, { useState } from "react";

const MemberManager = ({ members, setMembers }) => {
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    const name = newMember.trim();
    if (!name) return;
    if (members.find((m) => m.name.toLowerCase() === name.toLowerCase()))
      return;
    setMembers([...members, { name, role: "Member" }]);
    setNewMember("");
  };

  const removeMember = (index) => {
    if (members[index].role === "Owner") return;
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="my-4">
      <label className="form-label">Members</label>

      <div className="w-100">
        {members.map((member, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border p-2 rounded my-1"
          >
            <span>
              {member.name} - <strong>{member.role}</strong>
            </span>
            {member.role !== "Owner" && (
              <button
                type="button"
                className="btn btn-sm btn-secondary custom-bg-secondary"
                onClick={() => removeMember(index)}
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
          onClick={addMember}
        >
          Add Member
        </button>
      </div>
    </div>
  );
};

export default MemberManager;


