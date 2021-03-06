import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import ModeEdit from 'material-ui-icons/ModeEdit';

import WriteInterpretationDialog from './WriteInterpretationDialog';

class WriteInterpretationMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onDialogReturn = success => () => {
        const { onWriteInterpretation, onWriteInterpretationError } = this.props;

        this.toggleWriteInterpretationDialog();

        if (success && onWriteInterpretation) {
            onWriteInterpretation();
        } else if (onWriteInterpretationError) {
            onWriteInterpretationError();
        }
    };

    toggleWriteInterpretationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleWriteInterpretationDialog}>
                    <ListItemIcon>
                        <ModeEdit />
                    </ListItemIcon>
                    <ListItemText primary="Write interpretation" />
                </MenuItem>
                {favoriteModel ? (
                    <WriteInterpretationDialog
                        open={this.state.dialogIsOpen}
                        favoriteModel={favoriteModel}
                        onRequestClose={this.toggleWriteInterpretationDialog}
                        onRequestWriteInterpretation={this.onDialogReturn(true)}
                        onRequestWriteInterpretationError={this.onDialogReturn(false)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

WriteInterpretationMenuItem.contextTypes = {
    d2: PropTypes.object,
};

WriteInterpretationMenuItem.defaultProps = {
    enabled: false,
    favoriteModel: null,
    onWriteInterpretation: null,
    onWriteInterpretationError: null,
};

WriteInterpretationMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onWriteInterpretation: PropTypes.func,
    onWriteInterpretationError: PropTypes.func,
};

export default WriteInterpretationMenuItem;
