import { useForm } from "react-hook-form";

interface IForm{
    address: string;
    email: string;
    nickName: string;
    phone: string;
    userId: string;
    userPw: string;
    userPwConfirm: string;
    extraError?: string;
}

function Join(){
    const { 
        register, 
        handleSubmit, 
        formState:{errors},
        setError
    } = useForm<IForm>({
        defaultValues: {
            phone: "010"
        }
    });

    //handleSubmit은 2개의 인자를 받는데 첫번째는 유효한 데이터인 경우 호출되는 함수다.
    //두번째 인자는 유효하지 않는 경우 호출되는 함수로 첫번째 함수만 필수값이다.
    const onValid = (data:IForm) => {
        if(data.userPw !== data.userPwConfirm){
            setError("userPwConfirm", 
                {message: "비밀번호가 일치하지 않습니다."},
                {shouldFocus: true}
            );
        }
        setError("extraError", {message: "알 수 없는 오류가 발생했습니다."});
    }

    //에러체크는 formState의 error함수를 사용하여 알 수 있다.
    console.log(errors);
    
    return (
        <div>
            <form 
                style={{display:"flex", flexDirection:"column"}} 
                onSubmit={handleSubmit(onValid)} >
                <input {...register("userId", {
                    required: "회원 아이디를 입력하세요.",
                    validate: {
                        noAdmin: (id) => id.includes("admin") ? "admin은 사용할 수 없습니다." : true
                    }})} placeholder="아이디"/>
                <span>{errors?.userId?.message}</span>
                <input {...register("userPw", {required: "비밀번호를 입력하세요.", minLength: 10})} placeholder="비밀번호"/>
                <span>{errors?.userPw?.message}</span>
                <input {...register("userPwConfirm", {required: "비밀번호 확인을 입력하세요.", minLength: 10})} placeholder="비밀번호확인"/>
                <span>{errors?.userPwConfirm?.message}</span>
                <input {...register("nickName", {required: "닉네임을 입력하세요.", minLength: 10})} placeholder="닉네임"/>
                <span>{errors?.nickName?.message}</span>
                <input {
                    ...register("email", {
                        required: "이메일을 입력하세요.",
                        pattern: {
                            value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "이메일 형식이 아닙니다."
                        },
                    })}
                    placeholder="이메일"/>
                <span>{errors?.email?.message}</span>
                <input {...register("address", {required: "주소를 입력하세요."})} placeholder="주소"/>
                <span>{errors?.address?.message}</span>
                <input {...register("phone", {required: "전화번호를 입력하세요."})} placeholder="전화번호"/>
                <span>{errors?.phone?.message}</span>
                <button>회원가입</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

export default Join;