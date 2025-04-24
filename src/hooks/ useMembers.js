import { toast } from "react-toastify";

const useMembers = (members, setMembers) => {
  const addMember = () => {
    const name = prompt("Enter new member's name:");
    if (!name) return;

    if (members.find((m) => m.name.toLowerCase() === name.toLowerCase())) {
      toast.warning("Member already exists");
      return;
    }

    setMembers([...members, { name, role: "Member" }]);
    toast.success(`Added member "${name}"`);
  };

  const removeMember = (index) => {
    const member = members[index];
    if (member.role === "Owner") {
      toast.error("Cannot remove the owner");
      return;
    }
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
    toast.info(`Removed member "${member.name}"`);
  };

  return { addMember, removeMember };
};

export default useMembers;
