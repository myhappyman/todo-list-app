import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

/**
 * array안에 있는 값을 수정하기
 * 1. 우리는 id로 toDo값을 찾아야한다.
 * 2. 위치를 찾았으면 immutability의 규칙을 지키면서 배열의 값을 새롭게 생성해야한다.
 * 3. const food = ["banana", "apple", "mango", "감", "김밥"];
 * 4. apple의 값을 pear로 바꾼다고 했을때 apple앞과 뒤를 기준으로 쪼갠다.
 * 5. const front = ["banana"];
 * 6. const back = ["mango", "감", "김밥"];
 * 7. const newArr = [...front, "pear", ...back];
 * 8. 특정 배열을 기준으로 잘라낼땐 슬라이스가 편하다.
 * 9. 다른사람들은 보니 map을 통해 위치를 찾고 위치가 맞다면 거기서 object를 리턴하도록 처리하였다.
 * @param param0 
 * @returns 
 */
function ToDo({text, category, id}:IToDo){
    //const onClick = (newCategory:  "TODO" | "DOING" | "DONE") => {
    // const onClick = (newCategory:  IToDo["category"]) => {
    //     console.log("i wanna to ", newCategory);
    // }
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget:{name}} = event;
        console.log("i wanna to ", name);
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const oldTodo = oldToDos[targetIndex];
            const newToDO = {text, id, category:name as any};
            console.log(oldTodo);
            console.log(newToDO);
            return [
                ...oldToDos.slice(0, targetIndex), //front
                newToDO, //new
                ...oldToDos.slice(targetIndex+1) //back
            ];
        });

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