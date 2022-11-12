# Challenge Result🚀
URL : https://myhappyman.github.io/todo-list-app

니콜라스 선생님과 같이 진행해 본 TODO리스트에 추가 기능 작업을 했습니다.

1. 디자인 처리
2. recoil effect쪽에 localstroge저장 및 불러오는 기능
3. 리스트 수정, 삭제 기능 등


# 1. react-hook-form에 대해 알아본다.

> npm install react-hook-form

설치가 완료되면 사용을 위해 `useForm`이라는 hook을 import해야한다.
`useForm`은 다양한걸 제공하는데, 그 중 `register`라는 함수가 있다.
#### `- register`
<b>해당 함수는 input에 특화</b>되어 있다.
onBlur, onChange를 가지고 있다.

생성한 함수 `register`를 input 태그내에 `{...register("이름")} `형태로 넣어서 스프레드 연산자를 통해 자연스럽게 value, onChange, state값등을 처리할 수 있다.

이후 2번째 인자에는 각종 유효성 검사 항목을 object형태로 넣어서 체크할 수 있다.
>{required:true}

>{required:"이름 항목은 필수입니다."}

```Typescript
{
    required:"비밀번호 항목은 필수입니다.",
    minLength: {value:5, message: "비밀번호는 최소 5자리 이상입니다."}
    maxLength: {value:20, message: "비밀번호는 최대 20자리까지 허용합니다."}
    validate: (value) => value.includes("admin") ? "admin은 포함 시킬 수 없습니다." : true

    /* 또는 여러개를 적용할 수도 있다. */
    validate: {
        admin: (value) => value.includes("admin") ? "admin은 포함 시킬 수 없습니다." : true,
        noShin: (value) => value.includes("Shin") ? "Shin은 포함 시킬 수 없습니다." : true,
    }
}
```



#### `- validate`
true가 되면 허용이고 false가 발생하면 오류를 발생시킨다.
또는 문자열이 return되어도 false처럼 오류처리로 인식하고 메시지를 뿜어낸다.

정규식은 `pattern`이라는걸 통해 입력해서 처리 할수 있다.
마찬가지로 `value`에는 패턴을 `message`에는 오류시 발생 메시지를 처리한다.

#### `- watch`
watch는 form에 입력한 값의 변화를 관찰할 수 있게 해준다.
watch를 실행해보면 input에 등록한 toDo라는 값의 입력이 어떤게 변화하고 있는지 다 출력해준다.

#### `- handleSubmit`
`handleSubmit`은 기존의 `form`태그의 `onSubmit`이벤트를 대체한다.
`handleSubmit`을 가지고 `validation(유효성 검사)`를 진행할 수 있다.
`form`태그에 `onSubmit`을 걸고 `handleSubmit`을 넣어준다.
`handleSubmit(arg1, arg2)`에는 2개의 파라미터를 받도록 되어 있다.
> @arg1 : 데이터가 유효한 경우 동작되는 함수 (필수값)

> @arg2 : 데이터가 유효하지 않는 경우 동작되는 함수 (필수 X)

유효하지 않는 데이터 처리를 확인해보기 위해
resgister의 2번째 인자에 required등 속성값 등을 주었다.

- html input자체에도 해당 required등의 기본 옵션을 제공하지만 사용하지 않는 이유는 웹을 아는 사람이 f12나 관리자도구 등을 활용하여 해당 값을 임의적으로 지워버리게 되면 해당 옵션이 의미가 없어지기 때문이다.(그래서 이전에도 html, js, java등 모든곳에서 2중 3중으로 유효성검사를 했었지...) 또는 해당 기능이 지원되지 않는 브라우저에서도 동작되지 않을 수 있기때문이다.


#### `- formState`
`formState`은 form태그의 에러들을 찾아준다.

`formState.errors`를 써두면 submit의 input들의 입력값에 따라 에러가 발생할수 있는 항목들을 object형태로 나열해준다. 에러가 무엇인지는 type값에 들어가 있다.

```Typescript
const { formState:{errors} } = useForm();
```

또한 해당 값을 span태그 등을 활용하여 정의한 message값을 노출시켜서 유효성 검사와 에러메시지를 표출해줄 수 있다.

#### `- setError`
강제로 에러를 발생시켜준다.
id를 입력하는 필드에서 중복체크 기능을 만들떄, 서버에서 체크를 해야할텐데 이미 사용중인 id라면 에러를 발생시켜야한다.

사용법은 아래와 같다.
```Typescript
setError(
   "passwordConfirm", //에러 처리를 할 항목
   {message: "비밀번호가 서로 다릅니다."}, //에러 메시지
   {shouldFocus: true} //에러가 발생한경우 포커스를 할것인지
);
```

#### `- setValue`
특정 항목의 값을 제어할 수 있다.
```Typescript
/*
 * setValue
 * @arg1 : 대상 항목이름
 * @arg2 : 처리할 값
*/
setValue("toDo", "");
```

#### `- defaultValues`
`useForm`안에 object형태로 <b>register에 등록할 이름과 값을 넣으면 기본값을 처리 할 수 있다.</b>
```Typescript
const {
      register, 
      handleSubmit, 
      formState:{errors}
   } = useForm({defaultValues: {email: "@naver.com"}});
```

# 2. recoil

먼저 앞에서 theme 바꾸는 연습을 하면서 recoil을 통해 global state를 다뤄봤다.

```Typescript
const value = useRecoilValue(toDoState); //atom으로 부터 값을 가져옴
const setValue = useSetRecoilState(toDoState); //atom의 값을 변경한다.
```

2개를 통해 제어했는데, 2개 모두 필요한 상황에선 아래처럼 사용하면 된다.
> const [toDo, setToDo] = useRecoilState(toDoState);

기존에 사용하던 useState와 굉장히 흡사하다.

# 3. categories
   
컴포넌트를 나눴고 `onClick`이벤트 처리에 따라 category값을 변경하고 싶다.

`onClick`이벤트를 button요소들마다 줬고 onClick이벤트에서 처리는 아래와 같이 한다.

```JSX
<button onClick={() => onClick("TODO")} />
//onClick={onClick("TODO")} x

/*
또는 태그내 name값을 입력하고 onClick={onClick} 처리 후 메소드 내에서 event를 통해 데이터 값을 알아내도 된다.
*/
const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
   const {currentTarget:{name}} = event;
   console.log("i wanna to ", name);
}
```

# 4. recoil selector
#### `- selector`
selector는 기존에 존재하는 state를 원하는 형태로 변경하여 사용하는 함수입니다.

즉, selector는 state를 가지고 다른 state를 만들어 낼 수 있습니다.

샘플 예제에서 보듯이 TODO, DOING, DONE 3개의 카테고리가 있고, 이 카테고리별로 정리하고 싶다면? 데이터를 출력하기전에 seRecoilValue로 받은 state값을 filter해도 되겠지만, 애초에 selector를 atoms에서 새로 정의해서 filter별로 구분해서 가지고 있다면 어떤 컴포넌트에서든 해당 값들을 필터된걸로 가져올 수 있기때문에 해당 방식을 사용합니다.(원하는 방식으로 데이터를 체계화)

selector에는 key, get을 필수로 object값을 받습니다.
get에는 get object의 파라미터 인자를 받는 함수를 return 해주어야합니다.

# 5. ENUM
그동안 카테고리의 타입들을 "TODO" | "DOING" | "DONE"
형태로 문자열을 적어주다가 반복해서 사용할일이 생겨서 이것또한 type으로 정의하여 type명을 넣어주면서 재사용을 하였다.

하지만 input값이나 select값에서 string으로 된 값들은 제대로 인식하지 못하는 typescript정의에 어긋난 오류가 많아서 불가피하게 any로 처리를 많이 했는데, 이런 문자열로 작성하면서 발생할 수 있는 실수를 방지하기 위해 ENUM인 열거형 처리방식을 사용한다.

열거형이라 부르는 enum은 타입스크립트가 제공하는 기능으로 상수들의 집합을 정의해서 실수를 방지하도록 도와주고 실사용 예시는 아래처럼 사용한다.
```Typescript
//Enum사용하기
enum Categories = {
   "TODO",
   "DOING",
   "DONE"
}
```

이게 끝이다. 타입으로 필요했던 부분들에 모두 Categories로 대체해주면 된다.

enum에서 값들은 <b>우리가 알아보기 좋게 문자열등의 형태로 표기를 해주지만 각각의 값들은 index형태로 숫자로 기억</b>을 하고 있는다.

button태그의 name값등에 enum을 넣어주게되면 그래서 오류가 발생한다. name에는 숫자가 들어갈 수 없기때문이다.

하지만, enum에 <b>문자열로 재정의하는 방법도 있다.</b>
```Typescript
//Enum 문자열로 재정의하기
enum Categories = {
   "TODO"="TODO",
   "DOING"="DOING",
   "DONE"="DONE"
}
```