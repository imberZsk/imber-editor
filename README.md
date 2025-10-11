# Imber Editor - 现代化富文本编辑器

一个基于 Next.js 和 Tiptap 构建的现代化富文本编辑器，提供丰富的编辑功能和优雅的用户体验。

## ✨ 功能特性

### 🎨 核心编辑功能

- **富文本编辑**: 支持粗体、斜体、下划线、删除线等基础格式
- **标题层级**: 支持 H1-H4 标题格式
- **文本对齐**: 左对齐、居中、右对齐
- **列表功能**: 有序列表、无序列表、任务列表
- **文本高亮**: 多色彩高亮标记
- **上下标**: 支持上标和下标格式

### 🖼️ 媒体支持

- **图片上传**: 支持拖拽上传和粘贴上传
- **图片块**: 自定义图片块组件，支持多种布局
- **文件处理**: 支持多种图片格式 (PNG, JPEG, GIF, WebP)

### 📊 表格功能

- **表格编辑**: 完整的表格创建和编辑功能
- **表格菜单**: 行和列的操作菜单
- **表格样式**: 支持表格头部和单元格样式

### 🎯 交互功能

- **气泡菜单**: 选中文本时显示格式工具栏
- **斜杠命令**: 输入 `/` 触发快速命令菜单
- **拖拽处理**: 支持拖拽重排内容
- **链接管理**: 智能链接检测和编辑

### 🎨 用户体验

- **响应式设计**: 适配桌面和移动设备
- **暗色模式**: 支持明暗主题切换
- **自动保存**: 标题自动保存到本地存储
- **占位符提示**: 友好的编辑提示

## 🛠️ 技术栈

### 前端框架

- **Next.js 14**: React 全栈框架
- **React 18**: 用户界面库
- **TypeScript**: 类型安全的 JavaScript

### 编辑器核心

- **Tiptap**: 现代化的富文本编辑器框架
- **Tiptap Pro**: 专业版扩展功能
- **Tiptap Extensions**: 丰富的扩展插件

### UI 组件

- **Radix UI**: 无样式的 UI 组件库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Lucide React**: 精美的图标库
- **Ant Design**: 企业级 UI 设计语言

### 状态管理

- **React Hooks**: 函数式状态管理
- **use-debounce**: 防抖处理
- **React Hook Form**: 表单状态管理

### 数据库与认证

- **Prisma**: 现代化数据库 ORM
- **MySQL**: 关系型数据库
- **NextAuth.js**: 身份认证解决方案

### 开发工具

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Husky**: Git 钩子管理
- **Commitlint**: 提交信息规范

## 🚀 快速开始

### 环境要求

- Node.js >= 20.9.0
- pnpm (推荐) 或 npm

### 安装依赖

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install
```

### 环境配置

创建 `.env.local` 文件并配置以下环境变量：

```env
# 数据库配置
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# NextAuth 配置
AUTH_SECRET="your-auth-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# 其他配置
NEXTAUTH_URL="http://localhost:3000"
```

### 数据库设置

```bash
# 生成 Prisma 客户端
pnpm prisma generate

# 推送数据库模式
pnpm db:push

# 或运行迁移
pnpm prisma migrate dev
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── editor/            # 编辑器页面
│   ├── api/               # API 路由
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── editor/            # 编辑器相关组件
│   │   ├── extension-*/   # 各种编辑器扩展
│   │   ├── tiptap.tsx     # 主编辑器组件
│   │   └── extensions.ts  # 扩展配置
│   └── ui/                # 基础 UI 组件
├── lib/                   # 工具库
│   ├── db.ts              # 数据库连接
│   ├── utils.ts           # 工具函数
│   └── actions.ts         # 服务端操作
└── styles/                # 样式文件
    └── globals.css        # 全局样式
```

## 🎯 编辑器扩展

### 内置扩展

- **StarterKit**: 基础编辑功能
- **BubbleMenu**: 气泡菜单
- **Placeholder**: 占位符提示
- **TaskList/TaskItem**: 任务列表
- **TextAlign**: 文本对齐
- **Highlight**: 文本高亮
- **Link**: 链接处理
- **Table**: 表格功能

### 自定义扩展

- **Slash Commands**: 斜杠命令菜单
- **Image Block**: 自定义图片块
- **Image Upload**: 图片上传处理
- **Column/Columns**: 多列布局
- **Document**: 文档结构

## 🔧 开发指南

### 添加新的编辑器扩展

1. 在 `src/components/editor/extension-*` 目录下创建扩展
2. 在 `extensions.ts` 中导入并配置扩展
3. 在 `tiptap.tsx` 中使用扩展

### 自定义样式

- 使用 Tailwind CSS 类名
- 在 `src/styles/globals.css` 中添加全局样式
- 利用 CSS 变量实现主题切换

### 数据库操作

- 使用 Prisma 进行数据库操作
- 在 `src/lib/actions.ts` 中定义服务端操作
- 遵循 Next.js App Router 的最佳实践

## 📚 相关文档

- [编辑器功能文档](https://imber-docs.netlify.app/editor/editor-all/editor-all.html)
- [Tiptap 官方文档](https://tiptap.dev/)
- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：

- [Tiptap](https://tiptap.dev/) - 优秀的富文本编辑器框架
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Radix UI](https://www.radix-ui.com/) - 无样式 UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

**Imber Editor** - 让内容创作更加优雅和高效 🚀
