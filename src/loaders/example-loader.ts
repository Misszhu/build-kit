import { LoaderContext } from 'webpack';
import { getOptions } from 'loader-utils';

interface LoaderOptions {
  prefix?: string;
  suffix?: string;
}

/**
 * 示例loader - 在代码前后添加自定义内容
 * @param this webpack loader context
 * @param source 源代码内容
 * @returns 处理后的代码
 */
function exampleLoader(this: LoaderContext<LoaderOptions>, source: string): string {
  const options = getOptions(this as any) as LoaderOptions || {};
  const { prefix = '// 由example-loader处理\n', suffix = '\n// 处理完成' } = options;

  // 添加缓存支持
  this.cacheable();

  // 处理源代码
  const processedSource = `${prefix}${source}${suffix}`;

  return processedSource;
}

export default exampleLoader; 