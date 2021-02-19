import React, { Component } from 'react';
import axios from 'axios';
import LiveBarChart from './LiveBarChart';
import CurrentPriceTicker from './CurrentPriceTicker';
import Loader from "react-loader-spinner";





class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPrice: null,
      hasLoaded: false,
      currency: "$"
    };
  }


  componentDidMount() {

    const apiKey = "fed22b9b69bfc4b46597bf0bc5a4468a"
    const currency = "USD"
    const date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    const startDate = date.toISOString()


    const getCurrentPrice = () => {
      axios.get("v1/currencies/ticker?key=" + apiKey + "&ids=BTC&convert=" + currency + "&per-page=100&page=1")
        .then(response => {
          this.setState({
            currentPrice: parseFloat(response.data[0].price).toFixed(2),
            hasLoaded: true
          })
        })
    }

    axios.get("v1/exchange-rates/history?key=fed22b9b69bfc4b46597bf0bc5a4468a&currency=BTC&start=" + startDate)
      .then(response => {
        this.setState({
          data: [{
            title: "Bitcoin Value in" + currency,
            data: response.data
          }]
        })
      })
      .catch(error => {
        console.log(error)
      })

    getCurrentPrice();


    setInterval(() => {
      this.setState({
        currentPrice: getCurrentPrice()
      })
    }, 60000);
  }

  render() {
    let bitcoinRateChartPlaceholder = null
    let priceTickerPlaceholder = null
    if (this.state.data.length !== 0) {
      bitcoinRateChartPlaceholder = (
        <LiveBarChart
          title={this.state.data[0].title}
          data={this.state.data[0].data}
          color='#fff'
        />
      );
    } else {
      bitcoinRateChartPlaceholder = (
        <Loader
          className="chart-loader"
          type="Bars"
          color="#DCF763"
          height={200}
          width={200}
          timeout={3000} //3 secs
        />
      )
    }

    if (this.state.hasLoaded == false) {
      priceTickerPlaceholder = (
        <Loader
          className="price-ticker-loader"
          type="Puff"
          color="#DCF763"
          height={200}
          width={200}
          timeout={3000} //3 secs
        />
      )
    } else {
      priceTickerPlaceholder = (
        <CurrentPriceTicker value={this.state.currentPrice} />
      )
    }

    return (
      <div className="App container">
        <h1 className="text-light dashboard-heading">Bitcoin Dashboard</h1>
        {/* <CurrentPriceTicker value={this.state.currentPrice} /> */}
          {priceTickerPlaceholder}
        <div className="chart-wrapper">
          {bitcoinRateChartPlaceholder}
        </div>
      </div>
    )
  }
}

export default App;