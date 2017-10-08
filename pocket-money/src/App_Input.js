import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import MyGraph from './MyGraph.js';
import MyHimokuSelect from './MyHimokuSelect.js';
import { Button, Glyphicon,
         Grid, Row, Col, Alert, Panel } from 'react-bootstrap';

// 入力コンポーネント
class MyInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { inputDate: moment()
                 , inputCategory_id: ""
                 , inputCategory_name: ""
                 , inputPrice: "" 
                 , myMessage:""
    };
  }

  // 変更イベント：日付
  handleInputChange2 = (date) => {
    this.setState({ inputDate: date });
  }

  // 変更イベント：カテゴリ
  onChageRaido = (event) => {
    this.setState({ inputCategory_id: event.currentTarget.value.substr(0,2)
                   ,inputCategory_name: event.currentTarget.value.substr(2)});
  }

  // 変更イベント：金額
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value });
  }

  // クリックイベント：追加
  onClickButton = (event) => {
    event.preventDefault();
    
    // 入力チェック
    if (this.checkInput()===false) {
      return;
    } else {
      // エラーメッセージのクリア
      this.setState({myMessage:''});
    }
    
    // 入力値を一覧に反映
    let obj = {
      "date": this.formatDate(this.state.inputDate, 'yyyy/MM/dd'),
      "category_id": this.state.inputCategory_id,
      "category_name": this.state.inputCategory_name,
      "price": this.state.inputPrice
    };
    this.props.onClickBtnAdd(obj);
    
    // 入力欄のクリア
    // this.setState({inputDate:"",inputCategory_id:"",inputPrice:""});
    
  }

  // 入力チェック
  checkInput = () => {
    // 費目
    if (this.state.inputCategory_id==='') {
      //alert('費目を選択してください。');
      this.setState({myMessage:'：「費目」を選択してください。'});
      return false;
    }
    // 金額
    if (this.state.inputPrice==='') {
      //alert('金額を入力してください。');
      this.setState({myMessage:'：「金額」を入力してください。'});
      return false;
    }
    return true;    
  }

  // 日付を文字列変換
  formatDate = (date, format) => {
    date = new Date(date);
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    return format;
  }

  render() {
    
    let alertMessage = null;
    if (this.state.myMessage !== '') {
      alertMessage = <Alert bsStyle="danger">
                      <strong>入力チェックエラー</strong>
                      {this.state.myMessage}
                     </Alert>;
    }
    
    return (
      <div className="myRegion">
        {alertMessage}
        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <DatePicker selected={this.state.inputDate} onChange={this.handleInputChange2}
                          locale="ja" dateFormat="YYYY/MM/DD" todayButton={"今日"}
                          placeholderText="クリックして選択" isClearable={true} inline />
            </Col>
            <Col xs={6} md={3}>
              <MyHimokuSelect onChageRaido={this.onChageRaido} myUserId={this.props.myUserId} />
            </Col>
            <Col xs={6} md={3} xsOffset={6} mdOffset={0}>
              <Panel header='金額（円）' bsStyle="success">
                <input type="number" className="form-control" id="price"
                       placeholder="1000" name="inputPrice" 
                       value={this.state.inputPrice} onChange={this.handleInputChange} />
              </Panel>
            </Col>
            <Col xs={12} md={12}>
              <Button type="button" className="btnAdd" bsStyle="success" 
                      block onClick={this.onClickButton}>
              <Glyphicon glyph="plus" />追加</Button>
            </Col>
            <Col xs={12} md={12}>
              <MyGraph />
            </Col>
          </Row>
        </Grid>
      </div>    
    );
  }
}

export default MyInput;
