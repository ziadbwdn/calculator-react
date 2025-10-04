import { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [newNum, setNewNum] = useState(true);

  const handleNumber = (num: string): void => {
    if (newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = (): void => {
    if (newNum) {
      setDisplay('0.');
      setNewNum(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
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

  const calculate = (a: number, b: number, operation: string): number | string => {
    switch (operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b !== 0 ? a / b : 'Error';
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
    setDisplay('0');
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

  const Button = ({ value, onClick, className = '' }: ButtonProps) => (
    
      {value}
    
  );

  return (
    
      
        {/* Title */}
        
          Your Usual Calculator
        

        
          {/* Display */}
          
            
              {display}
            
          

          {/* Buttons Grid */}
          
            {/* Row 1 */}
            
            
            
            <Button
              value="÷"
              onClick={() => handleOperator('÷')}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 2 */}
            <Button
              value="7"
              onClick={() => handleNumber('7')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="8"
              onClick={() => handleNumber('8')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="9"
              onClick={() => handleNumber('9')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="×"
              onClick={() => handleOperator('×')}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 3 */}
            <Button
              value="4"
              onClick={() => handleNumber('4')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="5"
              onClick={() => handleNumber('5')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="6"
              onClick={() => handleNumber('6')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="-"
              onClick={() => handleOperator('-')}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 4 */}
            <Button
              value="1"
              onClick={() => handleNumber('1')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="2"
              onClick={() => handleNumber('2')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="3"
              onClick={() => handleNumber('3')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            />
            <Button
              value="+"
              onClick={() => handleOperator('+')}
              className="bg-orange-500 hover:bg-orange-400 text-white"
            />

            {/* Row 5 */}
            <Button
              value="0"
              onClick={() => handleNumber('0')}
              className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white"
            />
            
            
          
        
      
    
  );
}