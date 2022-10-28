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

interface IForm{
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
    PasswordConfirm: string;
    UserName: string;
}

function ToDoList(){
    const { register,  handleSubmit, formState } = useForm();
    const onValid = (data:any) => {
        console.log(data);
    }
    console.log(formState.errors);
    return (
    <div>
        <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
            <input {...register("Email", {required: true})} type="text" placeholder="Email" />
            <input {...register("FirstName", {required: true})} type="text" placeholder="이름" />
            <input {...register("LastName", {required: true})} type="text" placeholder="성" />
            <input {...register("UserName", {required: true, minLength: 10}) } type="text" placeholder="이름" />
            <input {
                ...register("Password", {
                            required: "비밀번호는 필수값입니다.",
                            minLength: {value: 5, message: "비밀번호는 최소 5자리 이상이어야 합니다."} 
                        })} 
            type="password" placeholder="비밀번호" />
            <input {...register("PasswordConfirm", {required: true, minLength: 5})} type="password" placeholder="비밀번호확인" />
            <button>Add</button>
        </form>
    </div>
    );
}

export default ToDoList;