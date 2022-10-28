ToDoList App Start

1. react-hook-form에 대해 알아본다.

> npm install react-hook-form

설치가 완료되면 사용을 위해 useForm이라는 hook을 import해야한다.
useForm은 다양한걸 제공하는데, 그 중 register라는 함수가 있다.
-register
register함수는 input에 특화되어 있다.
onBlur, onChange를 가지고 있다.

생성한 함수 register를 input 태그내에 {...register("이름")} 형태로 넣어서 스프레드 연산자를 통해 자연스럽게 value, onChange, state값등을 처리할 수 있다.

-watch
watch는 form에 입력한 값의 변화를 관찰할 수 있게 해준다.
watch를 실행해보면 input에 등록한 toDo라는 값의 입력이 어떤게 변화하고 있는지 다 출력해준다.

-handleSubmit
handleSubmit은 기존의 form태그 이벤트 onSubmit을 대체한다.
handleSubmit을 가지고 validation(유효성 검사)를 진행할 수 있다.
form태그에 onSubmit을 걸고 handleSubmit을 넣어준다.
handleSubmit(arg1, arg2)에는 2개의 파라미터를 받도록 되어 있다.
@arg1 : 데이터가 유효한 경우 동작되는 함수 (필수값)
@arg2 : 데이터가 유효하지 않는 경우 동작되는 함수 (필수 X)

유효하지 않는 데이터 처리를 확인해보기 위해
resgister의 2번째 인자에 required등 속성값 등을 주었다.

/\*_ html input자체에도 해당 required등의 기본 옵션을 제공하지만 사용하지 않는 이유는 웹을 아는 사람이 f12나 관리자도구 등을 활용하여 해당 값을 임의적으로 지워버리게 되면 해당 옵션이 의미가 없어지기 때문이다.(그래서 이전에도 html, js, java등 모든곳에서 2중 3중으로 유효성검사를 했었지...) 또는 해당 기능이 지원되지 않는 브라우저에서도 동작되지 않을 수 있기때문이다.
_/

-formState
formState은 form태그의 에러들을 찾아준다.
formState.errors를 써두면 submit의 input들의 입력값에 따라 에러가 발생할수 있는 항목들을 object형태로 나열해준다. 에러가 무엇인지는 type값에 들어가 있다.
