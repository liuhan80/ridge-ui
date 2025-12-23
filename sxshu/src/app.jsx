
import React from 'react';
import { Routes, Route } from "react-router-dom";

import MainPage from './mainpage/MainPage.jsx';
import CaseAnalysis from './case/CaseAnalysis.jsx';
import Report from './report/Report.jsx'
import AppealList from './appeal/AppealList.jsx'
import Review from './review/ReviewTable.jsx'
import BreakdownTable from './review/BreakdownTable.jsx'
import Rule from './review/Rule.jsx'
import StatusBookTable from './book/StatusBook.jsx';


// 1. 导入图片，webpack会处理并返回构建后的路径
import fakeHeadImg from './assets/image/fakehead.png';

const App = () => {
  return <div style={{
    display:'flex',
    flexDirection: 'column',
    height: '100%'
  }}>
    <img src={fakeHeadImg} style={{
      width: 1920,
      height: '90px'
    }} alt="fake head" />
    <Routes style={{flex: 1}}>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/case' element={<CaseAnalysis />}></Route>
      <Route path='/report' element={<Report />}></Route>
      {/* 申诉页面 */}
      <Route path='/appeal' element={<AppealList />}></Route>

      {/* 盘点 数据 */}
      <Route path='/review' element={<Review />}></Route>

      {/* 盘点 分项结果 */}
      <Route path='/breakdown' element={<BreakdownTable />}></Route>

      {/* 盘点 规则 */}
      <Route path='/rule' element={<Rule />}></Route>

      {/* 台账 状态字典、故障字典、一次接线图 公用 */}
      <Route path='/book' element={<StatusBookTable />}></Route>
    </Routes>
  </div>
}
export default App;