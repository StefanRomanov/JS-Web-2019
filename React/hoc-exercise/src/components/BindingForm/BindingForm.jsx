import React, {Component} from 'react';

class BindingForm extends Component {

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }


    render() {
        return (
            <form onSubmit={e => this.props.onSubmit(e, this.state)}>

                {React.Children.map(this.props.children, child => {
                    if (child.type === 'input') {
                        return React.cloneElement(child, {onChange: this.onChange.bind(this), ...child.props})
                    }
                })}

                <input type="submit" value="Register"/>
            </form>
        );
    }
}

export default BindingForm;