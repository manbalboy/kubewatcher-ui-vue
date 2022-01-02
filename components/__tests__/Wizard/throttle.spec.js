import { throttle } from '@/components/Wizard/throttle.js';

describe('throttle', () => {
  test('throttle 함수에 인자값으로 함수, ms 초를 입력하면 그시간 이후에 인자 함수를 실행한다.', () => {
    // given
    const myMock = jest.fn();
    jest.useFakeTimers();
    expect(myMock).toBeCalledTimes(0);

    // when
    throttle(myMock, 10000);
    jest.advanceTimersByTime(10000);

    // then
    expect(myMock).toBeCalledTimes(1);
  });
});
