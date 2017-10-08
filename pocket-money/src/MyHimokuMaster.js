import React from 'react';
import { firebaseDb } from './firebase';
import { Button ,Glyphicon ,Table ,Alert 
        ,FormGroup ,ControlLabel ,FormControl } from 'react-bootstrap';

// 費目マスター
class MyHimokuMaster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { HimokuName: ""
                 , myJsonObj: null
                 , myMessage: ""
    };
  }

  componentWillMount(){
    // データ取得
    firebaseDb.ref('categories/'+this.props.myUserId)
              .on('value',(snapshot)=>{
      if (snapshot.exists()){
        this.setState({
          // myJsonObj:JSON.parse(snapshot.val())
          myJsonObj:snapshot.val()
        });
      }
    });
  }
  
  render(){
    
    // 入力
    let alertMessage = null;
    if (this.state.myMessage !== '') {
      alertMessage = <Alert bsStyle="danger">
                      <strong>入力チェックエラー</strong>
                      {this.state.myMessage}
                     </Alert>;
    }
    
    // 追加ボタンの表示
    let blnAdd = false;
    if (this.state.HimokuName.length === 0) {
      blnAdd = true;
    }
    
    // 一覧の明細部
    let listItems = [];
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
        if (listItems.length===0){
          listItems=[tempItem];
        } else {
          listItems.push(tempItem);        
        }
      }
    }
    
    return (
      <div>      
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
  
        <div className="myRegion">
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
    let initJsonObj ={ 'category_id'  :'00'
                      ,'category_name':this.state.HimokuName};
    firebaseDb.ref('categories/'+this.props.myUserId).push(initJsonObj);
  }
  
  // データ削除
  deleteData = (delkey) => {
    console.log(delkey)
    firebaseDb.ref('categories/'+this.props.myUserId+'/'+delkey).set(null);
  }
  
}

export default MyHimokuMaster;
