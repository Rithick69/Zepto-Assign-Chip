import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  active: string;
}

interface SelectComp {
  users: User[];
  handleSelect: (data: {
    id: number;
    name: string;
    email: string;
    active: string;
  }) => void;
}

const SelectComp: React.FC<SelectComp> = ({ users, handleSelect }) => {
  return (
    <>
      <div className="select-overlay">
        <div className="select-menu">
          <ul>
            {users.map((curr, idx) => {
              return (
                <li key={idx} onClick={() => handleSelect(curr)}>
                  <img src="#" />
                  <p>{curr.name}</p>
                  <p>{curr.email}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectComp;
