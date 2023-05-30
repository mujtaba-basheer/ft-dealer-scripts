window.onload = function () {
  initFloaters();
  UpdatePrice();

  $('input[name="chkSelOptions[]"]').change(function () {
    ProcessFPSelectOptions();
  });
};

//If we are loading an existing quote we need to update the form fields
function UpdateQuoteFormFields() {
  //Insert the options values
  //Populate other information
  document.form1.trailer_qty.value = "1";
  document.form1.quote_ref.value = "";
  document.form1.quote_company.value = "EQUIPMENT LOGISTICS";
  //Recalculate everything
  UpdatePrice();
}

var price_0 = 0,
  price_1 = 0,
  price_2 = 0,
  price_3 = 0,
  price_4 = 0,
  price_5 = 0,
  price_6 = 0,
  price_7 = 0,
  price_8 = 0,
  price_9 = 0,
  price_10 = 0,
  price_11 = 0,
  price_12 = 0,
  price_13 = 0,
  price_14 = 0,
  price_15 = 0,
  price_16 = 0,
  price_17 = 0,
  price_18 = 0,
  price_19 = 0,
  price_20 = 0,
  price_21 = 0,
  price_22 = 0,
  price_23 = 0;
var weight_0 = 0,
  weight_1 = 0,
  weight_2 = 0,
  weight_3 = 0,
  weight_4 = 0,
  weight_5 = 0,
  weight_6 = 0,
  weight_7 = 0,
  weight_8 = 0,
  weight_9 = 0,
  weight_10 = 0,
  weight_11 = 0,
  weight_12 = 0,
  weight_13 = 0,
  weight_14 = 0,
  weight_15 = 0,
  weight_16 = 0,
  weight_17 = 0,
  weight_18 = 0,
  weight_19 = 0,
  weight_20 = 0,
  weight_21 = 0,
  weight_22 = 0,
  weight_23 = 0;

var price = 64751.43;
var basePrice = 64751.43;
var dealerDiscountPCTG = 0.2825;
var optionDiscountPCTG = 0.3;

function UpdatePrice() {
  var totalOptionPrice =
    price_0 +
    price_1 +
    price_2 +
    price_3 +
    price_4 +
    price_5 +
    price_6 +
    price_7 +
    price_8 +
    price_9 +
    price_10 +
    price_11 +
    price_12 +
    price_13 +
    price_14 +
    price_15 +
    price_16 +
    price_17 +
    price_18 +
    price_19 +
    price_20 +
    price_21 +
    price_22 +
    price_23 +
    0;
  //Calculating total price without discount
  price = basePrice + totalOptionPrice;
  if (document.getElementById("lblTotalPrice") != null) {
    document.getElementById("lblTotalPrice").innerHTML = formatCurrency(price);
  }
  document.form1.total_price.value = price;

  //Calculate total discount for base price and option price. No discount for additional options and extra items
  var totalDiscountPerTrailer =
    basePrice * dealerDiscountPCTG + totalOptionPrice * optionDiscountPCTG;
  if (document.getElementById("lblDealerDiscount") != null) {
    document.getElementById("lblDealerDiscount").innerHTML = formatCurrency(
      totalDiscountPerTrailer
    );
  }

  var dealerNetCost = price - totalDiscountPerTrailer;
  if (document.getElementById("lblDealerNetCost") != null) {
    document.getElementById("lblDealerNetCost").innerHTML =
      formatCurrency(dealerNetCost);
  }

  //Compute Fontaine Select Products
  var fspPrice = eval($("#spnSelProdTotalPrice").text());

  //Calculate Additional option values
  var totalAddtionalOptionPrice = 0;
  $(".aop-value").each(function () {
    if ($(this).val() != "") {
      totalAddtionalOptionPrice += parseFloat($(this).val());
    }
  });

  var totalAddtionalOptionWeight = GetAopWeight();
  $("#lblAOpWeight").empty().html(totalAddtionalOptionWeight.toFixed(2));
  $("#lblAOpValue").empty().html(totalAddtionalOptionPrice.toFixed(2));

  var netCost = dealerNetCost + totalAddtionalOptionPrice + fspPrice;
  if (document.getElementById("lblNetCost") != null) {
    document.getElementById("lblNetCost").innerHTML = formatCurrency(netCost);
  }

  var costPerTrailer = netCost;
  document.form1.trailer_price.value = costPerTrailer;
  if (document.getElementById("lblCostPerTrailer") != null) {
    document.getElementById("lblCostPerTrailer").innerHTML =
      formatCurrency(costPerTrailer);
  }

  //Compute extra value
  var extraItemPrice = 0;
  if (document.form1.extra_item_value.value > 0) {
    extraItemPrice = parseFloat(document.form1.extra_item_value.value);
  }

  var total = costPerTrailer + extraItemPrice;
  document.getElementById("lblTotal").innerHTML = formatCurrency(total);

  var grandTotal = (total * document.form1.trailer_qty.value).toFixed(2);
  document.getElementById("lblGrandTotal").innerHTML =
    formatCurrency(grandTotal);

  var totalWeight = GetTotalWeight();
  var weightText = GetWeightText();
  document.form1.total_weight.value = totalWeight;
  document.getElementById("lblPriceTop").innerHTML =
    formatCurrency(grandTotal) + weightText;
  document.getElementById("lblPriceFloater").innerHTML =
    "Total: <br>" + formatCurrency(grandTotal) + weightText;
}

function GetTotalWeight() {
  baseweight = 8991;
  weight =
    baseweight +
    weight_0 +
    weight_1 +
    weight_2 +
    weight_3 +
    weight_4 +
    weight_5 +
    weight_6 +
    weight_7 +
    weight_8 +
    weight_9 +
    weight_10 +
    weight_11 +
    weight_12 +
    weight_13 +
    weight_14 +
    weight_15 +
    weight_16 +
    weight_17 +
    weight_18 +
    weight_19 +
    weight_20 +
    weight_21 +
    weight_22 +
    weight_23 +
    0;
  weight += GetAopWeight();
  weight += eval($("#spnSelProdTotalWeight").text());
  return weight;
}

function GetAopWeight() {
  var aopWeight = 0;
  $(".aop-weight").each(function () {
    if ($(this).val() != "") {
      aopWeight += parseFloat($(this).val());
    }
  });
  return aopWeight;
}

function GetWeightText() {
  var totalWeight = GetTotalWeight();
  var weightText = "<small> (" + formatNumberComma(totalWeight) + "#)</small>";
  return weightText;
}

function SetLabel(element, text, price, weight, nb, boldvalue, nohide) {
  el = document.getElementById(element);
  eval("eltype = document.form1.OTYP" + nb);
  eval("elinput = document.form1.OVAL" + nb);
  if (eltype.value != "NO" && boldvalue == 1) {
    if (eltype.value == "NB") {
      if (elinput.value == "") elinput.value = 1;
      price = price * elinput.value;
      discPrice = price * 0.7; //Applying 30% discount
      weight = weight * elinput.value;
      text =
        text +
        "<br>&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;Total for " +
        elinput.value +
        " unit(s): [" +
        formatCurrency(discPrice) +
        "]"; //[" + weight + "#] - 30%";
    }
  }
  el.style.display = "block";
  el.innerHTML = text;

  if (boldvalue != 1) {
    el.style.fontWeight = "normal";
    el.parentNode.style.backgroundColor = "#E8E8E8";
  } else {
    el.style.fontWeight = "bold";
    el.parentNode.style.backgroundColor = "#FFFFAA";
  }
  eval("price_" + nb + " = " + price);
  eval("weight_" + nb + " = " + weight);
  UpdatePrice();

  if (nohide == null || nohide == "false") {
    //hide table
    HideShow("tbl_" + element, element + "_img");
  }
}

function HideShow(tablename, img) {
  var el = document.getElementById(tablename);
  if (el.style.display == "none") {
    el.style.display = "block";
    document.getElementById(img).src = "images/minus.jpg";
  } else {
    el.style.display = "none";
    document.getElementById(img).src = "images/plus.jpg";
  }
}

function CheckForm(form) {
  ProcessAdditionalOptions();

  if (form.quote_ref.value == "") {
    alert("You must enter a Quote Reference.");
    document.form1.quote_ref.focus();
    return false;
  } else {
    return true;
  }
}

function AddOtherOptionsRow(target) {
  var table = $(target).closest("tr").parent().parent();
  if (table.find("tr").length > 8) {
    alert("Recommend you only add 5 options.");
  }

  var row = $("<tr>");
  var desc = $("<input>")
    .attr("type", "text")
    .attr("name", "aopDesc")
    .attr("style", "width:100%;")
    .attr("value", "");
  desc.addClass("aop-desc");
  var cel0 = $("<td>").append(desc);
  row.append(cel0);

  var value = $("<input>")
    .attr("type", "text")
    .attr("name", "aopValue")
    .attr("style", "width:100%; text-align:right;")
    .attr("value", "");
  value.addClass("aop-value");
  value.keyup(function () {
    CheckAndRecalculate(this, true);
  });
  var cel1 = $("<td>").append(value);
  row.append(cel1);

  var weight = $("<input>")
    .attr("type", "text")
    .attr("name", "aopWeight")
    .attr("style", "width:100%; text-align:right;")
    .attr("value", "");
  weight.addClass("aop-weight");
  weight.keyup(function () {
    CheckAndRecalculate(this, true);
  });
  var cel2 = $("<td>").attr("align", "right").append(weight);
  row.append(cel2);

  var delBtn = $("<img>")
    .attr("src", "images/delete.png")
    .attr("title", "delete")
    .attr("style", "cursor:pointer");
  delBtn.click(function () {
    $(this).closest("tr").remove();
    UpdatePrice();
  });
  var cel3 = $("<td>").append(delBtn);
  row.append(cel3);

  $(target).closest("tr").before(row);
}

function ProcessAdditionalOptions() {
  //Format all the Additional Options for server side processing
  if ($("#hdnAOptions").length > 0) {
    var aop = "";
    $(".aop-desc").each(function () {
      var desc = $(this);
      var value = desc.closest("tr").find(".aop-value");
      var weight = desc.closest("tr").find(".aop-weight");
      if (desc.val() != "" && value.val() != "") {
        var item = desc.val() + ";;" + value.val() + ";;" + weight.val();
        aop += aop == "" ? item : "||" + item;
      }
    });
    $("#hdnAOptions").val(aop);
  }
}

function CheckAndRecalculate(obj, allowDecimal) {
  var isValid = false;
  if (allowDecimal) {
    enterNumber(obj);
  } else {
    enterInteger(obj);
  }
  UpdatePrice();
}

function ProcessFPSelectOptions() {
  var selectStr = "";
  var tprice = 0.0;
  var tweight = 0.0;
  $('input[name="chkSelOptions[]"]').each(function () {
    var val = $(this).val();
    var splits = val.split(";");
    id = splits[0];
    price = eval(splits[1]);
    weight = eval(splits[2]);
    if (this.checked) {
      $(this).parent().parent().attr("bgcolor", "#E8E8E8;");
      var val = $(this).val();
      var splits = val.split(";");
      id = splits[0];
      price = eval(splits[1]);
      weight = eval(splits[2]);

      var qty = eval($("#ddlSelOptQty" + id).val());
      $("#spnOptTotal" + id)
        .empty()
        .text(formatCurrency(price * qty));
      tprice += price * qty;
      tweight += weight * qty;
      var str = id + ";" + qty + ";" + price + ";" + weight;
      selectStr += selectStr == "" ? str : "|" + str;
    } else {
      $("#spnOptTotal" + id)
        .empty()
        .text("$0.00");
      $(this).parent().parent().removeAttr("bgcolor");
    }
  });
  $("#spnSelProductTotal").empty().text(formatCurrency(tprice));
  $("#spnSelProdTotalPrice").empty().text(tprice);
  $("#spnSelProdTotalWeight").empty().text(tweight);
  $("#hdnSelectProducts").val(selectStr);
  UpdatePrice();
}

function ToggleSelectProductPane() {
  var btnText =
    $("#btnToggleSelProds").val() == "Expand" ? "Collapse" : "Expand";
  $("#btnToggleSelProds").val(btnText);
  $("#dvSelectProducts").toggle();
}
