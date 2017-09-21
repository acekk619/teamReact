import React, { Component } from 'react';
import './App.css';

import { Button } from 'react-bootstrap'
import { Jumbotron } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Jumbotron>
          <h1>Firebaseを利用したReactお小遣い帳アプリを考案してみたんだが</h1>
        </Jumbotron>

        <div className="myRegion">
          <Form inline>
            <FormGroup>
              <label for="date">日付</label>
              <input type="text" className="form-control" id="date" placeholder="20170917"/>
            </FormGroup>
            <FormGroup>
              <label for="item">品目</label>
              <input type="text" className="form-control" id="item" placeholder="食品"/>
            </FormGroup>
            <FormGroup>
              <label for="price">金額（円）</label>
              <input type="text" className="form-control" id="price" placeholder="1000"/>
            </FormGroup>
            <FormGroup>
              <Button type="submit" className="btnAdd" bsStyle="success">
                <i className="glyphicon glyphicon-plus"></i>追加</Button>
            </FormGroup>
          </Form>
        </div>
        
        
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
            <tbody>
              <tr>
                <td>20170917</td>
                <td>KitKat(岩泉ヨーグルト味)</td>
                <td>500</td>
                <td><Button type="button" bsStyle="warning" bsSize="small" block ><i className="glyphicon glyphicon-trash"></i></Button></td>
              </tr>
              <tr>
                <td>20170917</td>
                <td>短角牛</td>
                <td>2000</td>
                <td><Button type="button" bsStyle="warning" bsSize="small" block ><i className="glyphicon glyphicon-trash"></i></Button></td>
              </tr>
              <tr>
                <td>20170917</td>
                <td>じゃがいも</td>
                <td>300</td>
                <td><Button type="button" bsStyle="warning" bsSize="small" block ><i className="glyphicon glyphicon-trash"></i></Button></td>
              </tr>
            </tbody>
          </Table>
         </div>
  
  

      </div>
    );
  }
}

export default App;
