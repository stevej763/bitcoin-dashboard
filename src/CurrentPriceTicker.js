import { Component } from "react";
import CountUp from 'react-countup';

class CurrentPriceTicker extends Component {

    render() {
        return (
        <div className = "price-ticker-wrapper">
            <h3>$<CountUp
                end={parseFloat(this.props.value)} 
                duration={1}
                decimals={2}
                preserveValue={true}
                /></h3>
        </div>
        )
    }
}

export default CurrentPriceTicker