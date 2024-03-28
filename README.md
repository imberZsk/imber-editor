## 项目资源

## 项目介绍

## 项目亮点

- 代理解决跨域
- 动态引入 ali-oss，减小包体积
- 阿里云 oss 图片上传
- 气泡栏朝下 [https://atomiks.github.io/tippyjs/v6/all-props/](tippyjs)
- tiptap-markdown第三方插件有待考虑
-

获取实例后重新设置气泡栏位置

```js
instanceRef.current.setProps({ placement: 'bottom-start' })

tippyOptions: {
  placement: pos,
  onHidden: () => {
    onOpenChange(false)
  },
  onCreate: (val: any) => {
    instanceRef.current = val
  },
  moveTransition: 'transform 0.15s ease-out'
}
```
