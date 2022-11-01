import { atom, selector } from "recoil";

/**
 * ToDo가 어떻게 생겻는지 설명하는 interface
 */
export interface IToDo {
    text: string;
    id: number;
    category: "TODO" | "DOING" | "DONE" //3개만 허용
    // category: string;
}

//atom으로 toDo State 정의
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
});

//selector를 통해 state를 다른 state로 만들어보자
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        return [
            toDos.filter(toDo => toDo.category === "TODO"),
            toDos.filter(toDo => toDo.category === "DOING"),
            toDos.filter(toDo => toDo.category === "DONE"),
        ];
    }
});