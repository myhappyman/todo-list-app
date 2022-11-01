import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm{
    toDo:string;
}

function CreateToDo(){
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onSubmit = ({toDo}:IForm) => {
        console.log("add to do", toDo);
        setValue("toDo", "");
        setToDos(prevToDos => [{text:toDo, category:category as any, id: Date.now()}, ...prevToDos,]);
    }

    return (
        <form
            style={{display:"flex", flexDirection:"column"}} 
            onSubmit={handleSubmit(onSubmit)}
        >
            <input {...register("toDo", {
                required: "할 일은 입력하세요."
            })} type="text" placeholder="할 일"/>
            <button>할 일 추가</button>
        </form>
    );
    
}

export default CreateToDo;