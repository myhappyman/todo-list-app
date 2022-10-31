import { useForm } from "react-hook-form";

interface IForm{
    userId: string;
    email: string;
}

function Test(){
    const { register, handleSubmit, formState } = useForm<IForm>();

    const onValid = (data:IForm) => {
        console.log(data);
    }

    console.log(formState.errors);

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input {
                    ...register("userId",
                    {
                        required: "아이디를 입력하세요.",
                        minLength: {
                            value: 5,
                            message: "아이디는 최소 5자리 이상입니다."
                        },
                        maxLength: {
                            value: 12,
                            message: "아이디는 최대 12자리 이상입니다."
                        },
                    }
                )} placeholder="아이디" />
                <input {
                    ...register("email", {
                        required: "이메일을 입력하세요.",
                        pattern: {
                            value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "이메일 형식이 아닙니다."
                        },
                })} placeholder="이메일" />
                <button>추가</button>
            </form>
        </div>
    )
}

export default Test;