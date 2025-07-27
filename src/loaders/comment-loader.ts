import { LoaderContext } from 'webpack';
import { getOptions } from 'loader-utils';

interface CommentLoaderOptions {
  addHeader?: boolean;
  removeComments?: boolean;
  headerText?: string;
}

/**
 * 注释处理loader - 添加或移除代码注释
 * @param this webpack loader context
 * @param source 源代码内容
 * @returns 处理后的代码
 */
function commentLoader(this: LoaderContext<CommentLoaderOptions>, source: string): string {
  const options = getOptions(this as any) as CommentLoaderOptions || {};
  const {
    addHeader = false,
    removeComments = false,
    headerText = '// 由comment-loader处理'
  } = options;

  // 添加缓存支持
  this.cacheable();

  let processedSource = source;

  // 移除注释
  if (removeComments) {
    processedSource = processedSource
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
      .replace(/\/\/.*$/gm, ''); // 移除单行注释
  }

  // 添加头部注释
  if (addHeader) {
    processedSource = `${headerText}\n${processedSource}`;
  }

  return processedSource;
}

export default commentLoader; 