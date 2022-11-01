import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    const setCategory = useSetRecoilState(categoryState);
    //select의 change이벤트가 아닌 onInput을 체크할 예정
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget:{value}} = event;
        setCategory(value as Categories)
    }

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select onInput={onInput}>
                <option value={Categories.TODO}>TODO</option>
                <option value={Categories.DOING}>DOING</option>
                <option value={Categories.DONE}>DONE</option>
            </select>
            <CreateToDo />
            {toDos.map(d => <ToDo key={d.id} {...d} />)}
        </div>
    );
}

export default ToDoList;