import { useForm } from "react-hook-form";

interface IForm{
    toDo:string;
}

function ToDo_Review(){
    const { register,  handleSubmit, formState:{errors}, setValue } = useForm<IForm>();
    const onSubmit = (data:IForm) => {
        console.log("add to do", data.toDo);
        setValue("toDo", "");
    }

    return (
        <div>
            <form  
                style={{display:"flex", flexDirection:"column"}} 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input {...register("toDo", {
                    required: "할 일은 입력하세요."
                })} type="text" placeholder="전화번호"/>
                <span>{errors?.toDo?.message}</span>
                <button>할 일 추가</button>
            </form>
        </div>
    );
}

export default ToDo_Review;