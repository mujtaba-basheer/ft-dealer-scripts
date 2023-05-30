window.addEventListener("load", () => {
  const cart = new Cart();

  const formEl = document.getElementById(
    "email-form"
  ) as HTMLFormElement | null;
  if (formEl) {
    formEl.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();

      const billingDetails: AddressT = {
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
      };

      const nameEl =
        formEl.querySelector<HTMLInputElement>(`input[name="name"]`);
      if (nameEl) billingDetails.name = nameEl.value;

      const emailEl =
        formEl.querySelector<HTMLInputElement>(`input[name="email"]`);
      if (emailEl) billingDetails.email = emailEl.value;

      const addressEl = formEl.querySelector<HTMLInputElement>(
        `input[name="Address"]`
      );
      if (addressEl) billingDetails.address = addressEl.value;

      const cityEl =
        formEl.querySelector<HTMLInputElement>(`input[name="City"]`);
      if (cityEl) billingDetails.city = cityEl.value;

      const stateEl =
        formEl.querySelector<HTMLSelectElement>(`select[name="State"]`);
      if (stateEl) billingDetails.state = stateEl.value;

      const zipCodeEl =
        formEl.querySelector<HTMLInputElement>(`input[name="ZIP"]`);
      if (zipCodeEl) billingDetails.zip_code = zipCodeEl.value;

      const phoneEl =
        formEl.querySelector<HTMLInputElement>(`input[name="Phone"]`);
      if (phoneEl) billingDetails.phone = phoneEl.value;

      const body = JSON.stringify({ ...billingDetails, item: cart.items });
      try {
        cart.setBillingDetails(billingDetails);
        const req = await fetch(
          "https://hook.integromat.com/zay4ujxycahirtitrmdqt9iynpr8r4yr",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          }
        );
        await req.json();
        window.location.pathname = "/thankyou";
      } catch (error) {
        console.error(error);
      }
    });
  }
});

/*
{

    "name":"Mujtaba Basheer",
    "email":"mujtababasheer14@gmail.com",
    "address":"26 A, North Range",
    "city":"Kolkata",
    "state":"Georgia",
    "zip_code":"700017",
    "phone":"1234567890",
    "item":[
        {
            "id":"doloribus-neque-perspiciatis",
            "name":"Doloribus Neque Perspiciatis",
            "img":"https://assets.website-files.com/643e322c1ef7d03fc6377577/643e52a78816092b0a51cd78_image15.jpeg",
            "qty":2
        },
        {
            "id":"dolores-voluptate",
            "name":"Dolores Voluptate",
            "img":"https://assets.website-files.com/643e322c1ef7d03fc6377577/643e52a78816090fef51cd77_image16.jpeg",
            "qty":3
        },
        {
            "id":"incidunt-deleniti",
            "name":"Incidunt Deleniti",
            "img":"https://assets.website-files.com/643e322c1ef7d03fc6377577/643e52a7881609eda951cd74_image15.jpeg",
            "qty":4
        }
    ]

}
{

    "name":"Mujtaba Basheer",
    "email":"mujtababasheer14@gmail.com",
    "address":"26 A, North Range",
    "city":"Kolkata",
    "state":"Georgia",
    "zip_code":"700017",
    "phone":"1234567890",
    "item":[
        {
            "id":"doloribus-neque-perspiciatis",
            "name":"Doloribus Neque Perspiciatis",
            "img":"https://assets.website-files.com/643e322c1ef7d03fc6377577/643e52a78816092b0a51cd78_image15.jpeg",
            "qty":2
        },
        {
            "id":"dolores-voluptate",
            "name":"Dolores Voluptate",
            "img":"https://assets.website-files.com/643e322c1ef7d03fc6377577/643e52a78816090fef51cd77_image16.jpeg",
            "qty":3
        },
        {
            "id":"incidunt-deleniti",
            "name":"Incidunt Deleniti",
            "img":"https://assets.website-files.com/643e322c1ef7d03fc6377577/643e52a7881609eda951cd74_image15.jpeg",
            "qty":4
        }
    ]

}
*/
