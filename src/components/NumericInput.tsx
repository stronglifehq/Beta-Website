import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
interface NumericInputProps {
  initialCount?: number; // Optional initial count
}

const NumericInput: React.FC<NumericInputProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
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
