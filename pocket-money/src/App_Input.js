import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import MyGraph from './MyGraph.js';
import { FormGroup, Button, Glyphicon, Radio,
         Grid, Row, Col } from 'react-bootstrap';

// 入力コンポーネント
class MyInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { inputDate: "", inputItem: "", inputPrice: "" };
    this.state = { inputDate2: moment() };
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value });
  }

  handleInputChange2 = (date) => {
    this.setState({ inputDate2: date });
  }

  onClickButton = (event) => {
    event.preventDefault();
    // 入力値を一覧に反映
    let obj = {
      "key": "0",
      "date": this.formatDate(this.state.inputDate2, 'yyyy/MM/dd') // todo:文字列に変換する！
        ,
      "item": this.state.inputItem,
      "price": this.state.inputPrice
    };
    this.props.onClickBtnAdd(obj);
    // 入力欄のクリア
    // this.setState({inputDate:"",inputItem:"",inputPrice:""});
  }

  onChageRaido = (event) => {
    this.setState({ inputItem: event.currentTarget.value });
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
    return (
      <div className="myRegion">
        <Grid>
          <Row>
            <Col xs={6} md={6}>
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
                <Col xs={3} md={3}>
                  <FormGroup>
                    <Radio name="item" onChange={this.onChageRaido} value="おやつ">おやつ</Radio>
                    <Radio name="item" onChange={this.onChageRaido} value="文具">文具</Radio>
                    <Radio name="item" onChange={this.onChageRaido} value="本">本</Radio>
                    <Radio name="item" onChange={this.onChageRaido} value="雑貨">雑貨</Radio>
                  </FormGroup>
                </Col>
                <Col xs={4} md={4}>
                  <FormGroup>
                    <label for="price">金額（円）</label>
                    <input type="number" className="form-control" id="price"
                                     placeholder="1000" name="inputPrice" 
                                     value={this.state.inputPrice} onChange={this.handleInputChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Button type="button" className="btnAdd" bsStyle="success" 
                                        onClick={this.onClickButton}>
                    <Glyphicon glyph="plus" />追加</Button>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col xs={4} md={4}>
              <MyGraph />
            </Col>
          </Row>
        </Grid>
      </div>    
    );
  }
}

export default MyInput;
