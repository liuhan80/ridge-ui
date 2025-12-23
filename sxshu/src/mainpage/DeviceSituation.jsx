import React from 'react'
import Metric3 from '../components/metric3/Metric3'
import deviceImage from '../assets/image/wt.png'
import inverterImage from '../assets/image/inverter.png'
import boosterImage from '../assets/image/booster.png'

const DeviceSituation = () => {
    return <div className='device-situation'>
        <Metric3 icon={deviceImage} label="风机" unit="台" value={211}></Metric3>
        <Metric3 icon={inverterImage} label="逆变器" unit="台" ></Metric3>
        <Metric3 icon={boosterImage} label="升压站" unit="座" value={21}></Metric3>
    </div>
}

export default DeviceSituation