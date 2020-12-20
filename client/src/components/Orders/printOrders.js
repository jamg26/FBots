import React from "react";
import { Button } from "antd";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

const PrintOrder = (props) => {
  const [data, setData] = React.useState(null);
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  React.useEffect(() => {
    let orders = props.orders?.map((order) => {
      return [
        order.status
          ? {
              text: `${order.status}`,
              fontSize: 8,
              alignment: "center",
            }
          : "-",
        order.page_name
          ? {
              text: `${order.page_name}`,
              fontSize: 8,
            }
          : "-",
        order.price
          ? {
              text: `PHP ${order.price.toFixed(2)}`,
              fontSize: 8,
              alignment: "right",
            }
          : "-",
        {
          text: `${new Date(order.createdAt).toLocaleString("en-US", {
            hour12: true,
          })}`,
          fontSize: 8,
        },
        order.address
          ? {
              text: `${order.address}`,
              fontSize: 8,
            }
          : "-",
      ];
    });
    orders && orders.unshift(["Status", "Page", "Amount", "Date", "Address"]);
    orders &&
      orders.push([
        "TOTAL",
        "",
        {
          text: `PHP ${props.stats?.total}`,
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
          text: `FBOTS FOR MESSENGER`,
          style: "header",
          alignment: "center",
        },
        {
          text: `ORDER LIST`,
          style: "header",
          alignment: "center",
        },
        {
          text: `as of ${new Date().toLocaleString("en-US", {
            hour12: true,
          })}`,
          alignment: "center",
        },
        {
          table: {
            widths: [100, "*", "*", "*", "*"],
            body: data,
            //[
            //   ["", ""],
            //   ["", ""],
            //   [
            //     "Total Expenses:",
            //     {
            //       text: `PHP 1000`,
            //       alignment: "right",
            //     },
            //   ],
            //],
          },
          // layout: "lightHorizontalLines",
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

  return (
    <Button type="primary" onClick={() => printPdf()}>
      Print
    </Button>
  );
};

export default PrintOrder;
