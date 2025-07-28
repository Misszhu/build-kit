import { LoaderContext } from 'webpack';
import { getOptions } from 'loader-utils';
import crypto from 'crypto';

interface HashCssLoaderOptions {
  hashLength?: number;
}

// 生成哈希值
function hash(str: string, length: number = 6) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, length);
}

function hashCssLoader(this: LoaderContext<HashCssLoaderOptions>, source: string): string {
  if (!source || source.trim() === '') {
    this.emitError(new Error('CSS source is empty or file not found!'));
    throw new Error('hashCssLoader: CSS source is empty or file not found!');
  }

  const options = getOptions(this as any) as HashCssLoaderOptions || {};
  const hashLength = options.hashLength || 6;

  // 匹配 .className
  const classRegex = /\.([a-zA-Z0-9_-]+)\b/g;
  const classMap: Record<string, string> = {};
  let match: RegExpExecArray | null;

  // 生成映射
  while ((match = classRegex.exec(source))) {
    const className = match[1];
    if (!classMap[className]) {
      classMap[className] = hash(className, hashLength);
    }
  }

  // 替换源码中的类名
  let transformed = source.replace(classRegex, (m, p1) => {
    return '.' + classMap[p1];
  });

  // 导出 JS 模块
  const exportJs =
    'module.exports = ' + JSON.stringify(classMap, null, 2) + ';\n';

  // 返回 JS 代码
  return exportJs;
}

export default hashCssLoader;