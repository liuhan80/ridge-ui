import React from 'react'
import SectionBox from '../components/section/SectionBox'
import ProgressBar from '../components/progressbar/ProgressBar'
import imageTop3 from '../assets/image/top3.png'
import imageTop5 from '../assets/image/top5.png'
const scoreList = [{
    rank: 1,
    name: '风电场001',
    value: 98
},{
    rank: 2,
    name: '那方看开风电场',
    value: 96.1
}, {
    rank: 3,
    name: '那方看开风电场',
    value: 96.2
}, {
    rank: 4,
    name: '那方看开风电场',
    value: 87.1
},{
    rank: 5,
    name: '那方看开风电场',
    value: 88.0
}]
const FarmList = ({
    list
}) => {
    return <div className='farm-list'>
        {list && list.map((item,index) => {
            return <div className="farm-item" key={index} style={{
                backgroundImage: index < 3 ? `url("${imageTop3}")`: `url("${imageTop5}")`
            }}>
                <div className="farm-rank">{item.rank}</div>
                <div className="farm-name">{item.name}</div>
                <div className="farm-progress"><ProgressBar value={item.value}></ProgressBar></div>
                <div className="farm-value">{item.value}</div>
            </div>
        })}
    </div>
}


const TotalScoreRanking = () => {
    return <SectionBox title='场站总得分排名' content={<FarmList list={scoreList}></FarmList>} contentStyle={{ padding: '20px 14px' }}></SectionBox>
}

export default TotalScoreRanking