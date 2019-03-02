import React from 'react';

function errorHandlingWrapper(Component){
    return class ErrorHandlingWrapper extends React.Component {

        constructor(props) {
            super(props);
            this.state= {
                hasError: false
            }
        }

        static getDerivedStateFromError(error){
            return {hasError: true}
        }

        render(){
            if(this.state.hasError){
                return (<div className="warning">
                        <p>Opps,Something went wrong !</p>
                    </div>);
            }
            return <Component {...this.props} />
        }
    }

}

export default errorHandlingWrapper;