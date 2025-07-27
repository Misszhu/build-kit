# Build Kit - Webpack Loader 开发工具包

这是一个用于开发 webpack loader 的完整开发环境，包含 TypeScript 支持、测试框架、代码规范工具等。

## 项目结构

```
build-kit/
├── src/
│   ├── loaders/          # loader 源码
│   │   ├── example-loader.ts
│   │   └── comment-loader.ts
│   ├── utils/            # 工具函数
│   │   └── loader-utils.ts
│   └── index.ts          # 主入口文件
├── tests/                # 测试文件
├── examples/             # 示例和测试
├── dist/                 # 编译输出目录
└── 配置文件...
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发命令

```bash
# 编译 TypeScript
npm run build

# 开发模式（监听文件变化）
npm run dev

# 运行测试
npm test

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行示例
npm run example
```

## 包含的 Loader

### 1. Example Loader

在代码前后添加自定义内容。

**用法：**

```javascript
{
  test: /\.js$/,
  use: {
    loader: 'path/to/example-loader',
    options: {
      prefix: '// 前缀\n',
      suffix: '\n// 后缀'
    }
  }
}
```

### 2. Comment Loader

处理代码注释，可以添加头部注释或移除现有注释。

**用法：**

```javascript
{
  test: /\.js$/,
  use: {
    loader: 'path/to/comment-loader',
    options: {
      addHeader: true,
      removeComments: false,
      headerText: '// 自定义头部'
    }
  }
}
```

## 开发新 Loader

1. 在 `src/loaders/` 目录下创建新的 loader 文件
2. 在 `src/index.ts` 中导出新 loader
3. 在 `tests/` 目录下添加测试文件
4. 在 `examples/` 目录下添加使用示例

### Loader 模板

```typescript
import { LoaderContext } from 'webpack';
import { getOptions } from 'loader-utils';

interface LoaderOptions {
  // 定义你的选项类型
}

function myLoader(this: LoaderContext<LoaderOptions>, source: string): string {
  const options = getOptions<LoaderOptions>(this) || {};

  // 添加缓存支持
  this.cacheable();

  // 处理源代码
  const processedSource = source; // 你的处理逻辑

  return processedSource;
}

export default myLoader;
```

## 技术栈

- **Node.js** - 运行环境
- **TypeScript** - 开发语言
- **Webpack** - 模块打包工具
- **Jest** - 测试框架
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

## 许可证

MIT
