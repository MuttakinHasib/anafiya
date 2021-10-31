export const orderTables = order => {
  const content = order?.orderItems.reduce(
    (a, item) =>
      a +
      `<tr>
          <td style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px'>
            <img style='width:40px;' src='${item.image}' alt=''/>
          </td>
          <td style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px'>
            ${item.name}
          </td>
          <td style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:center;padding:7px'>
            ${item.quantity}
          </td>
          <td style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px'>
            $${item.price}
          </td>
          <td style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px'>
            $${(Number(item.quantity) * Number(item.price)).toFixed(2)}
          </td>
        </tr>`,

    ''
  );

  return `
    <div style="max-width: 680px;">
      <p style='margin: 8px 0;'>To view your order click on the link below:</p>
      <a style='margin-bottom: 8px; display: block;' href="${
        process.env.CLIENT_URI
      }/order/${order?._id}" target="_blank">${process.env.CLIENT_URI}/order/${
    order?._id
  }</a>
    <br />
      <table
        style="
          border-collapse: collapse;
          width: 100%;
          border-top: 1px solid #dddddd;
          border-left: 1px solid #dddddd;
          margin-bottom: 20px;
        "
      >
        <thead>
          <tr>
            <td
              style="
                font-size: 12px;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                background-color: #efefef;
                font-weight: bold;
                text-align: left;
                padding: 7px;
                color: #222222;
              "
              colspan="2"
            >
              Order Details
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style="
                font-size: 12px;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                text-align: left;
                padding: 7px;
              "
            >
              <b>Order ID:</b> ${order?._id}<br />
              <b>Date Added:</b> ${order?.createdAt
                .toString()
                .substring(0, 10)}<br />
              <b>Payment Method:</b> ${order?.paymentMethod}<br />
              <b>Shipping Method:</b> Flat Shipping Rate
            </td>
            <td
              style="
                font-size: 12px;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                text-align: left;
                padding: 7px;
              "
            >
              <b>Name:</b> ${order?.shippingAddress?.name}<br />
              <b>E-mail:</b>
              <a href="mailto:${order?.shippingAddress?.email}" target="_blank"
                >${order?.shippingAddress?.email}</a><br />
              <b>Telephone:</b> ${order?.shippingAddress?.phone}<br />
              <b>Order Status:</b> ${
                order.isPaid
                  ? order.isDelivered
                    ? 'Delivered'
                    : 'Paid'
                  : 'Pending'
              }<br />
            </td>
          </tr>
        </tbody>
      </table>  
      <table style="
        border-collapse: collapse;
        width: 100%;
        border-top: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
        margin-bottom: 20px;
      ">
        <thead>
          <tr>
            <td style="
                  font-size: 12px;
                  border-right: 1px solid #dddddd;
                  border-bottom: 1px solid #dddddd;
                  background-color: #efefef;
                  font-weight: bold;
                  text-align: left;
                  padding: 7px;
                  color: #222222;
                ">
              Payment Address
            </td>
            <td style="
                  font-size: 12px;
                  border-right: 1px solid #dddddd;
                  border-bottom: 1px solid #dddddd;
                  background-color: #efefef;
                  font-weight: bold;
                  text-align: left;
                  padding: 7px;
                  color: #222222;
                ">
              Shipping Address
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="
                  font-size: 12px;
                  border-right: 1px solid #dddddd;
                  border-bottom: 1px solid #dddddd;
                  text-align: left;
                  padding: 7px;
                ">
              ${order?.shippingAddress?.name}<br />
              ${order?.shippingAddress?.phone}<br />
              ${order?.shippingAddress?.address}<br />
              ${order?.shippingAddress?.city} - 
              ${order?.shippingAddress?.postcode}<br />
              ${order?.shippingAddress?.country}
            </td>
            <td style="
                  font-size: 12px;
                  border-right: 1px solid #dddddd;
                  border-bottom: 1px solid #dddddd;
                  text-align: left;
                  padding: 7px;
                ">
                ${order?.shippingAddress?.name}<br />
                ${order?.shippingAddress?.phone}<br />
                ${order?.shippingAddress?.address}<br />
                ${order?.shippingAddress?.city} - 
                ${order?.shippingAddress?.postcode}<br />
                ${order?.shippingAddress?.country}
            </td>
          </tr>
        </tbody>
      </table>
      <table style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px">
        <thead>
          <tr>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:left;padding:7px;color:#222222">
              Product</td>
            <td
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:left;padding:7px;color:#222222">
              Title</td>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:right;padding:7px;color:#222222">
              Quantity</td>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:right;padding:7px;color:#222222">
              Price</td>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:right;padding:7px;color:#222222">
              Total</td>
          </tr>
        </thead>
        <tbody>
        ${content}
        </tbody>
        <tfoot>
          <tr>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px"
              colspan="4"><b>Sub-Total:</b></td>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px">
              $${order?.itemsPrice}
              </td>
          </tr>
          <tr>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px"
              colspan="4"><b>Flat Shipping Rate:</b></td>
              <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px">
                $${order?.shippingPrice}
              </td>
          </tr>
          <tr>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px"
              colspan="4"><b>Tax:</b></td>
              <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px">
                $${order?.taxPrice}
              </td>
          </tr>
          <tr>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px"
              colspan="4"><b>Total:</b></td>
            <td
              style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:right;padding:7px">
                $${order?.totalPrice}
              </td>
          </tr>
        </tfoot>
    </table>
  </div>
`;
};
