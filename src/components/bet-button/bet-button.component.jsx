import React from "react";

import './bet-button.component.scss';

const BetButtonComponent = props => {
    const { odd } = props;
    
    return (
        <div className="bet__button">{odd}</div>
    );
};

export { BetButtonComponent };
