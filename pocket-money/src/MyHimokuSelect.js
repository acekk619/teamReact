import React from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

// 費目選択コンポーネント
class MyHimokuSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  onChageRaido = (event) => {
    this.props.onChageRaido(event);
  }
  
  render() {
    let jsx = (
      <FormGroup>
        <Radio onChange={this.onChageRaido} value="00お菓子" name="item">お菓子</Radio>
        <Radio onChange={this.onChageRaido} value="01本" name="item">本</Radio>
        <Radio onChange={this.onChageRaido} value="02文具" name="item">文具</Radio>
        <Radio onChange={this.onChageRaido} value="03雑貨" name="item">雑貨</Radio>
      </FormGroup>
    );
    return jsx;
  }
}

export default MyHimokuSelect;
