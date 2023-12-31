import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { toast } from "react-toastify";

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(
      function (item) {
        return (
          <ItemRow
            onItemizedItemEdit={onItemizedItemEdit}
            item={item}
            onDelEvent={rowDel.bind(this)}
            key={item.id}
            currency={currency}
            invoiceToEdit={this.props.invoiceToEdit}
          />
        );
      }.bind(this)
    );
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>{itemTable}</tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>
          Add Item
        </Button>
      </div>
    );
  }
}
class ItemRow extends React.Component {
  handleClick = (event) => {
    if (this.props.invoiceToEdit) {
      event.preventDefault();
      toast.warning("You can't edit Item of the invoice.");
      event.target.blur();
    }
    else{
      this.props.onDelEvent(this.props.item);
    }
  };
  render() {
    return (
      <tr>
        <td style={{ width: "100%" }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Item name",
              value: this.props.item.name,
              id: this.props.item.id,
            }}
            invoiceToEdit={this.props.invoiceToEdit}
          />
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "description",
              placeholder: "Item description",
              value: this.props.item.description,
              id: this.props.item.id,
            }}
            invoiceToEdit={this.props.invoiceToEdit}
          />
        </td>
        <td style={{ minWidth: "70px" }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: this.props.item.quantity,
              id: this.props.item.id,
            }}
            invoiceToEdit={this.props.invoiceToEdit}
          />
        </td>
        <td style={{ minWidth: "130px" }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              leading: this.props.currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: this.props.item.price,
              id: this.props.item.id,
            }}
            invoiceToEdit={this.props.invoiceToEdit}
          />
        </td>
        <td className="text-center" style={{ minWidth: "50px" }}>
          <BiTrash
            onClick={this.handleClick}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-danger"
          />
        </td>
      </tr>
    );
  }
}

export default InvoiceItem;
