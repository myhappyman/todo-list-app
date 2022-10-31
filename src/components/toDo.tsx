import { IToDo } from "../atoms";

function ToDo({text}:IToDo){
    return (
        <li>
            {text}
            <button>TODO</button>
            <button>DOING</button>
            <button>DONE</button>
        </li>
    );
}

export default ToDo;