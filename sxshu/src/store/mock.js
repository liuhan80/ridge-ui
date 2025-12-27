
// 1. 全国34个省级行政区列表（按常用顺序排列）
const provinces = ['天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];

// 2. 生成10到100之间的随机整数（包含边界值）
const getRandomNum = () => {
  return Math.floor(Math.random() * 91) + 10; // Math.random()生成0-1的数，*91得到0-90.999，+10得到10-100.999，取整后是10-100
};


// 3. 生成最终的分数数据数组
const scores = provinces.map((name) => {
  // 北京的各项值固定为100
  if (name === '北京') {
    return {
      name,
      total: 100,
      status: 100,
      error: 100,
      line: 100,
      energy: 100
    };
  }
  // 其他省市随机生成10-100的数值
  return {
    name,
    total: getRandomNum(),
    status: getRandomNum(),
    error: getRandomNum(),
    line: getRandomNum(),
    energy: getRandomNum()
  };
});

const getFarmListRind = () => {
  // 生成包含50条风电场数据的数组
  const windFarmData = [];

  // 循环生成50条记录
  for (let i = 0; i < 50; i++) {
    // 序号：从1到50
    const serialNumber = i + 1;
    // 风电场名称：风电场1、风电场2...
    const windFarmName = `风电场${serialNumber}`;
    // 得分：从100依次向下，即100、99、98...51
    const score = 100 - i;
    // 同比得分：在当前得分基础上±5以内的随机数（保留1位小数，模拟真实数据）
    const yearOnYearScore = (score + (Math.random() * 10 - 5)).toFixed(1);
    // 同比排名：1到50的随机整数
    const yearOnYearRank = Math.floor(Math.random() * 50) + 1;
    // 场站排名：1到50的随机整数
    const stationRank = Math.floor(Math.random() * 50) + 1;

    // 将每条数据添加到数组中
    windFarmData.push({
      serialNumber, // 序号
      windFarmName, // 风电场名称
      score, // 得分
      yearOnYearScore: Number(yearOnYearScore), // 同比得分（转换为数字类型）
      yearOnYearRank, // 同比排名
      stationRank, // 场站排名
    });

  }
  return windFarmData;
}

const rankFarmList = getFarmListRind();

const provincesList = provinces.map(pr => {
  return {
    label: pr,
    value: pr
  }
})

export {
  rankFarmList,
  provincesList,
  scores
}