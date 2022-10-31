import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";



interface IForm{
    toDo:string;
}

/**
 * ToDo가 어떻게 생겻는지 설명하는 interface
 */
interface IToDo {
    text: string;
    id: number;
    category: "TODO" | "DOING" | "DONE" //3개만 허용
    // category: string;
}
const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
});

function ToDo_Review(){    
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register,  handleSubmit, formState:{errors}, setValue } = useForm<IForm>();
    const onSubmit = ({toDo}:IForm) => {
        console.log("add to do", toDo);
        setValue("toDo", "");
        setToDos(prevToDos => [{text:toDo, category:"TODO", id: Date.now()}, ...prevToDos,]);
    }
    console.log(toDos);

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <form
                style={{display:"flex", flexDirection:"column"}} 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input {...register("toDo", {
                    required: "할 일은 입력하세요."
                })} type="text" placeholder="할 일"/>
                <span>{errors?.toDo?.message}</span>
                <button>할 일 추가</button>
            </form>
            <ul>
                {
                    toDos ? 
                    toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>) 
                    : null
                }
            </ul>
        </div>
    );
}

export default ToDo_Review;