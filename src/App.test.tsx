import React,{useState} from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const [todos, setTodos] = useState<string[]>([]); // [1
  render(<App todos={todos} setTodos={setTodos}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
