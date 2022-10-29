import { atom } from "recoil";

export interface IToDo{
    text : string;
    id: number;
    category: "TO_DO"|"DOING"|"DONE"; //카테고리의 값을 제한한다. 문자열 중 입력한 3개중 하나만 가능
}

export const toDoState = atom<IToDo[]>({
    key:"toDo",    
    default: []
});