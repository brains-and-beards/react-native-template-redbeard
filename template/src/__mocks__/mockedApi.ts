interface MockedApiParams {
  json: jest.Mock;
  ok: boolean;
  status: number;
  headers: Headers;
}

export const getMockedApiResponse = (
  json = jest.fn(),
  ok = true,
  status = 200,
  headers = new Headers({
    'Content-Type': 'application/json',
  }),
): MockedApiParams => ({
  json,
  ok,
  status,
  headers,
});
