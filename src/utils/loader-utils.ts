import { LoaderContext } from 'webpack';
import path from 'path';

/**
 * 获取文件扩展名
 * @param filePath 文件路径
 * @returns 文件扩展名
 */
export function getFileExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

/**
 * 检查文件是否为特定类型
 * @param filePath 文件路径
 * @param extensions 扩展名数组
 * @returns 是否为指定类型
 */
export function isFileType(filePath: string, extensions: string[]): boolean {
  const ext = getFileExtension(filePath);
  return extensions.includes(ext);
}

/**
 * 获取loader选项的辅助函数
 * @param context loader上下文
 * @returns 选项对象
 */
export function getLoaderOptions<T = any>(context: LoaderContext<T>): T {
  try {
    // 这里可以添加自定义的选项解析逻辑
    return context.query as T;
  } catch (error) {
    console.warn('Failed to parse loader options:', error);
    return {} as T;
  }
}

/**
 * 生成唯一的缓存键
 * @param context loader上下文
 * @param additionalData 额外的数据
 * @returns 缓存键
 */
export function generateCacheKey(
  context: LoaderContext<any>,
  additionalData?: string
): string {
  const resourcePath = context.resourcePath;
  const resourceQuery = context.resourceQuery || '';
  const data = additionalData || '';

  return `${resourcePath}${resourceQuery}${data}`;
}

/**
 * 异步处理函数包装器
 * @param fn 异步函数
 * @returns 包装后的函数
 */
export function asyncWrapper<T extends any[], R extends string | Buffer>(
  fn: (...args: T) => Promise<R>
) {
  return function (this: LoaderContext<any>, ...args: T): void {
    const callback = this.async();

    fn.apply(this, args)
      .then((result) => callback(null, result))
      .catch((error) => callback(error));
  };
} 