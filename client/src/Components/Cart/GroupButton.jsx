import React, { useState } from "react";

import { ButtonGroup, Button, styled } from "@mui/material";

const Component = styled(ButtonGroup)`
    margin-top: 30px;
    box-shadow: none;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
`;

const StyledButton = styled(Button)`
    border-radius: 0;
    border: none !important;
    font-size: 18px;
    color: #0f172a;
    padding: 2px 12px;
    background: #f8fafc;
    &:hover {
        background: #e2e8f0;
    }
`;

const CountButton = styled(Button)`
    border-radius: 0;
    border: none !important;
    border-left: 1px solid #e2e8f0 !important;
    border-right: 1px solid #e2e8f0 !important;
    color: #0f172a !important;
    font-weight: 600;
    background: #fff !important;
`;

const GroupedButton = ({ quantity, setQuantity }) => {
    const [ counter, setCounter ] = useState(quantity || 1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1 );
        if(setQuantity) setQuantity(counter + 1);
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1 );
        if(setQuantity) setQuantity(counter - 1);
    };

    return (
        <Component>
            <StyledButton onClick={() => handleDecrement()} disabled={counter == 0}>-</StyledButton>
            <CountButton disabled>{counter}</CountButton>
            <StyledButton onClick={() => handleIncrement()}>+</StyledButton>
        </Component>
    );
}

export default GroupedButton;