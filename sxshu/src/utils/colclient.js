import axios from 'axios';
import { getNodeRequestUrl } from './utils';

// 基础配置（可根据项目实际情况调整）
const axiosInstance = axios.create({
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

/**
 * 创建记录
 * @param {Object} doc - 要创建的表单数据（包含各字段，如 caseName、province、attachment 等）
 * @param {string} createUrl - 创建接口地址（如 '/coll/user/create'）
 * @returns {Promise<Object>} - 返回创建结果 { success: boolean, data: { id: string }, message: string }
 */
const create = async (doc, createUrl) => {
  try {
    // 1. 参数校验
    if (!createUrl) {
      throw new Error('创建接口地址不能为空');
    }
    if (typeof doc !== 'object' || doc === null) {
      throw new Error('创建数据必须为非空对象');
    }

    // 2. 调用后端创建接口（POST 请求，JSON 格式传参）
    const response = await axiosInstance.post(createUrl, doc);
    const { code, success, data, message: resMsg } = response.data;

    // 3. 结果处理
    if (code === 200 && success) {
      return {
        success: true,
        data, // { id: '_id值' }
        message: resMsg || '创建成功'
      };
    } else {
      throw new Error(resMsg || '创建失败');
    }
  } catch (error) {
    // 4. 异常处理
    const errorMsg = error.response?.data?.message || error.message || '创建请求异常';
    console.error('创建记录失败：', error);
    return {
      success: false,
      data: null,
      message: errorMsg
    };
  }
};

/**
 * 更新记录
 * @param {string} _id - 要更新的记录主键 _id
 * @param {Object} doc - 要更新的字段数据（不含 _id，如 { age: 21, name: '张三' }）
 * @param {string} updateUrl - 更新接口地址（如 '/coll/user/update'）
 * @returns {Promise<Object>} - 返回更新结果 { success: boolean, data: { affectedCount: number }, message: string }
 */
const update = async (_id, doc, tableName) => {
  try {
    // 1. 参数校验
    if (!tableName) {
      throw new Error('更新接口地址不能为空');
    }
    if (!_id || typeof _id !== 'string') {
      throw new Error('记录 _id 不能为空且必须为字符串');
    }
    if (typeof doc !== 'object' || doc === null) {
      throw new Error('更新数据必须为非空对象');
    }

    // 2. 构造更新参数（包含 _id，后端以此为依据更新）
    const updateData = {
      _id,
      ...doc
    };

    const updateUrl = getNodeRequestUrl(`/coll/${tableName}/doc/update`)
    // 3. 调用后端更新接口（POST 请求）
    const response = await axiosInstance.post(updateUrl, updateData);
    const { code, data, message: resMsg } = response.data;

    // 4. 结果处理
    if (code === '0') {
      return {
        success: true,
        data, // { affectedCount: 1 }
        message: resMsg || '更新成功'
      };
    } else {
      throw new Error(resMsg || '更新失败');
    }
  } catch (error) {
    // 5. 异常处理
    const errorMsg = error.response?.data?.message || error.message || '更新请求异常';
    console.error('更新记录失败：', error);
    return {
      success: false,
      data: null,
      message: errorMsg
    };
  }
};

/**
 * 删除记录
 * @param {string} _id - 要删除的记录主键 _id
 * @param {string} removeUrl - 删除接口地址（如 '/coll/user/{_id}'，需拼接 _id）
 * @returns {Promise<Object>} - 返回删除结果 { success: boolean, data: { deletedCount: number }, message: string }
 */
const remove = async (_id, tableName) => {
  try {
    // 1. 参数校验
    if (!_id || typeof _id !== 'string') {
      throw new Error('记录 _id 不能为空且必须为字符串');
    }
    if (!tableName) {
      throw new Error('删除接口地址不能为空');
    }

    const removeUrl = getNodeRequestUrl(`/coll/${tableName}/doc/${_id}`)

    // 3. 调用后端删除接口（DELETE 请求）
    const response = await axiosInstance.delete(removeUrl);
    const { code, success, data, message: resMsg } = response.data;

    // 4. 结果处理
    if (code === 200 && success) {
      return {
        success: true,
        data, // { deletedCount: 1 }
        message: resMsg || '删除成功'
      };
    } else {
      throw new Error(resMsg || '删除失败');
    }
  } catch (error) {
    // 5. 异常处理
    const errorMsg = error.response?.data?.message || error.message || '删除请求异常';
    console.error('删除记录失败：', error);
    return {
      success: false,
      data: null,
      message: errorMsg
    };
  }
};



/**
 * 删除记录
 * @param {string} _id - 要删除的记录主键 _id
 * @param {string} removeUrl - 删除接口地址（如 '/coll/user/{_id}'，需拼接 _id）
 * @returns {Promise<Object>} - 返回删除结果 { success: boolean, data: { deletedCount: number }, message: string }
 */
const batchRemove = async (tableName, query) => {
  try {
    if (!tableName) {
      throw new Error('删除接口地址不能为空');
    }

    const removeUrl = getNodeRequestUrl(`/coll/${tableName}/doc/batchremove`)

    const queryString = new URLSearchParams(query).toString();

    // 3. 调用后端删除接口（DELETE 请求）
    const response = await axiosInstance.delete(removeUrl + '?' + queryString);
    const { code, data, message: resMsg } = response.data;

    // 4. 结果处理
    if (code === '0') {
      return {
        success: true,
        data, // { deletedCount: 1 }
        message: resMsg || '删除成功'
      };
    } else {
      throw new Error(resMsg || '删除失败');
    }
  } catch (error) {
    // 5. 异常处理
    const errorMsg = error.response?.data?.message || error.message || '删除请求异常';
    console.error('删除记录失败：', error);
    return {
      success: false,
      data: null,
      message: errorMsg
    };
  }
};

// 导出方法供组件使用
export { create, update, remove, batchRemove };