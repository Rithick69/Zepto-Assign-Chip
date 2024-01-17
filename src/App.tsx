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

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(data);
  const [flag, setFlag] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [lastKeyPress, setLastKeyPress] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setIsOpen(true);
    toggleSelect();
    if (value !== "" && e.keyCode === 13) {
      const userArr = [...users];
      const userData = userArr.find<User>(
        (curr) => curr.name.toLowerCase() === value.toLowerCase()
      );
      if (userData) {
        handleSelect(userData);
      }
    } else if (value === "" && e.keyCode === 8 && selectedValues.length > 0) {
      setIsOpen(false);
      const updateArr = [...selectedValues];

      if (updateArr.length > 0) {
        updateArr[updateArr.length - 1].active = "active";
      }
      setSelectedValues(updateArr);
      setLastKeyPress(8);
      if (lastKeyPress === e.keyCode) {
        setLastKeyPress(null);
        handleDelete(updateArr[updateArr.length - 1]);
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
    if (value) {
      newArr.splice(value.id, 0, value);
      setUsers(newArr);
      setSelectedValues((prev) => {
        return prev.filter((e: User) => e.name != value.name);
      });
    }
  };

  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

    let updateArr = [...users];
    updateArr = updateArr.filter((curr: User) => {
      return curr.name.toLowerCase().includes(value.toLowerCase());
    });

    // if (!updateArr) {
    //   toggleSelect();
    // }

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
            {isOpen && users.length > 0 && (
              <SelectComp users={users} handleSelect={handleSelect} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
