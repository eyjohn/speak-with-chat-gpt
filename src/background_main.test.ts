import { main } from './background_main';

test('should have mocked chrome.runtime', () => {
    const chromeMock = {
        runtime: {
            onInstalled: {
                addListener: jest.fn(),
            },
        },
    };

    main(chromeMock as unknown as typeof chrome);
    expect(chromeMock.runtime.onInstalled.addListener).toBeCalledTimes(1);
});
