import useMembers from "../hooks/useMembers";
const MemberManager = ({ members, setMembers }) => {
  const {addMember, removeMember} = useMembers(members, setMembers);
  return (
    <div className="my-4">
      <label>Members</label>
      <div className="w-100">
        {members.map((member, index) => (
          <div className="d-flex flex-row justify-content-between w-100 align-items-center border p-1 rounded my-1" key={index}>
            <span>{member.name} - <strong>{member.role}</strong></span>
            {member.role !== "Owner" && (
              <button type="button" onClick={() => removeMember(index)} className="btn btn-sm btn-secondary custom-bg-secondary">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-sm my-2 btn-secondary custom-bg-secondary" onClick={addMember}>
        Add Member
      </button>
    </div>
  );
};

export default MemberManager;
