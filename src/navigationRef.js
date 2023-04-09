import { useState } from 'react';
import { NavigationActions } from 'react-navigation';
var navigator;
var tabvisible;
export const setNavigator = (nav) => {
    navigator = nav;
};

export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName: routeName,
            params: params,       
        })
    );    
};
       
export const switchtabvisible = (e) => {

    tabvisible = e;
};

export const getTabvisible = () => {
    console.log('getTabVisible en navigationRef: ', tabvisible);
    return tabvisible;
};

