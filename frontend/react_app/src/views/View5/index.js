import React, { Component } from 'react';
import BarChart from '../../charts/BarChart';
import SankeyChart from '../../charts/SankeyChart';
import '../../assets/css/views.css';

export default class View5 extends Component {
    render() {
        const {data} = this.props;
        return (
            <div id='view5' className='pane'>
                <div className='header'>Age</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                {/*<BarChart data={data} width={1000} height={550}/>*/}
                <SankeyChart width={1000} height={550}/>
                </div>                
            </div>
        )
    }
}