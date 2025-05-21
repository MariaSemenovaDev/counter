import styles from './Button.module.css'

import {ButtonHTMLAttributes} from "react";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
    callBack?: () => void;
    isDisabled?: boolean;
}

export const Button = (props: ButtonType) => {

    const {callBack, isDisabled, children, className, ...restProps} = props


    const onClickHandler = () => {
        if (callBack) {
            callBack()
        }
    }

    const finalClassName = `
    ${styles.styleButton}
    ${isDisabled ? styles.styleButtonDisabled : ""}
     `

    return (
        <button onClick={onClickHandler}
                disabled={isDisabled}
                className={finalClassName}
                {...restProps}
        >{children}</button>
    );
};