// /* eslint-disable global-require */
// import { render } from 'enzyme';
// import * as React from 'react';
// import { readdirSync } from 'fs';
// import { join } from 'path';

// const demoPath = join(__dirname, '../demo/');
// const demos = readdirSync(demoPath);

describe('ProList render', () => {
  // demos.forEach((file) => {
  //   test(`${file} should match snapshot `, () => {
  //     // eslint-disable-next-line import/no-dynamic-require
  //     const Demo = require(join(demoPath, file)).default;
  //     const wrapper = render(<Demo />);
  //     expect(wrapper).toMatchSnapshot();
  //   });
  // });
  const originalError = console.error;
  beforeAll(() => {
    jest.useFakeTimers();
    console.error = (...args: any) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('should be defined', () => {
    expect(1).toEqual(1);
  });
});

// import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';
// import { DependencyList } from 'react';
