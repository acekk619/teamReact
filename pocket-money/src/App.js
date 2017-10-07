import './App.css';
import MyInput from './App_Input.js';
import MyList from './App_List.js';
import React, { Component } from 'react';
import { firebaseDb } from './firebase';
import 'react-datepicker/dist/react-datepicker.css';

// メイン画面
class App extends Component {

  constructor(props) {
    super(props);

    // 一覧の初期表示
    let myJsonObj = this.loadDB();
    this.state = {
      myUserId: 'user01'
     ,myJsonObj: myJsonObj
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
    return (
      <div className="App">
        <MyInput onClickBtnAdd={this.onClickBtnAdd} myUserId={this.state.myUserId}/>
        <MyList myJsonObj={this.state.myJsonObj} onClickBtnDel={this.onClickBtnDel}/>
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
}

export default App;
