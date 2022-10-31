import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";



function ToDo({text, category, id}:IToDo){
    //const onClick = (newCategory:  "TODO" | "DOING" | "DONE") => {
    // const onClick = (newCategory:  IToDo["category"]) => {
    //     console.log("i wanna to ", newCategory);
    // }
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget:{name}} = event;
        console.log("i wanna to ", name);
    }

    //기존에 작성하던 방식인 onClick={onClick("TODO")} 이런 형태로는 인자가 넘겨지지 않는다.
    return (
        <li>
            {text}
            {category !== "TODO" && <button name="TODO" onClick={onClick}>TODO</button>}
            {category !== "DOING" && <button name="DOING" onClick={onClick}>DOING</button>}
            {category !== "DONE" && <button name="DONE" onClick={onClick}>DONE</button>}
        </li>
    );
}

export default ToDo;