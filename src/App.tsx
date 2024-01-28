import "./styles.css";
import ButtonComp from "./ButtonComp";
import SelectComp from "./SelectComp";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  active: string;
}

import { data } from "./data";

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(data);
  const [flag, setFlag] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [lastKeyPress, setLastKeyPress] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { value } = e.target as HTMLInputElement;
    const keyCode = e.keyCode as number;
    setIsOpen(true);
    toggleSelect();
    if (value !== "" && keyCode === 13) {
      const userArr = [...users];
      const userData = userArr.find(
        (curr) => curr.name.toLowerCase() === value.toLowerCase()
      );
      if (userData) {
        handleSelect(userData);
      }
    } else if (value === "" && keyCode === 8 && selectedValues.length > 0) {
      setIsOpen(false);
      const updateArr = [...selectedValues];

      if (updateArr.length > 0) {
        updateArr[updateArr.length - 1].active = "active";
      }
      setSelectedValues(updateArr);
      setLastKeyPress(8);
      if (lastKeyPress === keyCode) {
        setLastKeyPress(null);
        handleDelete(updateArr[updateArr.length - 1]);
      }
    }
  };

  const toggleSelect = (): void => {
    const arr1 = [...selectedValues];
    const arr2 = [...data];
    const orginalArr = arr2.filter((item) => !arr1.includes(item));
    setUsers(orginalArr);
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: User): void => {
    setFlag(true);
    setIsOpen(false);
    setInputValue("");
    setSelectedValues((prev) => {
      return [...prev, value];
    });
  };

  const handleDelete = (value: User): void => {
    setIsOpen(false);
    value.active = "";
    const newArr = [...users];
    if (value) {
      newArr.splice(value.id, 0, value);
      setUsers(newArr);
      setSelectedValues((prev) => {
        return prev.filter((e) => e.name != value.name);
      });
    }
  };

  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target as HTMLInputElement;
    setInputValue(value);

    let updateArr = [...users];
    updateArr = updateArr.filter((curr) => {
      return curr.name.toLowerCase().includes(value.toLowerCase());
    });

    setUsers(updateArr);
  };

  return (
    <>
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
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e)
                }
              />
              {isOpen && users.length > 0 && (
                <SelectComp users={users} handleSelect={handleSelect} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
