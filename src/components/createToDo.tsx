import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm{
    toDo:string;
}

function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onValid = ({ toDo } : IForm) => {
        setToDos(oldToDos => [{text:toDo, id:Date.now(), category:"TO_DO"}, ...oldToDos]);
        setValue("toDo", "");
    }

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required: "할 일은 필수값입니다."})} type="text" placeholder="Write a to do" />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;