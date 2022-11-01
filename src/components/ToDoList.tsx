import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import Selector from "./Selector";
import ToDo from "./ToDo";

const Wrapper = styled.div`
    height: 100vh;    
`;

const Wrap = styled.div`
    padding: 0px 2rem;
    max-width: 30rem;
    margin: 0px auto;
`;

const Title = styled.div`
    display: block;
    text-align: center;
    font-size: 36px;
`;

function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    return (
        <Wrapper>
            <Wrap>
                <Title>To Dos</Title>
                <Selector />
                <CreateToDo />
                {toDos.map(d => <ToDo key={d.id} {...d} />)}
            </Wrap>
        </Wrapper>
    );
}

export default ToDoList;