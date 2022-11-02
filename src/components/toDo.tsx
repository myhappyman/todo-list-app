import React from "react";
import { useSetRecoilState } from "recoil";
import { AiFillEdit, AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { IoCheckmarkOutline } from "react-icons/io5";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { useForm } from "react-hook-form";

interface IButton{
    bgColor?: string;
}

const List = styled.li`
    list-style: none;
    border-radius: 10px;
    margin: 20px 0;
    background-color: ${props => props.theme.boxBgColor};
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .checkIcon{
        margin-right: 10px;
    }
`;

const ListContent = styled.div`
    display: block;
    padding: 10px;
    span{
        display: block;
    }
`;

const ListFooter = styled.div`
    display: flex;
    padding: 10px;
`;

const Text = styled.span`
    display: block;
    font-size: 14px;
    word-break: break-all;
`;

const Button = styled.button<IButton>`
    cursor: pointer;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    background-color: ${props => props.bgColor ? props.bgColor : props.theme.accentColor};
    color: #fff;
    margin: 0 3px;
    padding: 5px 10px;
    .icon{
        font-size: 20px;
        padding-top: 2px;
    }
`;

interface IForm{
    modifyToDo: string;
}

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
function ToDo({text, category, id, writeMode}:IToDo){
    //const onClick = (newCategory:  "TODO" | "DOING" | "DONE") => {
    // const onClick = (newCategory:  IToDo["category"]) => {
    //     console.log("i wanna to ", newCategory);
    // }
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget:{ name } } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDO = {text, id, category:name as Categories, writeMode:false};
            return [
                ...oldToDos.slice(0, targetIndex), //front
                newToDO, //new
                ...oldToDos.slice(targetIndex+1) //back
            ];
        });
    }

    const modifyToDo = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDO = {text, id, category, writeMode:!writeMode};
            return [
                ...oldToDos.slice(0, targetIndex), //front
                newToDO, //new
                ...oldToDos.slice(targetIndex+1) //back
            ];
        });
        setValue("modifyToDo", text);
    }

    const modifyCompleteToDo = ({modifyToDo}:IForm) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDO = {text:modifyToDo, id, category, writeMode:false};
            return [
                ...oldToDos.slice(0, targetIndex), //front
                newToDO, //new
                ...oldToDos.slice(targetIndex+1) //back
            ];
        });
        setValue("modifyToDo", "");
    }

    const deleteToDo = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            return [
                ...oldToDos.slice(0, targetIndex), //front
                ...oldToDos.slice(targetIndex+1) //back
            ];
        });
    }

    //기존에 작성하던 방식인 onClick={onClick("TODO")} 이런 형태로는 인자가 넘겨지지 않는다.
    return (
        <List>
            <ListContent>
                {
                    writeMode ? 
                    <form onSubmit={handleSubmit(modifyCompleteToDo)}>
                        <input {...register("modifyToDo")} />
                        <Button><AiFillCheckCircle className="icon"/></Button>
                    </form>
                    : <Text><IoCheckmarkOutline className="checkIcon" /> {text}</Text>
                }
                
            </ListContent>
            {
                !writeMode && 
                <ListFooter>
                    {category !== Categories.TODO && <Button name={Categories.TODO} onClick={onClick}>할 일</Button>}
                    {category !== Categories.DOING && <Button name={Categories.DOING} onClick={onClick}>하는중</Button>}
                    {category !== Categories.DONE && <Button name={Categories.DONE} onClick={onClick}>완료</Button>}
                    <Button onClick={modifyToDo}><AiFillEdit className="icon"/></Button>
                    <Button bgColor="red" onClick={deleteToDo}><AiOutlineClose className="icon"/></Button>
                </ListFooter>
            }
            
            
            
        </List>
    );
}

export default ToDo;