import React, {Component} from 'react';
import {createPortal, render, unmountComponentAtNode} from 'react-dom';
import {Motion, spring, presets} from 'react-motion';
import PropTypes from 'prop-types';

import './style.scss';

const node = document.createElement('div');

class Message extends Component {
    static propTypes = {
        during: PropTypes.number,
        children: PropTypes.element.isRequired,
        type: PropTypes.oneOf(['success', 'error'])
    };

    constructor() {

        super(...arguments);

        this.state = {
            show: false
        }

        this.destroyedInstance = this.destroyedInstance.bind(this);
    }

    componentDidMount() {

        const {during} = this.props;

        document.body.appendChild(node);

        this.setState({show: true});

        new Promise(resolve => {
            this.timer = setTimeout(() => resolve(), during);
        })
            .then(() => this.destroyedInstance());

    }

    timer = null;

    destroyedInstance() {

        this.setState({show: false}, () => {
            clearTimeout(this.timer);
            unmountComponentAtNode(node);
            document.body.removeChild(node);
        });

    }

    render() {

        const {type} = this.props;
        const {show} = this.state;

        return createPortal(
            <Motion
                defaultStyle={{top: 0, opacity: 0}}
                style={{
                    top: spring(show ? 100 : 0, presets.stiff),
                    opacity: spring(show ? 1 : 0, presets.stiff)
                }}
            >
                {
                    style => {

                        return <div className={`hy-message hy-message-${type}`} style={style}>
                            {
                                type === 'success' ? <i className='iconfont icon-queren' />
                                    : type === 'error' ? <i className='iconfont icon-xinxi1' /> : null
                            }
                            {this.props.children}
                        </div>;

                    }
                }
            </Motion>,
            node
        );

    }
}

export default {
    success: function(txt, during = 3000) {

        render(
            <Message during={during} type='success'><span>{txt}</span></Message>,
            node
        );

    },
    error: function(txt, during = 3000) {

        render(
            <Message during={during} type='error'><span>{txt}</span></Message>,
            node
        );

    }
};

