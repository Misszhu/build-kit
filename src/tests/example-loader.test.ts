import exampleLoader from 'src/loaders/example-loader';

// 模拟 webpack loader context
const createMockContext = (options: any = {}) => ({
  query: options,
  cacheable: jest.fn(),
  resourcePath: '/test/file.js',
  resourceQuery: '',
  async: jest.fn()
});

describe('example-loader', () => {
  it('应该添加默认的前缀和后缀', () => {
    const context = createMockContext();
    const source = 'console.log("hello");';
    const result = exampleLoader.call(context as any, source);

    expect(result).toContain('// 由example-loader处理');
    expect(result).toContain('console.log("hello");');
    expect(result).toContain('// 处理完成');
    expect(context.cacheable).toHaveBeenCalled();
  });

  it('应该支持自定义前缀和后缀', () => {
    const context = createMockContext({
      prefix: '// 自定义前缀\n',
      suffix: '\n// 自定义后缀'
    });
    const source = 'console.log("hello");';
    const result = exampleLoader.call(context as any, source);

    expect(result).toContain('// 自定义前缀');
    expect(result).toContain('console.log("hello");');
    expect(result).toContain('// 自定义后缀');
  });

  it('应该处理空字符串', () => {
    const context = createMockContext();
    const source = '';
    const result = exampleLoader.call(context as any, source);

    expect(result).toContain('// 由example-loader处理');
    expect(result).toContain('// 处理完成');
  });
});