//url & name are mandatory, the other parameters are optional and will take
//default values
function openwindow(url, name, width, height, scrollbars, resizable) {
  if (width == null) width = "480";
  if (height == null) height = "400";
  if (scrollbars == null) scrollbars = "no";
  if (resizable == null) resizable = "no";
  var options =
    "scrollbars=" +
    scrollbars +
    ",resizable=" +
    resizable +
    ",width=" +
    width +
    ",height=" +
    height;
  window.open(url, name, options);
}

function submitForm(formname) {
  document.forms[formname].submit();
}

function popPostNoValidation(the_form, url, height, width) {
  my_form = eval(the_form);
  my_window = window.open(
    "",
    "popup",
    "height=" +
      height +
      ",width=" +
      width +
      ",menubar=0,toolbar=0,location=1,status=1,scrollbars=1,resizable=1"
  );
  my_form.target = "popup";
  my_form.action = url;
  my_form.submit();
}

function pop_and_post(the_form, url, height, width) {
  my_form = eval(the_form);
  if (checkForm(my_form) == null || checkForm(my_form)) {
    my_window = window.open(
      "",
      "popup",
      "height=" +
        height +
        ",width=" +
        width +
        ",menubar=0,toolbar=0,location=1,status=1,scrollbars=1,resizable=1"
    );
    my_form.target = "popup";
    my_form.action = url;
    my_form.submit();
  }
  return false;
}

function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) num = "0";
  sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + "$" + num + "." + cents;
}

function formatNumberComma(num) {
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) num = "0";
  sign = num == (num = Math.abs(num));
  num = Math.floor(num + 0.50000000001).toString();
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + num;
}

function enterInteger(myObj) {
  var oldstring = myObj.value;
  var newstring = parseFloat(oldstring).toString();
  if (oldstring.length != newstring.length || newstring == "NaN") {
    alert("Input is not a number");
    myObj.value = "";
  }
}
function enterNumber(myObj) {
  if (isNaN(myObj.value)) {
    alert("Input is not a number");
    myObj.value = "";
  }
}

function checkRange(element, min, max) {
  myObj = document.getElementById(element);
  if (isNaN(myObj.value) && myObj.value != "") {
    alert("Input is not a number");
    myObj.value = "";
    return false;
  }
  if (myObj.value < min) {
    alert("Input must be bigger than " + min);
    return false;
  }
  if (myObj.value > max) {
    alert("Input must be smaller than " + max);
    return false;
  }
  return true;
}

function isNumberKey(e, allowDecimal) {
  var key;
  if (window.event) {
    key = window.event.keyCode;
  } else if (e) {
    key = e.which;
  } else {
    return true;
  }

  var keychar = String.fromCharCode(key);
  if (
    key == null ||
    key == 0 ||
    key == 8 ||
    key == 9 ||
    key == 13 ||
    key == 27
  ) {
    return true;
  } else if ("0123456789".indexOf(keychar) > -1) {
    return true;
  } else if (allowDecimal && keychar == ".") {
    return true;
  } else {
    return false;
  }
}
