import React from 'react';
import { firebaseDb } from './firebase';
import { Button ,Glyphicon ,Table ,Alert 
        ,FormGroup ,ControlLabel ,FormControl } from 'react-bootstrap';

// 費目マスター
class MyHimokuMaster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { HimokuName  : ""
                 , myJsonObj   : null
                 , myMessage   : ""
                 , myMessageDel: ""
                 , mainJsonObj : null
    };
  }

  componentWillMount(){
    // データ取得（費目マスター）
    firebaseDb.ref('categories/'+this.props.myUserId)
              .on('value',(snapshot)=>{
      if (snapshot.exists()){
        this.setState({myJsonObj:snapshot.val()});
      } else {
        this.setState({myJsonObj:null});
      }
    });
    
    // データ取得（メイン）
    firebaseDb.ref('main/'+this.props.myUserId)
              .once('value').then((snapshot)=>{
      if (snapshot.exists()){
        this.setState({mainJsonObj : snapshot.val()});
      } else {
        this.setState({mainJsonObj : null});
      }
    });

  }
  
  render(){
    
    // 入力領域のエラーメッセージ
    let alertMessage = null;
    if (this.state.myMessage !== '') {
      alertMessage = <Alert bsStyle="danger">
                      <strong>入力チェックエラー</strong>
                      {this.state.myMessage}
                     </Alert>;
    }
    
    // 追加ボタンの表示制御
    let blnAdd = false;
    if (this.state.HimokuName.length === 0) {
      blnAdd = true;
    }
    
    // 一覧領域のエラーメッセージ
    let alertMessageDel = null;
    if (this.state.myMessageDel !== '') {
      alertMessageDel = <Alert bsStyle="danger">
                          <strong>存在チェックエラー</strong>
                          {this.state.myMessageDel}
                        </Alert>;
    }
    
    // 一覧の明細部
    let listItems = null;
    if (this.state.myJsonObj != null) {
      for (let key in this.state.myJsonObj) {
        let tempItem = (
          <tr key={key}>
            <td>{this.state.myJsonObj[key]['category_id']}</td>
            <td>{this.state.myJsonObj[key]['category_name']}</td>
            <td>
              <Button type="button" className="btnDel" bsStyle="warning" bsSize="small" block 
                      onClick={this.onClickButton}
                      name={key}>
                      <Glyphicon glyph="trash"/>
              </Button>
            </td>
          </tr>);
        if (listItems==null){
          listItems=[tempItem];
        } else {
          listItems.push(tempItem);        
        }
      }
    }
    
    return (
      <div>
        {/* 入力領域 */}
        <div className="myRegion">
          {alertMessage}
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>費目名称</ControlLabel>
            <FormControl
              type="text"
              value={this.state.HimokuName}
              placeholder="費目を入力してください"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button type="button" className="btnAdd" bsStyle="success" 
                  block onClick={this.onClickButton}
                  disabled={blnAdd}>
          <Glyphicon glyph="plus" />追加</Button>          
        </div>
  
        {/* 一覧領域 */}
        <div className="myRegion">
          {alertMessageDel}
          <Table responsive striped>
            <thead>
              <tr>
                <th>費目ID</th>
                <th>費目名称</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </Table>
        </div>
      </div>
    );
  }
  
  // 入力チェック
  getValidationState = () => {
    const length = this.state.HimokuName.length;
    switch (true) {
      case (length > 0):
        return 'success';
      default:
        return 'error';
    }
  }

  // 入力イベント
  handleChange = (e) => {
    if (e.target.value.length <= 20) {
      this.setState({ HimokuName: e.target.value });
    }
  }
  
  // ボタンクリックイベント
  onClickButton = (event) => {
    let className = event.target.className.substr(0,6);
    let delkey = null;
    switch(className){
      case 'btnAdd':
        // データ作成
        this.insertData();
        break;
      case 'btnDel':
        // データ削除
        delkey = event.target.name;
        this.deleteData(delkey);
        break;
      case 'glyphi':
        // データ削除
        delkey = event.target.parentNode.name;
        this.deleteData(delkey);
        break;
      default:
    }
  }

  // データ作成
  insertData = () => {
    // 重複チェック
    if (this.checkDuplication() === false) {
      return false;
    }
    // 仮登録
    let initJsonObj ={ 'category_id'  :'00'
                      ,'category_name':this.state.HimokuName};
    let newkey 
      = firebaseDb.ref('categories/'+this.props.myUserId).push(initJsonObj).key;
    // Firebaseが発行したKeyをcategory_idに設定して更新
    initJsonObj ={ 'category_id'  :newkey
                  ,'category_name':this.state.HimokuName};
    firebaseDb.ref('categories/'+this.props.myUserId+'/'+newkey).set(initJsonObj);
  }
  
  // 重複チェック
  checkDuplication = () => {
    for (let key in this.state.myJsonObj) {
      if (this.state.HimokuName === this.state.myJsonObj[key]['category_name']){
        this.setState({myMessage:'：「費目名称」が重複しています。'});
        return false;
      }
    }
    this.setState({myMessage:''});
    return true;
  }
  
  // データ削除
  deleteData = (delkey) => {
    // 使用中チェック
    if (this.checkExist(delkey) === false) {
      return false;
    }
    // 削除実行
    firebaseDb.ref('categories/'+this.props.myUserId+'/'+delkey).set(null);
  }
  
  // 使用中チェック
  checkExist = (delkey) => {
    for (let key in this.state.mainJsonObj){
      if (delkey===this.state.mainJsonObj[key]['category_id']){
        this.setState({myMessageDel:'：すでに使用されているため削除できません。'});
        return false;
      }
    }
    this.setState({myMessageDel:''});
    return true;
  }
}

export default MyHimokuMaster;
