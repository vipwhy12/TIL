## 왜 TDD가 중요할까?

코드의 규모는 점점 커지고, 유저가 많아짐에 따라 예측하기 힘든 행동 패턴들에 의한 장애가 발생하기 시작합니다. **빠른 변화에도 유연하고 안전하게**(요구사항이 변경되었을 때, 기존의 기능에 대한 영향은 없는가?)새로운 기능을 적용하고 변경할 수 있는 기반을 다질 수 있는 TDD에 대한 중요성이 대두됩니다.

## TDD란

- TDD란 소프트웨어 설계 방법론이다.
- 테스트 시나리오 또한 언제든 바뀔 수 있다.
- 테스트 코드에서는 **실패** 케이스가 우선되어야 합니다.
- 모든 경우를 테스트하는 것이 아니다.

## 실패 케이스가 우선되는 TestCode 예시

```javascript
// 성공 케이스 보다는 실패 케이스에 초점
describe("정보의 생성과 실패", () => {
  describe("각 모델의 정보를 생성하는 예시들은 다음과 같다.", () => {
    const user = createUser("ID", "PW", "name", "addr");
    const product = createProduct(
      "productNo",
      "productName",
      1000,
      1,
      true,
      true
    );

    test("user 정보 생성 예시", () => {
      expect(user).toEqual(
        new User(user.userID, user.userPW, user.userName, user.userAddr)
      );
    });

    test("product 정보 생성 예시", () => {
      expect(product).toEqual(
        new Product(
          product.productNo,
          product.productName,
          product.productPrice,
          product.productCount,
          product.isValid,
          product.canRefund
        )
      );
    });

    test("order 정보 생성 예시", () => {
      const order = createOrder(user, product, 1);
      expect(order).toEqual(
        new Order(
          order.orderNo,
          order.userID,
          order.productNo,
          order.productName,
          order.productPrice,
          order.orderTime,
          order.orderCount,
          order.addr,
          order.state
        )
      );
    });

    test("pay 정보 생성 예시", () => {
      const order = createOrder(user, product, 1);
      const pay = createPay(user, order, PayMethod.Card);
      expect(pay).toEqual(
        new Pay(pay.payNo, pay.payMethod, pay.payPrice, pay.payTime)
      );
    });

    test("refund 정보 생성 예시", () => {
      const order = createOrder(user, product, 1);
      const pay = createPay(user, order, PayMethod.Card);
      const refund = createRefund(user, order, pay);
      expect(refund).toEqual(
        new Refund(
          refund.refundNo,
          refund.refundPrice,
          refund.userID,
          refund.payMethod,
          refund.refundTime
        )
      );
    });
  });

  // 생성할 수 없는 경우에 집중!
  describe("아래와 같은 경우 각 정보를 생성할 수 없다", () => {
    // 이 안에서 여러 정보를 생성하는 경우를 생각해볼 수 있습니다.
    // 정보를 생성할 수 없는 에러 케이스들은 어떤 것이 있을까 생각하면, 데이터베이스에서 Schema를 강제 한다거나
    // 타입, 꼴을 강제한다 거나 하는 것들로 이해해볼 수 있습니다.
  });
});
```

## 참고한 글

- [“**테스트 코드 없이 레거시 코드를 다 감수하시겠습니까?**](https://techblog.woowahan.com/2613/)
- http://cloudrain21.com/test-driven-development
