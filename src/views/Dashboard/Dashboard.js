import React, { Component } from 'react';
import { db, auth, isAuthenticated, writeUserData, removeUserData, isUserLoggedIn, getLoggedInUserRef } from '../../firebase';
import * as firebase from 'firebase';

import Card from '../../components/Card'
import StackedAreaChart from '../../components/StackedAreaChart'
import ModalGroup from '../../components/ModalGroup'

import constants from '../../utils/constants'

const brandPrimary =  '#20a8d8';
const brandSuccess =  '#4dbd74';
const brandInfo =     '#63c2de';
const brandDanger =   '#f86c6b';

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ],
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ],
};

const cardChartOpts2 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ],
};

const cardChartOpts3 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }],
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ],
};

const cardChartOpts4 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false,
      barPercentage: 0.6,
    }],
    yAxes: [{
      display: false,
    }]
  }
}



class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleWriteData = this.handleWriteData.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.state = {
      dropdownOpen: false,
      setupFinished: false,
      firebase: 'hello world',
    };
  }

  componentDidMount() {
    // *** show the setup wizard when page loads and the user has not finished it ***
    console.log(getLoggedInUserRef(), 'getLoggedInUserRef')
    if (getLoggedInUserRef()) {
        getLoggedInUserRef().child('setupFinished').on('value', snap => {
        console.log('setupFinished value ', snap.val())
        this.setState({ setupFinished: snap.val().setupFinished })
      }) 
    }
    // const rootRef = firebase.database().ref();
    // const dataRef = rootRef.child('test')
    // dataRef.on('value', snap => {
    //   this.setState({
    //     firebase: snap.val()
    //   })
    // })
    // if (isUserLoggedIn) {
    //   writeUserData("walletData", { address: '123xyz', type: constants.coinTypes.BTC })
    // }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleWriteData() {
    console.log('in write data')
    if (isUserLoggedIn) {
      writeUserData("walletData", { address: '123xyz', type: constants.coinTypes.BTC }, true)
    }
  }

  handleRemoveData() {
    console.log('in write data')
    if (isUserLoggedIn) {
      removeUserData("/walletData/-KpCaAENMZ5FVBH8BIb6")
    }
  }


  render() {
    return (
      <div className="animated fadeIn">
        
      <ModalGroup />

        <button
          onClick={() => { this.handleWriteData() }} className="btn btn-primary">
          Update
        </button>
        <button 
          onClick={() => { this.handleRemoveData() }} className="btn btn-primary">
          Remove
        </button>

        <StackedAreaChart />


        <div className="row">
            <Card color="red" />
            <Card color="yellow" />
            <Card color="yellow" />
        </div>






      </div>
    )
  }
}

export default Dashboard;
