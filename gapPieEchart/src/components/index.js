/**
 *@Author: hy-zhangb
 *Date: 2018/6/4 17:49
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/6/4 17:49
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// echarts
import echarts from 'echarts';

// css
import './style.scss';

// GapPieEchart
class GapPieEchart extends Component {
    static propTypes = {
        option: PropTypes.object.isRequired,
        splitItemNum: PropTypes.number.isRequired
    };
    static defaultProps = {
        splitItemNum: 1
    };
    componentDidMount() {

        this.initBehindChart();
        this.initFrontChart();

    }
    initBehindChart = () => {

        const myEchart = echarts.init(ReactDOM.findDOMNode(this.refs['gap-pie-echart-behind']));
        myEchart.setOption(this.props.option);

    };
    initFrontChart = () => {

        const {splitItemNum} = this.props;
        const myEchart = echarts.init(ReactDOM.findDOMNode(this.refs['gap-pie-echart-front']));
        const option = this.calcSplitGapOption(splitItemNum);
        myEchart.setOption(option);

    };
    calcSplitGapOption = (num) => {

        const {option} = this.props;
        return Object.assign(
            {},
            {...option},
            {
                series: option.series.map(v => {

                    return Object.assign(
                        {},
                        {...v},
                        {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            data: v.data.map(w => {

                                return Array
                                    .from({length: parseInt(w.value / num, 10)})
                                    .fill(Object.assign({}, {...w}, {value: num, name: w.name}))
                                    .concat(Object.assign({}, {...w}, {value: w.value % num, name: w.name}));

                            }).reduce((pre, item) => [...pre, ...item], [])
                        }
                    );

                })
            }
        );

    };
    render() {

        return (
            <div className={'hc-gap-pie-echart'}>
                <div className={'gap-pie-echart-behind'} ref='gap-pie-echart-behind' />
                <div className={'gap-pie-echart-front'} ref='gap-pie-echart-front' />
            </div>
        );

    }
}

export default GapPieEchart;
