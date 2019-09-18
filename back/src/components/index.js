/**
 *@Author: hy-zhangb
 *Date: 2018/4/18 18:28
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/4/18 18:28
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - ExpTit
 *@File Name: ExpTit
 *@Description: Description - 实验列表 / 数据源 标题组件
 */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// css
import './style.scss';

// Back
class Back extends PureComponent {
    static propTypes = {
        size: PropTypes.oneOf(['small', 'middle', 'large']),
        title: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.element
        ]),
        href: PropTypes.string,
        path: PropTypes.string
    };
    static defaultProps = {
        size: 'small',
        title: null,
        href: '/home',
        path: ''
    };
    constructor(props, context) {

        super(props, context);
        this.toRenderIcon = this.toRenderIcon.bind(this);
        this.toRenderTit = this.toRenderTit.bind(this);

    }

    toRenderIcon() {

        const {href, path} = this.props;
        if(path) {

            return <Link to={path} className={'go-href icon-fanhui'} />;

        }
        if(href) {

            return <a className='go-href icon-fanhui' href={href} />;

        }
        return null;

    }

    toRenderTit() {

        const {title} = this.props;
        return title ? <span className={'back-content'}>{title}</span> : null;

    }

    render() {

        const {size} = this.props;
        const cls = classNames({
            'hc-back': true,
            [`hc-back-${size}`]: true
        });

        return (
            <span className={cls}>
                {this.toRenderIcon()}
                {this.toRenderTit()}
            </span>
        );

    }
}

export default Back;
