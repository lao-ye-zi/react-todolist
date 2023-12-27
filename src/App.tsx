import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}

const App: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default App;