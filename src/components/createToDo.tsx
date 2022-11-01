import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

interface IForm{
    toDo:string;
}

function CreateToDo(){
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue, formState:{errors} } = useForm<IForm>();
    const onSubmit = ({toDo}:IForm) => {
        console.log("add to do", toDo);
        setValue("toDo", "");
        setToDos(prevToDos => [{text:toDo, category:category, id: Date.now()}, ...prevToDos,]);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("toDo", {
                required: "할 일을 입력하세요."
            })} type="text" placeholder="할 일"/>
            <span>{errors?.toDo?.message}</span>
            <button>추가</button>
        </Form>
    );
    
}

export default CreateToDo;