import { atom } from "recoil";

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