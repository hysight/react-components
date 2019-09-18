/**
 *@Author: hy-zhangb
 *Date: 2017-06-15 16:48
 * @Last Modified by: Ma Liangliang
 * @Last Modified time: 2017-12-14 18:26:59
 *Email: lovewinders@163.com
 *File Path: //
 *@File Name: tueasy-jiaoguan
 *@Description:
 */
const circleOption = {
    textStyle: {
        fontSize: 20
    },
    title: {
        'text': '总数',
        'subtext': '2578',
        'left': 'center',
        'top': 'middle',
        // 'textAlign': 'center',
        'textBaseline': 'top',
        'textStyle': {
            'fontSize': 12,
            'color': '#fff'
        },
        'subtextStyle': {
            'fontSize': 18,
            'color': '#fff',
            'fontFamily': 'digifaw'
        }
    },
    // color: ['#fdff79', '#1e5a95', '#9debff', '#ff3b2e'],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
        {
            name: '交通情况',
            type: 'pie',
            radius: ['45%', '55%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    lineStyle: {
                        // color: '#ffffff'
                    },
                    length: 40
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 4,
                    borderColor: '#000'
                },
                emphasis: {
                    borderWidth: 0,
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            // selectedOffset: 2,
            data: [
                {value: 1007, name: '其他 \n\n 1007'},
                {value: 5431, name: '群众求助 \n\n 5431'},
                {value: 5294, name: '道路交通 \n\n 5294'},
                {value: 4370, name: '治安类 \n\n 4370'},
                {value: 3544, name: '刑事类 \n\n 3544'},
                {value: 489, name: '涉外案件 \n\n 489'}
            ]
        }
    ]
};
export default circleOption;
