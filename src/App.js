import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataArr: [
        {
          name: 'Bill Gates',
          number: '9600054298'
        },
        {
          name: 'Jeff Bezos',
          number: '9110978278'
        },
        {
          name: 'Warren Baffet',
          number: '6490978561'
        }
      ],
      name: '',
      number: '',
      tname: '',
      tnumber: '',
      hideAddBtn: false,
      index: 0,
      errorsArr: [],
      reqNameErr: false,
      reqNumberErr: false,
      flag: []
    };
  }

  componentWillMount() {

  }

  delete = (index) => {
    const users = Object.assign([], this.state.dataArr);
    users.splice(index, 1);
    this.setState({
      dataArr: users
    });
  }

  add = (event) => {
    event.preventDefault();
    const users1 = Object.assign([], this.state.dataArr);
    const flag1 = Object.assign([], this.state.flag);
    if (!this.state.tname || this.state.tname === "") {
      this.setState({
        reqNameErr: true
      });
    } else {
      this.setState({
        reqNameErr: false
      });
    }

    if (!this.state.tnumber || this.state.tnumber === "") {
      this.setState({
        reqNumberErr: true
      });
    } else {
      this.setState({
        reqNumberErr: false
      });
    }

    // !this.state.reqNameErr && !this.state.reqNumberErr
    if (this.state.tname && this.state.tnumber) {
      users1.push({
        name: this.state.tname,
        number: this.state.tnumber,
      });
      flag1.push(false);
      this.setState({
        dataArr: users1,
        tname: '',
        tnumber: '',
        flag: flag1
      });
    } else {
      //
    }
  }

  editBtn = (obj, i) => {
    const flag2 = Object.assign([], this.state.flag);
    for (let k = 0; k < this.state.dataArr.length; k++) {
      flag2[k] = false;
    }
    flag2[i] = true;
    this.setState({
      name: obj.name,
      number: obj.number,
      hideAddBtn: !this.state.hideAddBtn,
      index: i,
      flag: flag2
    });
  }

  save = () => {
    const flag3 = Object.assign([], this.state.flag);
    for (let k = 0; k < this.state.dataArr.length; k++) {
      flag3[k] = false;
    }
    const users2 = Object.assign([], this.state.dataArr);
    users2[this.state.index].name = this.state.name;
    users2[this.state.index].number = this.state.number;
    this.setState({
      dataArr: users2,
      name: '',
      number: '',
      hideAddBtn: false,
      flag: flag3
    });
  }

  nameOnChange = (event) => {
    event.preventDefault();
    this.setState({ tname: event.target.value });
    // this.setState((prevState) => {
    //   if (!prevState.name || prevState.name === "") {
    //     return { reqNameErr: true }
    //   } else {
    //     return { reqNameErr: false }
    //   }
    // });    
  }

  numberOnChange = (event) => {
    if ((event.target.value).match(/^[0-9_ ]*$/)) {
      this.setState({
        tnumber: event.target.value
      });
    }
    // this.setState(prevState => {
    //   if (!prevState.number) {
    //     return { reqNumberErr: true }
    //   } else {
    //     return { reqNumberErr: false }
    //   }
    // });
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo pull-left" alt="logo" />
        <div className="container">
          <h3>Editable Table in React</h3>
          <br /><br />
          <div>
            <table width={'600px'} className="table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dataArr.map((contact, index) => {
                  return (
                    <tr key={contact.name}>
                      <td>
                        {!this.state.flag[index] && contact.name}
                        {this.state.flag[index] && <input type="text" className="form-control"
                          value={this.state.name} onChange={e => this.setState({name: e.target.value})} maxLength="15" required />}
                      </td>
                      <td>
                        {!this.state.flag[index] && contact.number}
                        {this.state.flag[index] && <input type="text" className="form-control"
                          value={this.state.number} onChange={e => this.setState({number: e.target.value})} maxLength="15" required />}
                      </td>
                      <td>
                        {!this.state.flag[index] && <button type="button" className="btn btn-info" onClick={this.editBtn.bind(this, contact, index)} >
                          <span className="glyphicon glyphicon-edit"></span>&nbsp;Edit
						          	</button>}
                        &nbsp;&nbsp;
                        {!this.state.flag[index] && <button type="button" className="btn btn-danger" onClick={this.delete.bind(this, index)}>
                          <span className="glyphicon glyphicon-trash"></span>&nbsp;Delete
                        </button>}
                        {this.state.flag[index] && <button type="button" className="btn btn-primary" onClick={this.save}>
                          <span className="glyphicon glyphicon-floppy-disk"></span>&nbsp;Save
							          </button>}
                      </td>
                    </tr>)
                })}
                <tr style={{ height: '70px' }}>
                  <td>
                    <input type="text" className="form-control" value={this.state.tname} placeholder="Name"
                      onChange={this.nameOnChange} maxLength="15" required />
                    {this.state.reqNameErr && <span style={{ color: "red" }}>This field can't be empty</span>}
                  </td>
                  <td>
                    <input type="text" className="form-control" value={this.state.tnumber} placeholder="Contact Number"
                      onChange={this.numberOnChange} maxLength="10" required />
                    {this.state.reqNumberErr && <span style={{ color: "red" }}>This field can't be empty</span>}
                  </td>
                  <td>
                    <button type="submit" className="btn btn-primary" onClick={this.add}>
                      <span className="glyphicon glyphicon-plus"></span>&nbsp;Add
								        </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default App;