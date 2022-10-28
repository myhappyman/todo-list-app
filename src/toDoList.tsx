import { useForm } from "react-hook-form";

interface IForm{
    toDo:string;
}

function ToDoList(){
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const onValid = (data:IForm) => {
        console.log("add to do", data?.toDo);
        setValue("toDo", "");
    }

    return (
    <div>
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required: "할 일은 필수값입니다."})} type="text" placeholder="Write a to do" />
            <button>Add</button>
        </form>
    </div>);
}

// interface IForm {
//     email: string;
//     firstName: string;
//     lastName: string;
//     password: string;
//     passwordConfirm: string;
//     userName: string;
//     extraError?: string;
// }

// function ToDoList(){
//     const { 
//         register, 
//         handleSubmit, 
//         formState:{errors},
//         setError} = useForm<IForm>(
//         {defaultValues: {
//             email: "@naver.com"
//         }}
//     );
//     const onValid = (data:IForm) => {
//         if(data.password !== data.passwordConfirm){
//             setError(
//                 "passwordConfirm", //에러 처리를 할 항목
//                 {message: "비밀번호가 서로 다릅니다."}, //에러 메시지
//                 {shouldFocus: true} //에러가 발생한경우 포커스를 할것인지
//             );
//         }
//         // setError("extraError", {message: "Server offline."}, );
//     }
    
//     return (
//     <div>
//         <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
//             <input 
//                 {...register("email", {
//                     required: true, 
//                     pattern: {
//                         value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//                         message: "naver.com 주소만 허용됩니다."
//                     }
//                 })} 
//                 type="text" placeholder="email" />
//             <span>{errors?.email?.message}</span>
//             <input {
//                 ...register("firstName", 
//                 {
//                     required: "firstName은 필수값입니다.",
//                     validate: {
//                         admin: (value) => value.includes("admin") ? "admin은 포함 시킬 수 없습니다." : true,
//                         noShin: (value) => value.includes("Shin") ? "Shin은 포함 시킬 수 없습니다." : true,
//                     }
//                 })} type="text" placeholder="이름" />
//             <span>{errors?.firstName?.message}</span>
//             <input {...register("lastName", {required: "lastName은 필수값입니다."})} type="text" placeholder="성" />
//             <span>{errors?.lastName?.message}</span>
//             <input {...register("userName", {required: "userName은 필수값입니다.", minLength: 10}) } type="text" placeholder="이름" />
//             <span>{errors?.userName?.message}</span>
//             <input {
//                 ...register("password", {
//                             required: "비밀번호는 필수값입니다.",
//                             minLength: {value: 5, message: "비밀번호는 최소 5자리 이상이어야 합니다."} 
//                         })} 
//             type="password" placeholder="비밀번호" />
//             <span>{errors?.password?.message}</span>
//             <input {...register("passwordConfirm", {required: "비밀번호 확인은 필수값입니다.", minLength: 5})} type="password" placeholder="비밀번호확인" />
//             <span>{errors?.passwordConfirm?.message}</span>
//             <button>Add</button>
//             <span>{errors?.extraError?.message}</span>
//         </form>
//     </div>
//     );
// }

export default ToDoList;