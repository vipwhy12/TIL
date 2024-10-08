## ℹ️ Test Pyramid

![](./image/Untitled.avif)
**`Unit Testing`**

- 대상 : 단일 기능 혹은 작은 단위의 함수/객체 등
- 가벼운 비용으로 새로운 기능 혹은 개선이 기존의 rule 을 위배하지 않는지 점검

**`Integration Testing`**

- 대상 : 서로 다른 module / system 의 상호작용
- 맞물려 돌아가는 기능이 모여 정상적으로 원하는 기능을 제공하는지 점검ㅊ

**`End-to-End Testing`**

- 대상 : 전체 애플리케이션의 흐름
- 애플리케이션이 제공하는 기능을 사용자 시나리오 기반으로 문제 없는지 점검

## ℹ️ **Test Double**

**테스트 더블**은 실제 컴포넌트를 대체할 수 있도록 하는 대역이다.

실제 컴포넌트에 대해 행동을 모방하고, 이를 통해 기존의 강한 결합도를 낮추고 테스트 중 제어 가능하도록 한다.

`Mock`

- 테스트를 위해 특정 기능에 대해 정해진 응답을 제공하는 객체
- 입력과 상관없이 **어떤 행동** 을 할 지에 초점을 맞춘 객체
- **Mock Library** 를 통해 특정 행동에 대한 출력을 정의

**`Stub`**

- 테스트에 필요한 호출에 대해 미리 준비된 응답을 제공하는 객체
- 입력에 대해 **어떤 상태** 를 반영하는 지에 초점을 맞춘 객체
- **Interface** 기반으로 테스트에서 보고자하는 (혹은 필요로 하는) 구현에 집중한 구현체를 정의

ℹ️ **Testable Code**

- 모든 코드를 테스트 가능하게 구현하는 것을 목표로 진행합니다.
- 모든 테스트 케이스가 성공했다는 것은 목표한 기능이 완성되었다는 것을 의미합니다.
- 테스트 커버리지 100% 가 아니라, 정확히 **기능의 동작을 확인하는 테스트를 작성**해 주세요.
- 주요 기능에서 `private` 접근자, 객체간의 강결합 같이 테스트 불가능한 코드는 가능한 한 지양하는 것이 좋습니다.

- **참고** : [TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)

<aside>
⚠️ 주의 !
단순히 테스트 커버리지 100% 를 목표하기보다 기능에 대해 유의미한 테스트케이스를 고민하고 작성하자

</aside>
