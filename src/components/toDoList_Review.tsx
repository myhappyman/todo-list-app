import { useForm } from "react-hook-form";

function ToDoList_Review(){
    const { register } = useForm();
    return (
        <div>
            <form>
                <input {...register("userId")} placeholder="아이디"/>
                <input {...register("userPw")} placeholder="비밀번호"/>
                <input {...register("userPwConfirm")} placeholder="비밀번호확인"/>
                <input {...register("nickName")} placeholder="닉네임"/>
                <input {...register("email")} placeholder="이메일"/>
                <input {...register("address")} placeholder="주소"/>
                <input {...register("phone")} placeholder="전화번호"/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList_Review;