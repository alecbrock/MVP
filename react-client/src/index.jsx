import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';
import PrimarySearchAppBar from './components/AppBar.jsx';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoGameList: [],
      page: 1,
      sortString: '',
      category: ''
    }
    this.getGameBySearch = this.getGameBySearch.bind(this);
    this.changeSortStirng = this.changeSortStirng.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.getNextVideoGameList();
  }

  // getVideoGameList() {
  //   axios.get('/videoGameList')
  //   .then((data) => {
  //     this.setState({
  //       videoGameList: data.data
  //     }, () => {console.log(data)})
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // };

  getNextVideoGameList() {
    if(this.state.sortString.length === 0) {
      console.log('yes')
      axios.get(`/videoGameList/${this.state.page}`)
      .then((data) => {
        this.setState({
          videoGameList: data.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log(this.state.sortString, this.state.category)
      axios.get(`/videoGameList/sort/${this.state.page}/?sort=${this.state.sortString}&category=${this.state.category}`)
      .then((data) => {
        this.setState({
          videoGameList: data.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  };

  getGameBySearch(name) {
    console.log(name);
    axios.get(`/search/?name=${name}`)
    .then((data) => {
      this.setState({
        videoGameList: [data.data]
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };

  changeSortStirng(string) {
    let sortAndCategory = string.split(',');
    this.setState({
      sortString: sortAndCategory[0],
      category: sortAndCategory[1],
      page: 1
    },() => {this.getNextVideoGameList()})

  };

  reset() {
    this.setState({
      page: 1,
      sortString: '',
      category: ''
    }, () => {this.getNextVideoGameList()})
  }

  render () {
    return (
      <div>
      <PrimarySearchAppBar reset={this.reset} changeSortStirng={this.changeSortStirng} getGameBySearch={this.getGameBySearch}/>
      <Grid container style={{position: 'relative', top: 60}}>
      <Grid item xs={2}>

      </Grid>
      <Grid item xs={8}>

      {this.state.videoGameList.length > 0 ? <List videoGameList={this.state.videoGameList}/> : null}
      </Grid>
      <Grid item xs={2}>

      </Grid>
      <Grid item xs={2}>

      </Grid>
      <Grid item xs={8} container alignItems='center' justify='center' style={{position: 'relative', paddingTop: 100, paddingBottom: 60}}>
      <Pagination count={100} variant="outlined" onChange={(e, value) => {this.setState({page: value}, () => {this.getNextVideoGameList()})}}/>
      </Grid>
      <Grid item xs={2}>

      </Grid>
      </Grid>

    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));