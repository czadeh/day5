import React from 'react';

const Status = ({ children, saveStatus }) => {
    let textStatus = 'Not ';
    if (saveStatus) {
        textStatus = '';
    }
    return (
    <h2>Changes {textStatus}{children}</h2>)
};

export default Status