import React from 'react';
import { Button, Glyphicon, Table } from 'react-bootstrap';

// 一覧表示コンポーネント
class MyList extends React.Component {

  render() {

    let listItems = "";
    if (this.props.myJsonObj != null) {
      listItems = this.props.myJsonObj.map((item, index) =>
        <tr key={index}>
            <td>{item.date}</td>
            <td>{item.category_name}</td>
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

export default MyList;
