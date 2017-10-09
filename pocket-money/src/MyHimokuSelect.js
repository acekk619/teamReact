import React from 'react';
import { Radio, Panel } from 'react-bootstrap';
import { firebaseDb } from './firebase';

// 費目選択コンポーネント
class MyHimokuSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {myJsonObj:[]};
  }

  componentWillMount() {
    
    // データ作成
    // let initJsonObj = [
    //  {'category_id':'00','category_name':'お菓子'}
    // ,{'category_id':'01','category_name':'本'}
    // ,{'category_id':'02','category_name':'文具'}
    // ,{'category_id':'03','category_name':'雑貨'}
    // ];
    // firebaseDb.ref('categories/'+this.props.myUserId).set(initJsonObj);
    
    // データ取得
    firebaseDb.ref('categories/'+this.props.myUserId).on('value',(snapshot)=>{
      if (snapshot.exists()){
        this.setState({
          myJsonObj:snapshot.val()
        });
      }
    });
    
  }
  onChageRaido = (event) => {
    this.props.onChageRaido(event);
  }
  
  render() {

    let listItems = [];
    if (this.state.myJsonObj != null){
      for (let key in this.state.myJsonObj) {
        let tempItem = (
              <Radio onChange={this.onChageRaido}
                     value={this.state.myJsonObj[key]['category_id']}
                     name="item">{this.state.myJsonObj[key]['category_name']}</Radio>
        );
        if (listItems==null) {
          listItems=[tempItem];
        } else {
          listItems.push(tempItem);
        }
      }
    }
    
    return (
      <Panel header='費目' bsStyle="success">{listItems}</Panel>
    );
  }
}

export default MyHimokuSelect;
