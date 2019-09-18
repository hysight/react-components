/**
 *@Author: mll
 *Date: 2018/6/20 14:12
 *@Last Modified by: mll
 *@Last Modified time: 2018/6/20 14:12
 *Email: maliangliang@hiynn.com
 *File Path: hysight-input - index
 *@File Name: index
 *@Description:
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextArea from './TextArea';

import './style.css';

const defaultStyle = {

};

export default class Input extends Component {
    static TextArea = TextArea;
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        size: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        prefix: PropTypes.element,
        suffix: PropTypes.element,
        onPressEnter: PropTypes.func
    };
    static defaultProps = {
        className: '',
        style: {}
    };

    constructor() {

        super();

        this.state = {
            value: ''
        };

        this.returnInput = this.returnInput.bind(this);
        this.addPrefix = this.addPrefix.bind(this);
        this.pressKeyHandler = this.pressKeyHandler.bind(this);
        this.changeInputHandler = this.changeInputHandler.bind(this);

    }

    componentWillMount() {

        const {value} = this.props;
        if(value) this.setState({value});

    }

    /**
     * 按下 enter 键
     */
    pressKeyHandler(e) {

        if(e.which === 13 || e.keyCode === 13) return this.props.onPressEnter(e);

    }

    /**
     * 改变 input 内容
     */
    changeInputHandler(e) {

        this.setState({value: e.target.value});

    }

    /**
     * 返回 input dom
     */
    returnInput() {

        const {size, className, placeholder, style, prefix, suffix} = this.props;
        const paddingStyle = Object.assign(
            {},
            (prefix ? {paddingLeft: 30} : {}),
            (suffix ? {paddingRight: 30} : {})
        );
        return <input
            value={this.state.value}
            type='text'
            style={Object.assign({}, defaultStyle, style, paddingStyle)}
            className={size ? `hy-input hy-input-${size} ${className}` : `hy-input ${className}`}
            placeholder={placeholder}
            onKeyPress={this.pressKeyHandler}
            onChange={this.changeInputHandler}
        />;

    }

    /**
     * 添加 input 前缀
     */
    addPrefix() {

        const {prefix, suffix} = this.props;
        return <div className='hy-input-prefix-wrapper'>
            <span className='hy-input-prefix' style={{left: 10}}>{prefix}</span>
            {this.returnInput()}
            <span className='hy-input-suffix' style={{right: 10}}>{suffix}</span>
        </div>;

    }

    render() {

        const {prefix, suffix} = this.props;

        return (
            prefix || suffix ? this.addPrefix() : this.returnInput()
        );

    }
}
