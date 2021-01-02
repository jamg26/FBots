import React from "react";
import { Button } from "antd";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

const PrintOrder = (props) => {
  const [data, setData] = React.useState(null);
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const orderStatusColor = (status) => {
    return status === "PAID" || status === "SHIPPED"
      ? "#0ba12a"
      : status === "NOT_PAID"
      ? "#2a2a2a"
      : status === "CANCELLED"
      ? "#910909"
      : "#000000";
  };

  React.useEffect(() => {
    let total = 0;
    let orders = props.orders?.map((order) => {
      total += order.price;
      return [
        {
          text: `${order.status}`,
          fontSize: 8,
          alignment: "center",
          color: orderStatusColor(order.status),
        },
        {
          text: order.page_name,
          fontSize: 8,
          bold: true,
        },
        {
          text: `PHP ${order.price.toFixed(2)}`,
          fontSize: 8,
          alignment: "right",
        },
        {
          text: `${new Date(order.createdAt).toLocaleString("en-US", {
            hour12: true,
          })}`,
          fontSize: 8,
          alignment: "right",
          italics: true,
          color: "#2a2a2a",
        },
        {
          text: order.address,
          fontSize: 8,
        },
      ];
    });
    orders && orders.unshift(["Status", "Page", "Amount", "Date", "Address"]);
    orders &&
      orders.push([
        "",
        "",
        {
          text: `PHP ${total.toFixed(2)}`,
          fontSize: 8,
          alignment: "right",
          bold: true,
        },
        "",
        "",
      ]);
    setData(orders);
  }, [props.orders, props.stats]);

  function printPdf() {
    var dd = {
      content: [
        {
          text: [
            {
              text: "FBOTS FOR MESSENGER",
              color: "#ee0e51",
              fontSize: 20,
              bold: true,
            },
          ],
        },
        {
          text: `Generated Date: ${new Date().toLocaleString("en-US", {
            hour12: true,
          })}\n\n\n`,
          fontSize: 8,
        },
        {
          table: {
            widths: [50, "*", "*", 100, 150],
            body: data,
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length ? "black" : "gray";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length
                ? "black"
                : "gray";
            },
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "justify",
        },
      },
    };

    pdfMake.createPdf(dd).open();
  }

  return <Button onClick={() => printPdf()}>{props.icon}</Button>;
};

export default PrintOrder;
