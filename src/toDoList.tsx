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

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    userName: string;    
}

function ToDoList(){
    const { register,  handleSubmit, formState:{errors} } = useForm<IForm>(
        {defaultValues: {
            email: "@naver.com"
        }}
    );
    const onValid = (data:IForm) => {
        console.log(data);
    }
    
    return (
    <div>
        <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
            <input 
                {...register("email", {
                    required: true, 
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "naver.com 주소만 허용됩니다."
                    }
                })} 
                type="text" placeholder="email" />
            <span>{errors?.email?.message}</span>
            <input {...register("firstName", {required: "firstName은 필수값입니다."})} type="text" placeholder="이름" />
            <span>{errors?.firstName?.message}</span>
            <input {...register("lastName", {required: "lastName은 필수값입니다."})} type="text" placeholder="성" />
            <span>{errors?.lastName?.message}</span>
            <input {...register("userName", {required: "userName은 필수값입니다.", minLength: 10}) } type="text" placeholder="이름" />
            <span>{errors?.userName?.message}</span>
            <input {
                ...register("password", {
                            required: "비밀번호는 필수값입니다.",
                            minLength: {value: 5, message: "비밀번호는 최소 5자리 이상이어야 합니다."} 
                        })} 
            type="password" placeholder="비밀번호" />
            <span>{errors?.password?.message}</span>
            <input {...register("passwordConfirm", {required: "비밀번호 확인은 필수값입니다.", minLength: 5})} type="password" placeholder="비밀번호확인" />
            <span>{errors?.passwordConfirm?.message}</span>
            <button>Add</button>
        </form>
    </div>
    );
}

export default ToDoList;