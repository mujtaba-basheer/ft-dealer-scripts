window.addEventListener("load", () => {
  const cart = new Cart();

  try {
    const {
      billingDetails: { email, name, address, city, state, zip_code },
    } = cart;

    const emailSpan = document.getElementById(
      "emailspan"
    ) as HTMLSpanElement | null;
    if (emailSpan) emailSpan.textContent = email;

    const nameSpan = document.getElementById(
      "namespan"
    ) as HTMLSpanElement | null;
    if (nameSpan) nameSpan.textContent = name;

    const addressSpan = document.getElementById(
      "addressspan"
    ) as HTMLSpanElement | null;
    if (addressSpan)
      addressSpan.textContent = `${address}, ${city}, ${state} ${zip_code}`;

    cart.clear();
  } catch (error) {
    console.error(error);
  }
});
