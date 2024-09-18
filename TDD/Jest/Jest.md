## 기본 패턴

```javascript
describe("그룹명", () => {
  //describe 생략가능
  test("테스트 설명", () => {
    expect("검증대상").toXxx("기대결과");
  });
});
```

## 기본 함수

- `describe()`: Jest에서 제공하는 테스트 스위트 함수, 테스트를 그룹화할 때 사용한다.
- `test()` 또는 `it()`: 테스트를 작성할 때 사용한다. `it()` 는 `test()` 의 alias이다.
- `expect()`: 실제 테스트를 수행할 때 예상되는 값을 검사한다. `expect()` 와 함께 다양한 Matcher함수를 사용하여 테스트를 작성할 수 있다.
- `beforeEach()`: 각 테스트가 실행되기 전에 반복 실행될 코드를 작성한다.
- `afterEach()`: 각 테스트가 실행된 후에 반복 실행될 코드를 작성한다.
- `beforeAll()`: 모든 테스트가 실행되기 전에 한 번 실행될 코드를 작성한다.
- `afterAll()`: 모든 테스트가 실행된 후에 한 번 실행될 코드를 작성한다.

### Matcher

- `toBe()` : 값이 정확하게 같은지 검사한다. 값의 타입까지 정확하게 검사해야하는 경우 사용한다,.
- `toEqual()` : 값이 동등한지 검사한다. 객체 또는 배열과 같은 데이터 구조의 값들을 비교할 때 사용한다.
    <aside>
    💡 `toBe()`와 `toEqual()`의 차이
    원시적인 타입(number, boolean, string, null)을 사용하면 큰 차이가 없다. 하지만 객체 또는 배열의 경우 차이가 있다.
    `toBe()`는 비교하는 두 자료의 참조를 비교하고 `toEqual()`은 비교하는 두 자료의 값들을 비교한다.
    
    객체의 경우,
    
    `toBe()`는 두 개의 변수나 객체가 동일한 객체인지를 확인하기 위해 사용된다. 즉, 메모리 상에서 동일한 위치에 저장된 값을 가리키는 경우에만 참으로 판별된다. 자바스크립트에서 `===` 연산자를 사용하여 비교하는 것과 유사하다.
    
    반면에, `toEqual` 함수는 두 개의 변수나 객체가 동일한 값을 가지는지를 확인하기 위해 사용된다. 이 함수는 객체 내부의 모든 속성 및 값이 일치하는 경우에 참으로 판별된다. 자바스크립트에서 `==` 연산자를 사용하여 비교하는 것과 유사하다.
    
    예를 들어, 다음과 같다.
    
    ```jsx
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(obj1).toBe(obj2); // fail
    expect(obj1).toEqual(obj2); // pass
    ```
    
    `toBe()`로 비교했을 때 false인 이유는 두 객체가 메모리 상에서 서로 다른 위치에 저장되기 때문이다. 반면에 `toEqual()`로 비교했을 때 두 객체의 속성 값이 모두 같으므로 true를 반환한다.
    예를 들어, `expect({a: 1, b: 2}).toEqual({b: 2, a: 1})`과 같이 객체의 프로퍼티 순서가 다르더라도 값이 일치하면 테스트가 통과된다.
    
    배열의 경우에도 마찬가지이다.
    
    ```jsx
    test('toBe test', () => {
      const a = [1, 2, 3];
      const b = [1, 2, 3];
      expect(a).toBe(b); // fail
    });
    
    test('toEqual test', () => {
      const a = [1, 2, 3];
      const b = [1, 2, 3];
      expect(a).toEqual(b); // pass
    });
    ```
    
    `toBe()`는 a와 b의 참조가 다르기 때문에 false를 반환하고 `toEqaul()`은 값을 비교하여 두 배열의 값이 같으므로 true를 반환한다.
    
    </aside>

- `toStrictEqaul()` : `toEqual()`과 같지만 특정 요소에 undefined가 포함되는 것을 허용하지 않는다.
- `not.toBe()` : 값이 다른지 검사한다.
- `not.toEqual()` : 값이 동등하지 않은지 검사한다.
- `toBeTruthy()` : 값이 truthy한 값인지 검사한다.
- `toBeFalsy()` : 값이 falsy한 값인지 검사한다.
    <aside>
    💡 자바스크립트 규칙에 의해 다음과 같은 값들은 falsy한 값으로 간주된다.
    `false`, `0`, `''(빈 문자열)`, `undefined`, `NaN`
    이 외 나머지 값들은 모두 truthy한 값으로 간주된다.
    
    </aside>

- `toThrow()` : 예외를 던지는 함수를 검사한다.
- `toContain()` : 값이 배열이나 문자열 안에 포함되어 있는지 검사한다.
- `not.toContain()` : 값이 배열이나 문자열 안에 포함되어 있는지 검사한다.
- `toBeDefined()` : 값이 정의되어 있는지 검사한다.
- `toBeUndefined()` : 값이 정의되어 있지 않은지 검사한다.
- `toBeNull()` : 값이 null인지 검사한다.
- `toBeGreaterThan()` : 값이 주어진 값보다 큰지 검사한다.
- `toBeGreaterThanOrEqual()` : 값이 주어진 값보다 크거나 같은지 검사한다.
- `toBeLessThan()` : 값이 주어진 값보다 작은지 검사한다.
- `toBeLessThanOrEqual()` : 값이 주어진 값보다 작거나 같은지 검사한다.
- `toHaveBeenCalledTimes()` : 함수가 호출된 횟수를 검사한다.
- `toHaveBeenCalledWith()` : 함수가 특정 인수와 함께 호출되었는지 검사한다.
