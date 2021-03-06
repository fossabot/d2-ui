import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog/Dialog';
import { getTranslationFormFor } from './TranslationForm.component';

class TranslationDialog extends Component {
    constructor(props, context) {
        super(props, context);

        this.i18n = props.d2.i18n;

        this.state = {
            TranslationForm: getTranslationFormFor(props.objectToTranslate),
        };

        this.translationSaved = this.translationSaved.bind(this);
        this.translationError = this.translationError.bind(this);
        this.closeTranslationDialog = this.closeTranslationDialog.bind(this);
    }

    getChildContext() {
        return { d2: this.props.d2 };
    }

    render() {
        return (
            <Dialog
                title={this.i18n.getTranslation('translation_dialog_title')}
                autoDetectWindowHeight
                autoScrollBodyContent
                {...this.props}
            >
                <this.state.TranslationForm
                    onTranslationSaved={this.translationSaved}
                    onTranslationError={this.translationError}
                    onCancel={this.closeTranslationDialog}
                    fieldsToTranslate={this.props.fieldsToTranslate}
                />
            </Dialog>
        );
    }

    componentWillReceiveProps(newProps) {
        if (newProps.objectToTranslate) {
            this.setState({
                TranslationForm: getTranslationFormFor(newProps.objectToTranslate),
            });
        }
    }

    closeTranslationDialog() {
        this.props.onRequestClose();
    }

    translationSaved(args) {
        this.props.onTranslationSaved(args);
        this.closeTranslationDialog();
    }

    translationError(err) {
        this.props.onTranslationError(err);
    }
}

TranslationDialog.propTypes = {
    objectToTranslate: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    onTranslationSaved: PropTypes.func.isRequired,
    onTranslationError: PropTypes.func.isRequired,
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    fieldsToTranslate: PropTypes.array,
    d2: PropTypes.object.isRequired,
};

TranslationDialog.childContextTypes = {
    d2: PropTypes.object,
};

export default TranslationDialog;
