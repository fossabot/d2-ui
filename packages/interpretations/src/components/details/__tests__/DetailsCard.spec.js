import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as helpers from '../../../models/helpers';
import DetailsCard from '../DetailsCard';
import { getStubContext } from '../../../../../../config/inject-theme';

const favorite = {
    lastUpdated: "2018-05-21T12:57:25.365",
    id: "zDP78aJU8nX",
    href: "http://localhost:8029/api/maps/zDP78aJU8nX",
    created: "2018-05-17T11:53:17.999",
    name: "ANC: 1st visit coverage (%) by district last year",
    displayName: "ANC: 1st visit coverage (%) by district last year",
    publicAccess: "r-------",
    description: "Some Description",
    externalAccess: false,
    displayDescription: "Description3",
    favorite: false,
    access: {
        read: true,
        update: true,
        externalize: true,
        delete: true,
        write: true,
        manage: true
    },
    lastUpdatedBy: {
        id: "xE7jOejl9FI"
    },
    user: {
        id: "xE7jOejl9FI",
        displayName: "John Traore"
    },
    favorites: [],
    translations: [],
    mapViews: [],
    interpretations: [{
        id: "LOECMJN3DRF"
    }, {
        id: "LqumKmXxc1k"
    }],
    userGroupAccesses: [
        {
            access: "rw------",
            userGroupUid: "wl5cDMuUhmF",
            displayName: "Administrators",
            id: "wl5cDMuUhmF"
        }
    ],
    attributeValues: [],
    userAccesses: [],
    modelDefinition: {name: "map"},
    favoriteViews: 5,
};

const context = getStubContext();

const childContextTypes = {muiTheme: PropTypes.object, d2: PropTypes.object};

const baseProps = {
    model: favorite,
};

const renderComponent = (partialProps = {}) => {
    const props = { ...baseProps, ...partialProps };
    return shallow(<DetailsCard {...props} />, { context, childContextTypes });
};

const getListItem = (detailsCard, label) => {
    return detailsCard.find("ListItem").findWhere(item => item.props().label === label);
};

describe('Interpretations: Details -> DetailsCard component', () => {
    let detailsCard;

    beforeEach(() => {
        detailsCard = renderComponent();
    });

    it('should render description as first item', () => {
        expect(detailsCard.find("ListItem").get(0).props.text).toEqual(favorite.description);
    });

    it('should render owner', () => {
        expect(getListItem(detailsCard, "Owner").props().text).toEqual("John Traore");
    });

    it('should render created', () => {
        expect(getListItem(detailsCard, "Created").props().text).toEqual("05/17/2018");
    });

    it('should render last updated', () => {
        expect(getListItem(detailsCard, "Last updated").props().text).toEqual("05/21/2018");
    });

    it('should render favorite views', () => {
        expect(getListItem(detailsCard, "Views").props().text).toEqual(5);
    });

    it('should render sharing info', () => {
        expect(getListItem(detailsCard, "Sharing").props().text)
            .toEqual("Public: Read + Administrators");
    });
});
