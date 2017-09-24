import React, { Component } from 'react';
import './App.css';

import { Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

class App extends Component {

  constructor(props){
    super(props);
    
    //　一覧の初期表示
    let myJsonObj = {};
    myJsonObj.person = [
                  {"key":"0","date":"20170917","item":"KitKat(岩泉ヨーグルト味)","price":500}
                 ,{"key":"0","date":"20170917","item":"短角牛","price":2000}
                 ,{"key":"0","date":"20170917","item":"じゃがいも","price":300}
                ];
    myJsonObj.person.push({"key":"0","date":"20170924","item":"ワイン","price":1200});
    //let jsonText = JSON.stringify(myJsonObj);
    this.state = {myJsonObj:myJsonObj};
  }

  getInitialState(){

  }

  render() {
    
    return (
      <div className="App">
      
        <Jumbotron>
          <h1>Firebaseを利用したReactお小遣い帳アプリを考案してみたんだが</h1>
        </Jumbotron>

        <MyInput onClickBtnAdd={this.onClickBtnAdd}/>
        
        <MyList myJsonObj={this.state.myJsonObj} />
      
      </div>

    );
  }
  
  componentDidMount(){
    
  }
  
  // コールバック関数：追加ボタン
  onClickBtnAdd = (obj) => {
    let tmpObj=this.state.myJsonObj;
    tmpObj.person.push(obj);
    this.setState({myJsonObj:tmpObj});
  }
  
}

// 入力コンポーネント
class MyInput extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {inputDate:"", inputItem:"", inputPrice:""};
  }
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({[name]:value});
  }
  
  onClickButton = (event) => {
    event.preventDefault();
    // 入力値を一覧に反映
    let obj = {"key":"0"
              ,"date":this.state.inputDate
              ,"item":this.state.inputItem
              ,"price":this.state.inputPrice}
    this.props.onClickBtnAdd(obj);
    // 入力欄のクリア
    this.setState({inputDate:"",inputItem:"",inputPrice:""});
  }
  
  render(){
    return (
        <div className="myRegion">
          <Form inline>
            <FormGroup>
              <label for="date">日付</label>
              <input type="text" className="form-control" id="date"
                                 placeholder="20170917" name="inputDate"
                                 value={this.state.inputDate} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <label for="item">品目</label>
              <input type="text" className="form-control" id="item"
                                 placeholder="食品" name="inputItem" 
                                 value={this.state.inputItem} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <label for="price">金額（円）</label>
              <input type="text" className="form-control" id="price"
                                 placeholder="1000" name="inputPrice" 
                                 value={this.state.inputPrice} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Button type="button" className="btnAdd" bsStyle="success" 
                                    onClick={this.onClickButton}>
                <i className="glyphicon glyphicon-plus"></i>追加</Button>
            </FormGroup>
          </Form>
        </div>    
    );
  }
}

//　一覧表示コンポーネント
class MyList extends React.Component {
  
  render(){

    let listItems = this.props.myJsonObj.person.map((item,index) => 
        <tr key={index}>
          <td>{item.date}</td>
          <td>{item.item}</td>
          <td>{item.price}</td>
          <td>
            <Button type="button" className="btnDel" bsStyle="warning" bsSize="small" block >
                    <i className="glyphicon glyphicon-trash"></i>
            </Button>
          </td>
        </tr>
        );

    return (
      <div className="myRegion">
       <Table responsive striped>
          <thead>
            <tr>
              <th>日付</th>
              <th>品目</th>
              <th>金額（円）</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </Table>
       </div>
    );
  }  
}

export default App;
