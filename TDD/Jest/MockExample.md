## Mock 객체 생성 방법

### 1. `jest.fn()` 함수 사용

가장 기본적인 전략으로 함수를 mock 함수로 재할당 하는 것이다. 재할당 된 함수가 쓰이는 어디서든지 mock 함수가 원래의 함수 대신 호출된다.

```jsx
//math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => b - a;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => b / a;
```

```jsx
//app.js
import * as math from "./math.js";

export const doAdd = (a, b) => math.add(a, b);
export const doSubtract = (a, b) => math.subtract(a, b);
export const doMultiply = (a, b) => math.multiply(a, b);
export const doDivide = (a, b) => math.divide(a, b);
```

```jsx
//mock.test.js
import * as app from "./app";
import * as math from "./math";

math.add = jest.fn();
math.subtract = jest.fn();

//
test("calls math.add", () => {
  app.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
  //app.doAdd()가 인자 1,2와 함께 불렸는지 테스트
}); //pass

test("calls math.subtract", () => {
  app.doSubtract(1, 3);
  expect(math.subtract).toHaveBeenCalledTimes(1);
  //app.doSubtract가 한 번 불렸는지 테스트
}); //pass

//가짜 함수 호출 방법
const mockFn = jest.fn();
mockFn(); // undefined
mockFn(1); //undefined
mockFn("a"); //undefined
mockFn([1, 2], { a: "b" }); //undefined

mockFn.mockReturnValue("I am a mock!");
console.log(mockFn()); //I am a mock!
```

### 2. `jest.mock()` 함수 사용

exports 하는 모든 함수들을 자동으로 mocking 해준다.
`jest.mock('./math.js')`를 하게 되면 다음과 같이 설정한 것과 같다

```javascript
export const add = jest.fn();
export const substract = jest.fn();
export const multiply = jest.fn();
export const divide = jest.fn();
```

```javascript
//mock.test.js
import * as app from "./app";
import * as math from "./math";

// Set all module functions to jest.fn
jest.mock("./math.js");

test("calls math.add", () => {
  app.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
});

test("calls math.subtract", () => {
  app.doSubtract(1, 2);
  expect(math.subtract).toHaveBeenCalledWith(1, 2);
});
```

### 3. `jest.spyOn()`

일반적으로 `jest.fn()` 과 `jest.mock()` 은 기존 구현을 대체하고 mockgin한다. 하지만 `spyOne()` 은 기존 구현을 유지하면서 특정 동작을 추가하거나 수정할 때 유용하다.

- 메소드가 실행되는 것을 살펴보는 것 뿐만 아니라 기존의 구현이 보존 되길 바랄때 사용
- 구현을 mocking 하고 차후에 원본을 복원할 수 있다.

```javascript
import * as app from "./app";
import * as math from "./math";

test("calls  math.add", () => {
  const addMock = jest.spyOn(math, "add");

  expect(app.doAdd(1, 2)).toEqual(3);
  expect(addMock).toHaveBeenCalledWith(1, 2);
});
```

- `jest.spyOn()`은 `jest.fn()`의 syntactic Sugar이기 때문에 아래와 같이 표현할 수 있다.

```javascript
import * as app from "./app";
import * as math from "./math";

test("calls math.add", () => {
  //원래 구현 저장
  const originalAdd = math.add;

  //원래 구현을 통한 모의 추가
  math.add = jest.fn(originalAdd);

  // spy the calls to add
  expect(app.doAdd(1, 2)).toEqual(3);
  expect(math.add).toHaveBeenCalledWith(1, 2);

  // "mock"이라는 문자열을 반환하도록 설정
  math.add.mockImplementation(() => "mock");
  expect(app.doAdd(1, 2)).toEqual("mock");
  expect(math.add).toHaveBeenCalledWith(1, 2);

  // 원래 구현 복원
  math.add = originalAdd;
  expect(app.doAdd(1, 2)).toEqual(3);
});
```

### 3-1. SpyOn() 예시 코드

spyOn() 함수를 사용하여 원래의 구현을 유지하면서 특정 동작을 추가하는 예시

```javascript
function add(a, b) {
  return a + b;
}

//첫번째 매개변수: 스파이를 생성할 객체
//두번째 매개변수: 스파이를 만들 메서드의 이름
const addSpy = jest.spyOn(add, "add");
addSpy.mockImplementataion((a, b) => a * b + 10);

const result = add(2, 3);

expect(result).toBe(16);

//스파이화 된 add() 함수를 원래대로 복원
addSpy.mockRestore();

//원래의 add() 함수  호출
const originalResult = add(2, 3);

// 검증
expect(originalResult).toBe(5);
```

## 4. MockFn의 메서드

- `mockImplementation(fn)`

```jsx
const mockFn = jest.fn((scalar) => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

//모킹(mock)하여, 원하는 구현으로 대체
mockFn.mockImplementation((scalar) => 36 + scalar);

mockFn(2); // 38
mockFn(3); // 39
```

- `mockImplementationOnce`

```jsx
// 특정 함수가 한 번 호출될 때만 지정된 구현을 사용하도록 설정하는 메서드
// 여러 번 사용할 수 있으며, 호출될 때마다 다른 구현을 적용
// 지정한 횟수만큼 호출된 후에는 원래의 함수 구현이나 기본 모킹된 동작으로 되돌아갑니다.

const mockFn = jest
  .fn(() => "default") // 기본 구현
  .mockImplementationOnce(() => "first call") // 첫 번째 호출 시 'first call' 반환
  .mockImplementationOnce(() => "second call"); // 두 번째 호출 시 'second call' 반환

mockFn(); // 'first call' 반환 (첫 번째 호출)
mockFn(); // 'second call' 반환 (두 번째 호출)
mockFn(); // 'default' 반환 (세 번째 호출, 지정된 구현이 없으므로 기본값)
mockFn(); // 'default' 반환 (네 번째 호출)
```

- `mockReturnValue(value)`

```jsx
const mock = jest.fn();

mock.mockReturnValue(42);
mock(); // 42

mock.mockReturnValue(43);
mock(); // 43
```
