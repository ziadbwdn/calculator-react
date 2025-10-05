import { useState } from "react";

export default function App() {
  const [display, setDisplay] = useState<string>("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newNum, setNewNum] = useState<boolean>(true);

  const handleNumber = (num: string): void => {
    if (newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = (): void => {
    if (newNum) {
      setDisplay("0.");
      setNewNum(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOp: string): void => {
    const current = parseFloat(display);

    if (prev === null) {
      setPrev(current);
    } else if (op) {
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    }

    setNewNum(true);
    setOp(nextOp);
  };

  const calculate = (
    a: number,
    b: number,
    operation: string
  ): number | string => {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEquals = (): void => {
    if (op && prev !== null) {
      const current = parseFloat(display);
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(null);
      setOp(null);
      setNewNum(true);
    }
  };

  const handleClear = (): void => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setNewNum(true);
  };

  const handleToggleSign = (): void => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = (): void => {
    setDisplay(String(parseFloat(display) / 100));
  };

  interface ButtonProps {
    value: string;
    onClick: () => void;
    className?: string;
  }

  const Button = ({ value, onClick, className = "" }: ButtonProps) => (
    <button
      onClick={onClick}
      className={`text-2xl font-medium rounded-2xl transition-all active:scale-95 ${className}`}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Title */}
        <h1 className="text-4xl font-bold text-black text-center mb-12 tracking-tight font-mono">
          Your Usual Calculator
        </h1>

        <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
          {/* Display */}
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 min-h-[100px] flex items-end justify-end border border-white/5">
            <div className="text-5xl font-light text-white break-all text-right">
              {display}
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              value="AC"
              onClick={handleClear}
              className="bg-gray-600 hover:bg-gray-500 text-white"
            />
            <Button
              value="±"
              onClick={handleToggleSign}
              className="bg-gray-600 hover:bg-gray-500 text-white"
            />
            <Button
              value="%"
              onClick={handlePercent}
              className="bg-gray-600 hover:bg-gray-500 text-white"
            />
            <Button
              value="÷"
              onClick={() => handleOperator("÷")}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 2 */}
            <Button
              value="7"
              onClick={() => handleNumber("7")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="8"
              onClick={() => handleNumber("8")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="9"
              onClick={() => handleNumber("9")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="×"
              onClick={() => handleOperator("×")}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 3 */}
            <Button
              value="4"
              onClick={() => handleNumber("4")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="5"
              onClick={() => handleNumber("5")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="6"
              onClick={() => handleNumber("6")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="-"
              onClick={() => handleOperator("-")}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 4 */}
            <Button
              value="1"
              onClick={() => handleNumber("1")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="2"
              onClick={() => handleNumber("2")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="3"
              onClick={() => handleNumber("3")}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="+"
              onClick={() => handleOperator("+")}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 5 */}
            <Button
              value="0"
              onClick={() => handleNumber("0")}
              className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="."
              onClick={handleDecimal}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="="
              onClick={handleEquals}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
