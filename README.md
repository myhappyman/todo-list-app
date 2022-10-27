ToDoList App Start

1. react-hook-form에 대해 알아본다.

> npm install react-hook-form

설치가 완료되면 사용을 위해 useForm이라는 hook을 import해야한다.
useForm은 다양한걸 제공하는데, 그 중 register라는 함수가 있다.
register함수는 input에 특화되어 있다.
onBlur, onChange를 가지고 있다.

생성한 함수 register를 input 태그내에 {...register("이름")} 형태로 넣어서 스프레드 연산자를 통해 자연스럽게 value, onChange, state값등을 처리할 수 있다.

watch는 form에 입력한 값의 변화를 관찰할 수 있게 해준다.
watch를 실행해보면 input에 등록한 toDo라는 값의 입력이 어떤게 변화하고 있는지 다 출력해준다.
