import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import React, { useState } from "react";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputWrap = styled.div`
    width: 100%;
    position: relative;
    margin: 10px 0;
    height: 28px;
    input{
        position: absolute;
        border: none;
        outline: 0;
        width: 100%;
        height: 38px;
        &:focus{
            border: 3px solid ${props => props.theme.accentColor};
        }
    }
`;

interface IAddBtn{
    isShow: boolean;
}

const AddBtn = styled.button<IAddBtn>`
    display: ${props => props.isShow ? "block" : "none"};
    position: absolute;
    right: 0;
    color: ${props => props.theme.accentColor};
    border: none;
    background-color: inherit;
    .icon{
        cursor: pointer;
        font-size: 24px;
        margin: 5px;
        font-weight: 700;
    }
`;

const ErrorMsg = styled.span`
    color: red;
    font-size: 10px;
`;

interface IForm{
    toDo:string;
}

function CreateToDo(){
    const [isShowToAddBtn, setIsShowToAddBtn] = useState(false);
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue, formState:{errors} } = useForm<IForm>();

    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget:{value}} = event;
        value.length > 0 ? setIsShowToAddBtn(true) : setIsShowToAddBtn(false);
    }
    const onSubmit = ({toDo}:IForm) => {
        setToDos(prevToDos => [{text:toDo, category:category, id:Date.now(), writeMode:false}, ...prevToDos,]);
        setValue("toDo", "");
    }

    const category_kor = {
        "TODO" : "할 일",
        "DOING" : "하는중",
        "DONE" : "완료",
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <InputWrap>
                <input {...register("toDo", {
                    required: "할 일을 입력하세요.",
                    onChange: onChange
                })} type="text" placeholder={category_kor[category]}/>
                <AddBtn type="submit" isShow={isShowToAddBtn}><AiFillPlusCircle className="icon" /></AddBtn>
            </InputWrap>
            <InputWrap>
                <ErrorMsg>{errors?.toDo?.message}</ErrorMsg>
            </InputWrap>            
        </Form>
    );
    
}

export default CreateToDo;