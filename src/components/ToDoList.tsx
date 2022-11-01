import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList(){
    const [toDos, doing, done] = useRecoilValue(toDoSelector);
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <CreateToDo />
            <h2>To Do</h2>
            <ul>
                {
                    toDos ? 
                    toDos.map(d => <ToDo key={d.id} {...d} />) 
                    : null
                }
            </ul>
            <hr/>
            <h2>Doing</h2>
            <ul>
                {
                    doing ? 
                    doing.map(d => <ToDo key={d.id} {...d} />) 
                    : null
                }
            </ul>
            <hr/>
            <h2>Done</h2>
            <ul>
                {
                    done ? 
                    done.map(d => <ToDo key={d.id} {...d} />) 
                    : null
                }
            </ul>
            <hr/>
        </div>
    );
}

export default ToDoList;