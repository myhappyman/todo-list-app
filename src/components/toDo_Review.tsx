import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDo_Review(){
    const toDos = useRecoilValue(toDoState);
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <CreateToDo />
            <ul>
                {
                    toDos ? 
                    toDos.map(toDo => <ToDo key={toDo.id} {...toDo} />) 
                    : null
                }
            </ul>
        </div>
    );
}

export default ToDo_Review;