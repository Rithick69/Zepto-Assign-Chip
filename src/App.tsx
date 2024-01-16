import "./styles.css";
import ButtonComp from "./ButtonComp";
import SelectComp from "./SelectComp";
import React, { useState } from "react";

import { data } from "./data";

interface User {
  id: number;
  name: string;
  email: string;
  active: string;
}

const App: React.FC<User[]> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(data);
  const [flag, setFlag] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [lastKeyPress, setLastKeyPress] = useState<number | null>(null);

  const handleKeyDown = (e) => {
    if (e.target.value === "" && e.keyCode === 8) {
      setIsOpen(false);
      const updateArr = [...selectedValues];

      if (updateArr.length > 0) {
        updateArr[updateArr.length - 1].active = "active";
      }
      setSelectedValues(updateArr);
      setLastKeyPress(8);
      if (lastKeyPress === e.keyCode) {
        handleDelete(updateArr[updateArr.length - 1]);
        setLastKeyPress(null);
      }
    }
  };

  const toggleSelect = () => {
    const arr1 = [...selectedValues];
    const arr2 = [...data];
    const orginalArr = arr2.filter((item) => !arr1.includes(item));
    setUsers(orginalArr);
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: User) => {
    setFlag(true);
    const { name } = value;
    setIsOpen(false);
    setInputValue("");
    setSelectedValues((prev) => {
      return [...prev, value];
    });
  };

  const handleDelete = (value: User) => {
    setIsOpen(false);
    value.active = "";
    const newArr = [...users];
    newArr.splice(value.id, 0, value);
    setUsers(newArr);
    setSelectedValues((prev) => {
      return prev.filter((e) => e.name != value.name);
    });
  };

  const filterUsers = (e) => {
    const { value } = e.target;
    setInputValue(value);

    let updateArr = [...users];
    updateArr = updateArr.filter((curr) => {
      return curr.name.toLowerCase().includes(value.toLowerCase());
    });

    setUsers(updateArr);
  };

  return (
    <div className="App">
      <h1>Pick Users</h1>

      <div className="container">
        <div className="InputField">
          {flag &&
            selectedValues.map((curr, idx) => {
              return (
                <ButtonComp
                  key={idx}
                  data={curr}
                  deleteFunc={handleDelete}
                ></ButtonComp>
              );
            })}
          <div className="Selectbox">
            <input
              type="text"
              placeholder="Add new user"
              value={inputValue}
              onClick={toggleSelect}
              onChange={filterUsers}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            {isOpen && <SelectComp users={users} handleSelect={handleSelect} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
