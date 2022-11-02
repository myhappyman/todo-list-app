import { atom, selector } from "recoil";

// type categories = "TODO" | "DOING" | "DONE";

//enumerable
export enum Categories{
    "TODO"="TODO",
    "DOING"="DOING",
    "DONE"="DONE"
}

/**
 * ToDo가 어떻게 생겻는지 설명하는 interface
 */
export interface IToDo {
    text: string;
    id: number;
    category: Categories //3개만 허용
    writeMode: boolean;
    // category: "TODO" | "DOING" | "DONE" //3개만 허용
    // category: string;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TODO
})

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
        isReset ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

const sessionStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    const savedValue = sessionStorage.getItem(key);

    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: any) => {
        const confirm = newValue.length === 0;
        confirm ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

//atom으로 toDo State 정의
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects: [localStorageEffect("toDo"), sessionStorageEffect("toDo")],
});



//selector를 통해 state를 다른 state로 만들어보자
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter(toDo => toDo.category === category);
    }
});