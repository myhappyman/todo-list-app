import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "../atoms";

const Select = styled.select`
    margin: 5px 0;
`;

function Selector(){
    const setCategory = useSetRecoilState(categoryState);

    //select의 change이벤트가 아닌 onInput을 체크할 예정
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget:{value}} = event;
        setCategory(value as Categories)
    }

    return (
        <>
        <label>구분 </label>
        <Select onInput={onInput}>
            <option value={Categories.TODO}>할 일</option>
            <option value={Categories.DOING}>하는중</option>
            <option value={Categories.DONE}>완료</option>
        </Select>
        </>
    );
}

export default Selector;