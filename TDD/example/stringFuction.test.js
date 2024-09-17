import { reverseString, capitalizeString } from "./stringFunctions";

describe("stringFunctions", () => {
  describe("reverseString", () => {
    test("reverse a string", () => {
      expect(reverseString("hello")).toBe("olleh");
    });

    test("reverse an empty string", () => {
      expect(reverseString("")).toBe("");
    });
  });

  //describe로 소그룹 구분
  describe("capitalize String", () => {
    test("capitalizes the first letter of a string", () => {
      expect(capitalizeString("hello")).toBe("Hello"); //pass
    });

    test("does not modify an already capitalized string", () => {
      expect(capitalizeString("Hello")).toBe("Hello"); //pass
    });

    test("capitalizes the first letter of a one-letter string", () => {
      expect(capitalizeString("h")).toBe("H"); //pass
    });

    test("does not modify an empty string", () => {
      expect(capitalizeString("")).toBe(""); //pass
    });
  });
});
