import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../header-bar-styles';
import { search, setSearchFieldFocusTo } from '../search/search.stores';

const onMouseUp = link => () => {
    search('');
    setSearchFieldFocusTo(false);
    window.location = link;
};

class HeaderMenuItem extends Component {
    constructor() {
        super();

        this.state = {
            hovering: false,
        };
    }

    onMouseEnter = () => {
        this.setState({
            hovering: true,
        });
    }

    onMouseLeave = () => {
        this.setState({
            hovering: false,
        });
    }

    render() {
        const props = this.props;

        const itemStyle = Object.assign({
            backgroundColor: props.selected || this.state.hovering ? '#F5F5F5' : 'transparent',
        }, styles.menuItemLink);

        return (
            <a href={props.action} onMouseUp={onMouseUp(props.action)} style={itemStyle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div><img style={styles.menuItemIcon} src={props.icon} /></div>
                <div style={styles.menuItemLabel}>{props.label}</div>
            </a>
        );
    }
}

HeaderMenuItem.propTypes = {
    action: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

export default HeaderMenuItem;
