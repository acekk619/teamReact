import './App.css';
import MyInput from './App_Input.js';
import MyList from './App_List.js';
import MyHimokuMaster from './MyHimokuMaster.js';
import React, { Component } from 'react';
import { firebaseDb } from './firebase';
import 'react-datepicker/dist/react-datepicker.css';
import { Nav, NavItem } from 'react-bootstrap';

// クラス定数：画面
class myGamen {
  static get None(){return '0'};    // 非表示
  static get Main(){return '1'};    // お小遣い帳
  static get Himoku(){return '2'};  // 費目マスター
}

// メイン画面
class App extends Component {

  constructor(props) {
    super(props);

    // 一覧の初期表示
    let myJsonObj = this.loadDB();
    this.state = {
      myUserId: 'user01'
     ,myJsonObj: myJsonObj
     ,myGmnState: myGamen.Main
    };
  }

  componentWillMount() {
    // データ取得：メイン
    firebaseDb.ref('main/'+this.state.myUserId).on('value',(snapshot)=>{
      if (snapshot.exists()){
        this.setState({
          // myJsonObj:JSON.parse(snapshot.val())
          myJsonObj:snapshot.val()
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
    
    // 表示する画面
    let nav = (
        <Nav bsStyle="pills" activeKey={this.state.myGmnState} onSelect={this.handleSelect}>
          <NavItem eventKey={myGamen.Main}>お小遣い帳</NavItem>
          <NavItem eventKey={myGamen.Himoku}>費目マスター</NavItem>
        </Nav>
      );
    let gmn = null;

    switch (this.state.myGmnState) {
      case myGamen.None:
        nav = null;
        break;
      case myGamen.Main:
        gmn = (
          <div>
            <MyInput myUserId={this.state.myUserId}
                     onClickBtnAdd={this.onClickBtnAdd} />
            <MyList myJsonObj={this.state.myJsonObj}
                    onClickBtnDel={this.onClickBtnDel} />
          </div>
        );
        break;
      case myGamen.Himoku:
        // gmn = <MyHimokuMaster myUserId={this.state.myUserId} />;
        gmn = <MyHimokuMaster myUserId={'user02'} />;
        break;
      default:
    }
    
    return (
      <div className="App">
        {nav}
        {gmn}
      </div>
    );
  }

  componentDidMount() {

  }

  // コールバック関数：追加ボタン
  onClickBtnAdd = (obj) => {
    let tmpObj = this.state.myJsonObj;
    tmpObj.unshift(obj);
    this.setState({ myJsonObj: tmpObj });
    this.updateDB(tmpObj);
  }

  // コールバック関数：削除ボタン
  onClickBtnDel = (index) => {
    let tmpObj = this.state.myJsonObj;
    tmpObj.splice(index, 1);
    this.setState({ myJsonObj: tmpObj });
    this.updateDB(tmpObj);
  }

  // DBへの保存
  updateDB = (jsonObj) => {
    //window.localStorage.setItem(MyConst.KEY_STRAGE,JSON.stringify(jsonObj));
    // firebaseDb.ref('main').set(JSON.stringify(jsonObj));
    firebaseDb.ref('main/'+this.state.myUserId).set(jsonObj);
  }

  // DBから取得
  loadDB = () => {

    // localStorageの初期化 todo:コメントアウト
    // window.localStorage.clear();

    let jsonObj = null;
    //jsonObj = JSON.parse(window.localStorage.getItem(MyConst.KEY_STRAGE));

    if (jsonObj == null) {
      // データがない場合はサンプルを表示
      jsonObj = [
          { "date": "2017/09/17", "category_id": "99", "category_name": "KitKat(岩泉ヨーグルト味)", "price": 500 }
        , { "date": "2017/09/17", "category_id": "98", "category_name": "短角牛", "price": 2000 }
        , { "date": "2017/09/17", "category_id": "97", "category_name": "じゃがいも", "price": 300 }
      ];
    }
    return jsonObj;
  }
  
  // 
  handleSelect = (selectedKey) => {
    switch (selectedKey) {
      case myGamen.None:
        break;
      case myGamen.Main:
        this.setState({myGmnState:myGamen.Main});
        break;
      case myGamen.Himoku:
        this.setState({myGmnState:myGamen.Himoku});
        break;
      default:
    }
  }
}

export default App;
