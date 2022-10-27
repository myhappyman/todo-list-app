import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList(){
//     const [todo, setTodo]  = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (e:React.FormEvent<HTMLInputElement>) => {
//         const {currentTarget: {value}} = e;
//         setToDoError("");
//         setTodo(value);
//     }

//     const onSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
//         e.preventDefault();
//         console.log(todo);
//         if(todo.length < 10){
//             return setToDoError("To do should be longer");
//         }
//         console.log("submit");
//     }
//     return (
//     <div>
//         <form onSubmit={onSubmit}>
//             <input value={todo} onChange={onChange} type="text" placeholder="Write a to do" />
//             <button>Add</button>
//             {toDoError !== "" ? toDoError : null}
//         </form>
//     </div>);
// }

function ToDoList(){
    const { register, watch } = useForm();
    console.log(watch());

    return (
    <div>
        <form >
            <input {...register("Email")} type="text" placeholder="Email" />
            <input {...register("First Name")} type="text" placeholder="이름" />
            <input {...register("Last Name")} type="text" placeholder="성" />
            <input {...register("UserName")} type="text" placeholder="이름" />
            <input {...register("Password")} type="password" placeholder="비밀번호" />
            <input {...register("PasswordConfirm")} type="password" placeholder="비밀번호확인" />
            <button>Add</button>
        </form>
    </div>
    );
}

export default ToDoList;