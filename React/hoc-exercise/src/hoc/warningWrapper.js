import React from 'react';

function warningWrapper(Component){
    return function WarningWrapper (props) {

        return (
            <div className="alert">
                <span className="alert-symbol">&#9888;</span>
                    <Component {...props}/>
            </div>
        )
    }
}

export default warningWrapper;