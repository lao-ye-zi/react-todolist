import React, { useState, Fragment, useEffect } from 'react';
import './TodoList.css';

type todoThing = {
  content: string;
  completed: boolean;
}

 const todosData: todoThing[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') as string) : [];

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<todoThing[]>([]);
  const [isDarkMode, setDarkMode] = useState(false);
  useEffect(() => {
    setTodos(todosData);
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);



  const handleContentChange = (index: number, newContext: string): void => {
    setTodos((prevTodos) => {
      prevTodos[index].content = newContext;
      return prevTodos.slice();
    });
  }

  const handleInputBtnClick = (): void => {
    if (inputValue === '') {
      return;
    }
    let thing: todoThing = {
      content: inputValue,
      completed: false
    }
    setTodos((prevTodos) => [...prevTodos, thing]);
    setInputValue('');
  };

  const handleBgChangeBtnClick = (): void => {
    setDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      document.body.style.setProperty('background-color', 'navajowhite');
      document.body.style.color = '#000000';
    }
    else {
      document.body.style.backgroundColor = '#333333';
      document.body.style.color = '#ffffff';
    }
  }

  const handleToggleBtnClick = (index: number): void => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const updatedTodo = { ...newTodos[index] };
      updatedTodo.completed = !updatedTodo.completed;
      newTodos[index] = updatedTodo;
      return newTodos;
    });

  };

  const handleSaveBtnClick = (jsonData: any, filename: string) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    link.click();
  }

  const handleDeleteBtnClick = (index: number) => {
    setTodos((prevTodos) => {
      const copy = [...prevTodos];
      copy.splice(index, 1);
      return copy;
    });
  }



  return (
    <Fragment>
      <div className="grid">
        <div className="left">
          <h3 className='title'>未完成</h3>
          <ul className='container'>
            {
              todos.map((todo, index) => {
                if (!todo.completed)
                  return (
                    <li key={index}>
                      <input
                        value={todo.content}
                        onChange={(e) => handleContentChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            var value: string = (e.target as HTMLInputElement).value;
                            if (value === '') {
                              handleDeleteBtnClick(index);
                              return;
                            }
                            handleContentChange(index, value);
                          }
                        }}
                      />
                      <button className='bluebuttoncss' onClick={() => handleToggleBtnClick(index)}>已完成</button>
                      <button className='redbuttoncss' onClick={() => handleDeleteBtnClick(index)}>删除任务</button>
                    </li>
                  )
                return null;
              })
            }
          </ul>
          <h3 className='title'>已完成</h3>
          <ul className='container'>
            {
              todos.map((todo, index) => {
                if (todo.completed)
                  return (
                    <li key={index}>
                      <input
                        value={todo.content}
                        onChange={(e) => handleContentChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            var value: string = (e.target as HTMLInputElement).value;
                            if (value === '') {
                              handleDeleteBtnClick(index);
                              return;
                            }
                            handleContentChange(index, value);
                          }
                        }}
                      />
                      <button className='bluebuttoncss' onClick={() => handleToggleBtnClick(index)}>未完成</button>
                      <button className='redbuttoncss' onClick={() => handleDeleteBtnClick(index)}>删除任务</button>
                    </li>
                  )
                return null;
              })
            }
          </ul>
        </div>
        <div className="right">
          <h3 className='title'>新建任务</h3>
          <div className='container' style={{ flexDirection: 'row', margin: '50px' }}>
            <input value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputBtnClick();
                }
              }}
              placeholder='请输入任务内容，按回车键或点击确认添加任务'
              style={{ width: '70%', height: '30px', fontSize: '20px' }}
            />
            <button className='bluebuttoncss' onClick={handleInputBtnClick}>确认提交</button>
            <button className='redbuttoncss' onClick={handleBgChangeBtnClick}>更改主题</button>
            <button onClick={() => handleSaveBtnClick({ inputValue, todos }, 'todolist')}>保存json到本地</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TodoList;
