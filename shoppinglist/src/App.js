import React from "react";
import logo from "./logo.svg";
import { Button, Table, Form } from "react-bootstrap";
import "./App.css";

export default class APP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addItems: ["milk", "bread", "fruit"],
      message: ""
    };
  }

  /*--prevent form so the page doesn't refresh on submit--*/

  addItem(e) {
    e.preventDefault();
    const { addItems } = this.state;

    /*--- this value from the ref method in the form--*/
    const newItem = this.newItem.value;

    /*--if item is included return true--*/
    const isOnTheList = addItems.includes(newItem);

    if (isOnTheList) {
      this.setState({
        message: "This item is already on the list."
      });
    } else {
      /*---update old item to new items--*/
      newItem !== "" &&
        this.setState({
          addItems: [...this.state.addItems, newItem],
          message: ""
        });
    }

    /*--reset form--*/
    this.addForm.reset();
  }

  removeItem(item) {
    /*--get old items and filter individually--*/
    const newaddItems = this.state.addItems.filter(takeItem => {
      return takeItem !== item;
    });

    /*---state for new items after removed--*/
    this.setState({
      addItems: [...newaddItems]
    });
  }

  render() {
    const { addItems, message } = this.state;
    return (
      <div className="App">
        <header>
          <img src={logo} alt="logo" className="App-logo" />
          <h1>To Do List</h1>
        </header>

        <div className="Content">
          {/*---form section-added ref method added to clear form after add item---*/}
          <Form
            ref={input => (this.addForm = input)}
            className="form-inline"
            onSubmit={e => {
              this.addItem(e);
            }}
          >
            <Form.Group>
              <label className="sr-only" htmlFor="newItemInput">
                Add New Item
              </label>

              {/*---ref to dom method--*/}
              <input
                ref={input => (this.newItem = input)}
                type="text"
                placeholder="Enter item"
                className="form-control"
                id="newItemInput"
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
          {/*---End of form list section*/}

          {/*---Table list section*/}
          {message !== "" && <p className="message text-danger">{message}</p>}
          <Table responsive="sm" borderless hover className="table">
            <thead>
              <tr>
                <th>
                  <u>Item</u>
                </th>
                <th>
                  <u>Action</u>
                </th>
              </tr>
            </thead>
            <tbody>
              {addItems.map(item => {
                return (
                  <tr key={item}>
                    <td>{item}</td>
                    <td className="text-right">
                      <Button
                        onClick={e => this.removeItem(item)}
                        type="button"
                        variant="outline-danger"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
