/**
 *@Author: mll
 *Date: 2018/6/20 15:57
 *@Last Modified by: mll
 *@Last Modified time: 2018/6/20 15:57
 *Email: maliangliang@hiynn.com
 *File Path: hysight-input - Textarea
 *@File Name: Textarea
 *@Description:
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

const defaultStyle = {

};

export default class TextArea extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        className: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.object,
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

        this.changeTextAreaHandler = this.changeTextAreaHandler.bind(this);
        this.pressKeyHandler = this.pressKeyHandler.bind(this);

    }

    componentWillMount() {

        const {value} = this.props;
        if(value) this.setState({value});

    }

    /**
     * 改变 textarea 内容
     */
    changeTextAreaHandler(e) {

        this.setState({value: e.target.value});

    }

    /**
     * 按下 enter 键
     */
    pressKeyHandler(e) {

        if(e.which === 13 || e.keyCode === 13) return this.props.onPressEnter(e);

    }

    render() {

        const {placeholder, className, id, name, style} = this.props;

        return (
            <textarea
                placeholder={placeholder}
                name={name}
                id={id}
                cols='30'
                rows='10'
                className={`hy-input hy-textArea ${className}`}
                style={Object.assign({}, defaultStyle, style)}
                value={this.state.value}
                onChange={this.changeTextAreaHandler}
                onKeyPress={this.pressKeyHandler}
            />
        );

    }
}
