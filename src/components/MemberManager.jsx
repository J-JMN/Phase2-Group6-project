import useMembers from "../hooks/useMembers";
const MemberManager = ({ members, setMembers }) => {
  const {addMember, removeMember} = useMembers(members, setMembers);

  return (
    <div className="form-group">
      <label>Members</label>
      <ul className="member-list">
        {members.map((member, index) => (
          <li key={index} className="member-item">
            <span>{member.name} - <strong>{member.role}</strong></span>
            {member.role !== "Owner" && (
              <button type="button" onClick={() => removeMember(index)} className="remove-btn">
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
      <button type="button" className="btn" onClick={addMember}>
        Add Member
      </button>
    </div>
  );
};

export default MemberManager;
