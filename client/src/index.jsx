import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search=this.search.bind(this);
  }

  search (term) {
    // var term = {term};
    var term = {name: term};
    console.log(`${term} was searched`);
    $.ajax({
      url: "/repos",
      type: "POST",
      data: term,
      contentType: "application/json",
      success: () => {
        console.log("success");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getData() {
    $.ajax({
      url:"/repos",
      type: "GET",
      contentType: "application/json",
      success: (data) => {
        console.log(JSON.parse(data));
        var newData = JSON.parse(data);
        this.setState({
          repos: newData
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  componentDidMount(){
    this.getData();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));