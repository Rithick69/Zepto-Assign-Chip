import React from "react";

interface ButtonCompProps {
  data: {
    id: number;
    name: string;
    email: string;
    active: string;
  };
  deleteFunc: (data: {
    id: number;
    name: string;
    email: string;
    active: string;
  }) => void;
}

const ButtonComp: React.FC<ButtonCompProps> = ({ data, deleteFunc }) => {
  return (
    <>
      <button className={`nameIcon ${data.active}`}>
        <img src="#" />
        <p>{data.name}</p>
        <p onClick={() => deleteFunc(data)}>X</p>
      </button>
    </>
  );
};

export default ButtonComp;
