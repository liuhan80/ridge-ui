import Upload from './Upload.jsx'
import { size, disabled, icon, btnTheme, btnType } from '../props'
import { boolean, string, number, value, onChange, slot, children, divider } from 'ridge-build/src/props.js'
export default {
  name: 'upload',
  title: '上传',
  component: Upload,
  icon: 'icons/upload.svg',
  type: 'react',
  props: [
    value('array', '已选', []),
    boolean('draggable', '可拖拽', false),
    string('fileLimit', '文件类型', ''),
    number('maxSize', '最大(MB)', 10),
    boolean('multiple', '可多选', false),
    slot('renderContent', '自定义内容'),
    boolean('directory', '上传文件夹', false, false),
    boolean('outputUrl', '输出URL', true),
    divider,
    string('btnText', '按钮文本', '点击上传'),
    icon,
    btnType,
    size,
    btnTheme,
    disabled,
    number('iconSize', '大小', 18),
  ],
  events: [onChange],
  width: 300,
  height: 40

}
