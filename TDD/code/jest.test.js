test("Matchers test", () => {
  expect(1 + 2).toBe(3);
  expect("Hello" + " " + "World").toBe("Hello World");
});

test("ToBe test", () => {
  //Jest에서 ToBe는 엄격한 동등성을 검사하는 매처
  //즉, toBe는 두 값이 같은 객체(메모리 참조)를 가리키는지 확인
  //배열이나 객체를 비교할 때는, 내용이 같더라도 참조하는 객체가 다르면 ToBe는 false를 반환합니다.
  expect([1, 2, 3]).not.toBe([1, 2, 3]);
  expect([1, 2, 3]).toEqual([1, 2, 3]);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;

  expect(data).toEqual({ one: 1, two: 2 });
  expect({ name: "John", age: 30 }).toEqual({ age: 30, name: "John" });
  expect([1, 2, 3]).toEqual([1, 2, 3]);
  expect([1, 2, 3]).not.toEqual([1, 3, 2]);
});

// toBeNull
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
  expect(undefined).not.toBeNull();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test("undefined", () => {
  let b;
  expect(b).toBeUndefined();
  expect(null).not.toBeUndefined();
});

test("truthy falsy", () => {
  expect("hello").toBeTruthy();
  expect("").toBeFalsy();
  expect(0).toBeFalsy();
  expect("0").toBeTruthy();
  expect(1).toBeTruthy();
});

// toContain
test("contain", () => {
  expect("Hello World").toContain("World");
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).not.toContain(4);
});

// toMatch
test("match", () => {
  expect("hello@test.com").toMatch(/\w+@\w+\.\w+/);
  expect("123-456-7890").toMatch(/\d{3}-\d{3}-\d{4}/);
  expect("Hello World").not.toMatch(/\d+/);
});
