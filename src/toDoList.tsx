import React, { useState } from "react";

function ToDoList(){
    const [todo, setTodo]  = useState("");
    const onChange = (e:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = e;
        setTodo(value);
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        console.log(todo);
    }
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={todo} onChange={onChange} type="text" placeholder="Write a to do" />
            <button>Add</button>
        </form>
    </div>);
}

export default ToDoList;