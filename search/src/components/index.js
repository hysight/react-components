/**
 *@Author: hy-zhangb
 *Date: 2018/5/22 18:38
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/5/22 18:38
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - index
 *@File Name: index
 *@Description: Description
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// css
import './style.scss';

// Search
class Search extends PureComponent {
    static propTypes = {
        placeholder: PropTypes.string,
        size: PropTypes.oneOf(['default', 'small', 'middle', 'large']),
        shape: PropTypes.oneOf(['default', 'circle', 'gray']),
        style: PropTypes.object,
        onKeyDown: PropTypes.func,
        onPressEnter: PropTypes.func
    };
    constructor(props, context) {

        super(props, context);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    handleKeyDown(event) {

        const { onPressEnter, onKeyDown } = this.props;
        if(event.keyCode === 13 && onPressEnter) {

            onPressEnter(event);

        }
        if(onKeyDown) {

            onKeyDown(event);

        }

    }

    render() {

        const {
            placeholder,
            size = 'default',
            shape = 'default',
            style,
            onPressEnter,
            ...otherProps
        } = this.props;
        return (
            <span
                className={`hc-search hc-search-size-${size} hc-search-shape-${shape}`}
                style={{...style}}
            >
                <span className={'hs-ipt-suffix'}>
                    <i className={'hs-icon-search icon iconfont icon-sousuo'} />
                </span>
                <input
                    {...otherProps}
                    type={'text'}
                    className={'hs-ipt'}
                    placeholder={placeholder}
                    // onChange={onChange}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                />
            </span>
        );

    }
}

export default Search;
