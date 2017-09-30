import React, { Component } from 'react';
import './App.css';

import { 
   Button,Glyphicon,Radio
  ,Form,FormGroup,Table
  ,Grid,Row,Col
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { firebaseDb } from './firebase';

// class MyConst {
//   static get KEY_STRAGE(){
//     return "teamReact";
//   }
// }

class App extends Component {

  constructor(props){
    super(props);
    
    //一覧の初期表示
    let myJsonObj = this.loadDB();
    this.state = {
      myJsonObj:myJsonObj
    };
    
  }
  
  componentWillMount(){
    //alert('Will')
    firebaseDb.ref('main').once('value').then((snapshot)=>{
      if (snapshot.exists()){
        console.log(snapshot.val())
        this.setState({
          myJsonObj:JSON.parse(snapshot.val())
        });
      }
    });

  }

  // getInitialState(){
  //   // これがうまく動かなかった・・・
  //   // stateの初期化は
  //   // constructorでやっちゃいました。
  // }

  render() {
    
    return (
      <div className="App">

        <MyInput onClickBtnAdd={this.onClickBtnAdd}/>
              
        <MyList myJsonObj={this.state.myJsonObj}
                onClickBtnDel={this.onClickBtnDel}/>
      
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
    this.updateDB(tmpObj);
  }

  // コールバック関数：削除ボタン
  onClickBtnDel = (index) => {
    let tmpObj=this.state.myJsonObj;
    tmpObj.person.splice(index,1);
    this.setState({myJsonObj:tmpObj});
    this.updateDB(tmpObj);
  }
  
  // localStorageへの保存
  updateDB = (jsonObj) => {
    //window.localStorage.setItem(MyConst.KEY_STRAGE,JSON.stringify(jsonObj));
    firebaseDb.ref('main').set(JSON.stringify(jsonObj));
  }

  // localStorageから取得
  loadDB = () => {
    
    // localStorageの初期化 todo:コメントアウト
    // window.localStorage.clear();
    
    let jsonObj = null;
    //jsonObj = JSON.parse(window.localStorage.getItem(MyConst.KEY_STRAGE));

    if (jsonObj == null){
      // localStorageが初期状態の場合はサンプルを表示
      let myJsonObj = {};
      myJsonObj.person = [
                   {"key":"0","date":"2017/09/17","item":"KitKat(岩泉ヨーグルト味)","price":500}
                  ,{"key":"0","date":"2017/09/17","item":"短角牛","price":2000}
                  ,{"key":"0","date":"2017/09/17","item":"じゃがいも","price":300}
                  ];
      myJsonObj.person.push({"key":"0","date":"2017/09/24","item":"ワイン","price":1200});
      myJsonObj.person.push({"key":"0","date":"2017/09/24","item":"ワイン","price":1200});
      myJsonObj.person.splice(4,1);

      jsonObj = myJsonObj;
    }

  return jsonObj;
  
  }
  
}

// 入力コンポーネント
class MyInput extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {inputDate:"", inputItem:"", inputPrice:""};
    this.state = {inputDate2:moment()};
  }
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});
  }
  
  handleInputChange2 = (date) => {
    this.setState({inputDate2:date});
  }
  
  onClickButton = (event) => {
    event.preventDefault();
    // 入力値を一覧に反映
    let obj = {"key":"0"
              ,"date":this.formatDate(this.state.inputDate2,'yyyy/MM/dd')// todo:文字列に変換する！
              ,"item":this.state.inputItem
              ,"price":this.state.inputPrice};
    this.props.onClickBtnAdd(obj);
    // 入力欄のクリア
    this.setState({inputDate:"",inputItem:"",inputPrice:""});
  }
  
  onChageRaido = (event) => {
    this.setState({inputItem:event.currentTarget.value});
  }
  
  // 日付を文字列変換
  formatDate = (date, format) => {
    date = new Date(date);
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0'+(date.getMonth()+1)).slice(-2));
    format = format.replace(/dd/g, ('0'+date.getDate()).slice(-2));
    return format;
  }
  
  render(){
    return (
        <div className="myRegion">
          <Grid>
            <Row>
              <Col xs={4} md={4}>
                <FormGroup>
                  <DatePicker
                    selected={this.state.inputDate2}
                    onChange={this.handleInputChange2}
                    locale="ja"
                    dateFormat="YYYY/MM/DD"
                    todayButton={"今日"}
                    placeholderText="クリックして選択"
                    isClearable={true}
                    inline
                  />
                </FormGroup>
              </Col>
              <Col xs={4} md={4}>
                <FormGroup>
                  <Radio name="item" onChange={this.onChageRaido} value="おやつ">おやつ</Radio>
                  <Radio name="item" onChange={this.onChageRaido} value="文具">文具</Radio>
                  <Radio name="item" onChange={this.onChageRaido} value="本">本</Radio>
                  <Radio name="item" onChange={this.onChageRaido} value="雑貨">雑貨</Radio>
                </FormGroup>
              </Col>
              <Col xs={4} md={4}>
                <Form inline>
                  <FormGroup>
                    <label for="price">金額（円）</label>
                    <input type="text" className="form-control" id="price"
                                       placeholder="1000" name="inputPrice" 
                                       value={this.state.inputPrice} onChange={this.handleInputChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Button type="button" className="btnAdd" bsStyle="success" 
                                          onClick={this.onClickButton}>
                    <Glyphicon glyph="plus" />追加</Button>
                  </FormGroup>
                </Form>

              </Col>
            </Row>
          </Grid>
        </div>    
    );
  }
}

// 一覧表示コンポーネント
class MyList extends React.Component {
  
  render(){

    let listItems = "";
    if (this.props.myJsonObj != null) {
      listItems = this.props.myJsonObj.person.map((item,index) => 
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.item}</td>
            <td>{item.price}</td>
            <td>
              <Button type="button" className="btnDel" bsStyle="warning" bsSize="small" block 
                      onClick={this.onClickButton}
                      name={index}>
                      <Glyphicon glyph="trash" />
              </Button>
            </td>
          </tr>
          );
    }

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
  
  onClickButton = (event) => {
    event.preventDefault();
    // 行削除
    let index = event.target.name;
    this.props.onClickBtnDel(index);
  }
  
}

export default App;
