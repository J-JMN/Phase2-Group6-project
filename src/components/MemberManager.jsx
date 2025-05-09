import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../components/Auth/AuthContext"; 

export default function MemberManager({ members, onChange }) {
  const { user } = useAuth(); // Get current logged-in user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) {
      toast.warning("Name and Email are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    const alreadyExists = members.find((m) => m.email === email.trim());
    if (alreadyExists) {
      toast.error("Member with that email already exists");
      return;
    }

    const newMember = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      role,
    };
    const updatedMembers = [...members, newMember];
    onChange(updatedMembers);
    toast.success(`Member "${name.trim()}" added`);
    setName("");
    setEmail("");
    setRole("member");
  };

  const handleRemove = (id) => {
    const memberToRemove = members.find((m) => m.id === id);
    if (!memberToRemove) return;

    if (user?.role !== "owner") {
      toast.error("Only the owner can remove members");
      return;
    }

    if (memberToRemove.role === "owner") {
      toast.error("Cannot remove the owner");
      return;
    }

    const updatedMembers = members.filter((m) => m.id !== id);
    onChange(updatedMembers);
    toast.success(`Member "${memberToRemove.name}" removed`);
  };

  return (
    <div className="my-4">
      <label className="form-label">Group Members</label>
      <div className="w-100">
        {members?.map((member, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border p-2 rounded my-1"
          >
            <span>
              {member.name} ({member.role})
            </span>

            {user?.role === "owner" && member.role !== "owner" && (
              <button
                className="btn btn-sm btn-secondary custom-bg-secondary"
                onClick={() => handleRemove(member.id)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex flex-column mt-3">
        <input
          type="text"
          className="form-control my-1"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control my-1"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="form-select my-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="owner">Owner</option>
        </select>
        <button
          className="btn btn-secondary custom-bg-secondary mt-2"
          onClick={handleAdd}
        >
          Add Member
        </button>
      </div>
    </div>
  );
}











