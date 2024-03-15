import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
interface NumericInputProps {
  count: number; // The count
  setCount: (q: number) => void; // Function to set the count
}

const NumericInput: React.FC<NumericInputProps> = ({ count, setCount }) => {
  const decrementCount = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 4,
        padding: "0 10px",
        gap: 15,
      }}
    >
      <MinusOutlined
        onClick={decrementCount}
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 0,
          height: 30,
        }}
      >
        {count}
      </div>
      <PlusOutlined
        onClick={incrementCount}
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default NumericInput;
