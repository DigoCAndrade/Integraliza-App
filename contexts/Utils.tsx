import jwt from 'jsonwebtoken';
import React from "react";

export declare const defaultProps: {
    color: "default" | "primary" | "secondary" | "success" | "warning" | "error";
    helperColor: "default" | "primary" | "secondary" | "success" | "warning" | "error";
    status: "default" | "primary" | "secondary" | "success" | "warning" | "error";
}

export function parseInformation(token) {
    if (!token) return [false, null, null]
    const data = jwt.decode(token)
    return [true, data['firstname'], data['avatar']]
}

export function getUserIDByCookie(token) {
    if (!token) return null
    let data = jwt.decode(token)
    console.log(data)
    return [data['id']]
}

export const validateName = (value) => {
    return value.match(/^[^0-9_!¡?÷¿/\\+=@#$%ˆ.^¨'"°&*(){}|~<>;:[\]]{4,16}$/);
};

export const validateCPF = (value) => {
    return value.match(/^([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})\-?([0-9]{2})$/)
}

export const validateDate = (value) => {
    return value.match(/(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/);
};

export const validateEmail = (value) => {
    return value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm);
};

export const validatePassword = (value) => {
    return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
};

export function helper({value, validator, successMessage, errorMessage}) {
    if (!value)
        return {
            text: "",
            error: null
        };

    const isValidPassword = validator(value);

    return {
        text: isValidPassword ? successMessage : errorMessage,
        error: !isValidPassword,
    };
}