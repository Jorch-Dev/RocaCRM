import React from 'react'
import { white } from '../styles/colors'

export const DotLoader = (props) => {
    return (
        <div className={`dottedloader dottedloader--${props.size}`}>
            <div className="dottedloader_dot" style={{backgroundColor:props.color}}></div>
            <div className="dottedloader_dot" style={{backgroundColor:props.color}}></div>
            <div className="dottedloader_dot" style={{backgroundColor:props.color}}></div>
        </div>
    )
}
DotLoader.defaultProps = {
    color:white,
    size:'re'
}
