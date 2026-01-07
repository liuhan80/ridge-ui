// src/constants/fileConstants.js
import { FILE_COMPOSITE, FILE_FOLDER, FILE_IMAGE, FILE_JS, FILE_JSON, FILE_MARKDOWN } from '../../icons/icons.js'

// 接受的上传文件格式
export const ACCEPT_FILES = '.svg,.png,.jpg,.json,.css,.js,.md,.webp,.zip,.gif'

// 创建文件弹窗标题映射
export const CREATE_FILE_TITLES = {
  js: '创建程序文件',
  page: '创建页面',
  text: '创建文本文件',
  folder: '创建目录'
}

// 根节点ID常量
export const ROOT_NODE_ID = -1

// 文件图标映射规则
export const FILE_ICON_MAP = {
  'application/font-woff': <i className='bi bi-fonts' />,
  audio: <i className='bi bi-file-earmark-music' />,
  image: FILE_IMAGE,
  default: <i className='bi bi-file-earmark' />
}

// 文件后缀图标映射
export const FILE_SUFFIX_ICON_MAP = {
  '.svg': FILE_IMAGE,
  '.md': FILE_MARKDOWN,
  '.js': FILE_JS,
  '.json': FILE_JSON
}

// 文件类型图标映射
export const FILE_TYPE_ICON_MAP = {
  page: FILE_COMPOSITE,
  directory: FILE_FOLDER
}

// 提示文本常量
export const TOAST_MESSAGES = {
  createSuccess: (name) => `已经成功创建 ${name}`,
  createFail: (e) => `创建文件失败：${e.message}`,
  renameSuccess: '重命名成功',
  renameFail: (e) => `重命名失败：${e.message}`,
  renameNoNode: '重命名失败：选中的文件/目录不存在',
  renameDuplicate: '重命名失败：名称已存在',
  deleteNoNode: '删除失败：选中的文件/目录不存在',
  deleteOpened: '此页面在工作区已经打开，请先关闭再删除页面',
  deleteSuccess: (name) => `已经成功删除 ${name}`,
  deleteFail: (e) => `删除失败：${e.message}`,
  copyNoNode: '复制失败：文件/目录不存在',
  copySuccess: '文件复制完成',
  copyFail: (e) => `复制失败：${e.message}`,
  uploadZipWarn: 'ZIP 导入功能需自行实现解压逻辑',
  uploadError: '文件添加错误：存在相同名称文件或格式不支持',
  uploadSuccess: '文件上传完成',
  uploadFail: (e) => `文件上传失败：${e.message}`,
  moveNoInfo: '移动失败：缺少拖拽信息',
  moveNoId: '移动失败：拖拽节点ID缺失',
  moveSelf: '无法将节点移动到自身内部',
  moveChild: '无法将节点移动到自身的子目录中',
  moveRoot: '根目录不支持移动',
  moveSuccess: '移动成功',
  moveDuplicate: '移动失败：目标位置已存在同名文件/目录',
  moveFail: (e) => `移动失败：${e.message || '请检查节点权限或网络'}`,
  exportLoading: '正在导出应用，请稍侯...',
  exportSuccess: '应用导出成功（示例）',
  exportFail: (e) => `导出失败：${e.message}`,
  importSuccess: '应用导入成功（示例）',
  importFail: (e) => `导入失败：${e.message}`,
  clearSuccess: '应用已清空',
  clearFail: (e) => `清空失败：${e.message}`
}
