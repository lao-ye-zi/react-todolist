import React, { useState, ChangeEvent, Fragment, useEffect } from 'react';
import './TodoList.css';


type todoThing = {
  content:string;
  completed:boolean;
}


const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos,setTodos] = useState<todoThing[]>([]);
  const [isDarkMode, setDarkMode] = useState(false);
   

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []); // 空数组确保只在组件加载时执行

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
  }, [todos]);
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleContentChange = (index:number, newContext:string):void =>{
    setTodos((prevTodos) => {
      prevTodos[index].content  = newContext;
      return prevTodos.slice();
    })
  }

  const handleInputBtnClick = (): void => {
    if (inputValue === '') {
      return;
    }
    let thing:todoThing = {
      content:inputValue,
      completed:false
    }
    setTodos((prevTodos) => [...prevTodos, thing]);
    setInputValue('');
  };

  const handleBgChangeBtnClick = ():void => {
    setDarkMode((prevMode) => !prevMode);
    if(isDarkMode){
      document.body.style.setProperty('background-color', '#ffffff');
      document.body.style.color = '#000000';
    }
    else{
      document.body.style.backgroundColor = '#333333';
      document.body.style.color = '#ffffff';
    }
  }

  const handleToggleBtnClick = (index: number): void => {
    setTodos((prevTodos) => {
      prevTodos[index].completed  = !prevTodos[index].completed;
      return prevTodos.slice();
    });
  };

  const handleSaveBtnClick = (jsonData:any,filename:string) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    link.click();
  }

  const handleDeleteBtnClick = (index:number) => {
    setTodos((prevTodos) => {
      const copy = [...prevTodos];
      copy.splice(index,1);
      return copy;
    });
  }



  return (
    <Fragment>
      <div className="grid">
      <div className="left"></div>
      <div className="right"></div>
    </div>
      <h3 className='title'>新建任务</h3>
      <div className='container'>
        <input value={inputValue} onChange={handleInputChange} />
        <button className='bluebuttoncss' onClick={handleInputBtnClick}>提交</button>
        <button className='redbuttoncss' onClick={handleBgChangeBtnClick}>更改主题</button>
        <button onClick={() => handleSaveBtnClick({inputValue,todos},'todolist')}>保存json到本地</button>
      </div>
      
      <h3 className='title'>未完成</h3>
      <ul className='container'>
        {
          todos.map((todo,index) => {
            if(!todo.completed)
            return (
              <li key={index}>
            <textarea
                value={todo.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            <button onClick={() => handleToggleBtnClick(index)}>已完成</button>
            <button onClick={() => handleDeleteBtnClick(index)}>删除任务</button>
          </li>
              )
            return null;
          })
        }
      </ul>
      <h3 className='title'>已完成</h3>
      <ul className='container'>
      {
          todos.map((todo,index) => {
            if(todo.completed)
            return (
              <li key={index}>
            <textarea
                value={todo.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            <button onClick={() => handleToggleBtnClick(index)}>未完成</button>
            <button onClick={() => handleDeleteBtnClick(index)}>删除任务</button>
          </li>
              )
            return null;
          })
        }
      </ul>
    </Fragment>
  );
};

export default TodoList;
