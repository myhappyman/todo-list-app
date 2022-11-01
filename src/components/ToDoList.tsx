import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    //select의 change이벤트가 아닌 onInput을 체크할 예정
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget:{value}} = event;
        console.log(value);
        setCategory(value)
    }

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select onInput={onInput}>
                <option value="TODO">TODO</option>
                <option value="DOING">DOING</option>
                <option value="DONE">DONE</option>
            </select>
            <CreateToDo />
            {toDos.map(d => <ToDo key={d.id} {...d} />)}
        </div>
    );
}

export default ToDoList;