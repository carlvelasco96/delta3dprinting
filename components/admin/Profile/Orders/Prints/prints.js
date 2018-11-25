/* =========================== ADMIN PROFILE ORDER: PRINTS COMPONENTS =========================== */

// Profile Orders Prints Object
let adminProfileOrdersPrintsObject;

// Profile Orders Prints Object Properties
const adminProfileOrdersPrintsId = "prints";
const adminProfileOrdersPrintsName = "Prints";

// Contruct Profile Orders Prints Object
const contructAdminProfileOrdersPrintsObject = () => {
  adminProfileOrdersPrintsObject = new adminProfileOrdersComponentObject(
    adminProfileOrdersPrintsId,
    adminProfileOrdersPrintsName,
    adminProfileOrdersPrintsInit
  );
};

/* ======================================= INITIALISATION ======================================= */

const adminProfileOrdersPrintsInit = () => {
  constructAdminProfileOrdersPrintsBaseHTML();
  loadAdminProfileOrdersPrintsOrderList();
  adminProfileOrdersPrintsDiscountInit();
};

/* ==================================== CREATE THE BASE HTML ==================================== */

const constructAdminProfileOrdersPrintsBaseHTML = () => {
  const adminProfileOrdersPrintsBaseHTML =
    "<div id='admin_profile_orders_prints_body'>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Awaiting Quote</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_awaiting_quote_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Awaiting Payment Confirmation</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_awaiting_payment_confirmation_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Printing Order</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_printing_order_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Ready for Pickup</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_ready_for_pickup_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Ready for Shipping</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_ready_for_shipping_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Orders</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_orders_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#admin_profile_orders_contents_body"
  ).innerHTML = adminProfileOrdersPrintsBaseHTML;
};

/* ======================================= LOAD ORDER LIST ====================================== */

const adminPorfileOrdersOrderStatusIdsArray = [
  "awaiting_quote",
  "awaiting_payment_confirmation",
  "printing_order",
  "ready_for_pickup",
  "ready_for_shipping",
  "orders"
];

const loadAdminProfileOrdersPrintsOrderList = () => {
  adminPorfileOrdersOrderStatusIdsArray.forEach(element => {
    loadLoader(
      document.querySelector(
        "#admin_profile_orders_prints_" + element + "_list_contents_body"
      )
    ).then(() => {
      let url;

      switch (element) {
        case "awaiting_quote":
          url = "/admin/orders/awaiting-quote";
          break;
        case "awaiting_payment_confirmation":
          url = "/admin/orders/awaiting-payment-confirmation";
          break;
        case "printing_order":
          url = "/admin/orders/printing-order";
          break;
        case "ready_for_pickup":
          url = "/admin/orders/ready-for-pickup";
          break;
        case "ready_for_shipping":
          url = "/admin/orders/ready-for-shipping";
          break;
        case "orders":
          url = "/admin/orders";
      }

      $.ajax({
        url: url,
        success: data => {
          addAdminProfileOrdersPrintsOrderList(data, element);
        }
      });
    });
  });
};

const addAdminProfileOrdersPrintsOrderList = (orders, id) => {
  // Table Body
  const profileOrdersPrintsOrdersListTableBodyHTML =
    "<table class='admin_profile_orders_prints_" +
    id +
    "_list_table admin_profile_orders_prints_orders_list_table'>" +
    "<tbody id='admin_profile_orders_prints_" +
    id +
    "_list_table_content_body'></tbody>" +
    "</table>";
  document.querySelector(
    "#admin_profile_orders_prints_" + id + "_list_contents_body"
  ).innerHTML = profileOrdersPrintsOrdersListTableBodyHTML;
  // Populate the Table with Contents
  orders.forEach(ele => {
    let totalOrderedQuantity = 0;
    let totalProducedQuantity = 0;
    let deadline = "";

    for (i = 0; i < ele.parts.length; i++) {
      totalOrderedQuantity += Number(ele.parts[i].orderQuantity);
      totalProducedQuantity += Number(ele.parts[i].producedQuantity);
    }

    if (!ele.paymentConfirmationDate) {
      deadline = "---";
    } else {
      const dateObject = dateFormatter(ele.paymentConfirmationDate);
      let numberOfDays;
      switch (ele.pricing) {
        case "Basic":
          numberOfDays = 5;
          break;
        case "Priority":
          numberOfDays = 3;
          break;
        case "Urgent":
          numberOfDays = 1;
          break;
      }
      const deadlineDefaultFormat = moment(ele.paymentConfirmationDate).add(
        numberOfDays,
        "d"
      );
      deadline = dayDateMonthYearFormat(deadlineDefaultFormat._d);
    }

    const creationDate = dayDateMonthYearFormat(ele.creationDate);
    const lastUpdateDate = dateFormatter(ele.lastUpdateDate).fromNow;

    const adminProfileOrdersPrintsOrdersListTableContent =
      "<tr id='admin_profile_orders_prints_" +
      id +
      "_order_number_" +
      ele.orderNumber +
      "' class='admin_profile_orders_prints_orders_list_table_row'>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_order_number_content'>" +
      ele.orderNumber +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_creation_date_content'>" +
      creationDate +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_status_content'>" +
      ele.orderStatus +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_update_content'>" +
      lastUpdateDate +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_quantity_content'>" +
      totalProducedQuantity +
      "/" +
      totalOrderedQuantity +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_deadline_content'>" +
      deadline +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_print_setting_content'>" +
      ele.pricing +
      ", " +
      ele.delivery +
      "</td>" +
      "</tr>";
    document
      .querySelector(
        "#admin_profile_orders_prints_" + id + "_list_table_content_body"
      )
      .insertAdjacentHTML(
        "beforeend",
        adminProfileOrdersPrintsOrdersListTableContent
      );
    document
      .querySelector(
        "#admin_profile_orders_prints_" +
          id +
          "_order_number_" +
          ele.orderNumber
      )
      .addEventListener("click", () => {
        viewAdminProfileOrdersPrintsOrderDetails(ele.orderNumber);
      });
  });
};

/* ============================================================================================== */
