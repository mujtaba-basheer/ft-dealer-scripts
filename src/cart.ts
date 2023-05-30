type ItemT = {
  id: string;
  name: string;
  img: string;
  qty: number;
};
type AddressT = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
};

class Cart {
  items: ItemT[];
  billingDetails: AddressT;
  checkoutModalEl: HTMLDivElement | null;

  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart") || "[]") as ItemT[];
    this.billingDetails = JSON.parse(
      localStorage.getItem("billing_details") ||
        `{
        "name": "",
        "email": "",
        "address": "",
        "city": "",
        "state": "",
        "zip_code": "",
        "phone": ""
      }`
    ) as AddressT;
    this.checkoutModalEl =
      document.querySelector<HTMLDivElement>("div.checkout-modal");

    if (this.checkoutModalEl) {
      const rootEl =
        this.checkoutModalEl.querySelector<HTMLDivElement>("div.items-block");

      if (rootEl) {
        rootEl
          .querySelectorAll<HTMLDivElement>("div.items-individual")
          .forEach((item) => item.remove());

        for (const item of this.items) {
          const { id, name, img } = item;

          const itemEl = document.createElement("div");
          itemEl.className = "items-individual";
          itemEl.id = id;
          {
            const infoEl = document.createElement("div");
            infoEl.className = "div-block-6";
            {
              const imgEl = document.createElement("img");
              imgEl.className = "cart-image";
              imgEl.src = img;
              imgEl.loading = "lazy";
              imgEl.alt = "";

              const nameBlock = document.createElement("div");
              nameBlock.className = "div-block-7";
              {
                const nameEl = document.createElement("div");
                nameEl.className = "product-name";
                nameEl.textContent = name;

                nameBlock.appendChild(nameEl);
              }

              infoEl.appendChild(imgEl);
              infoEl.appendChild(nameBlock);
            }

            const deleteBlock = document.createElement("div");
            {
              const imgEl = document.createElement("img");
              imgEl.className = "close-btn";
              imgEl.loading = "lazy";
              imgEl.alt = "";
              imgEl.src =
                "https://assets.website-files.com/6436e391fe5f1a46d86470fe/643e750795f35b498d1b84ad_Close.svg";
              imgEl.setAttribute(
                "data-w-id",
                "441548ba-3ca7-00a8-ee4c-2aefc08a226b"
              );

              deleteBlock.appendChild(imgEl);
              deleteBlock.addEventListener("click", () => {
                itemEl.remove();
                this.removeItem(id);
              });
            }

            itemEl.appendChild(infoEl);
            itemEl.appendChild(deleteBlock);
          }

          rootEl.appendChild(itemEl);
        }
      } else {
        this.logError("List element in modal doesn't exist.");
      }
    } else {
      this.logError("Modal element doesn't exist.");
    }
  }

  wait(time: number): Promise<null> {
    return new Promise((res) => {
      setTimeout(() => res(null), time);
    });
  }

  logError(msg: string): void {
    const err = new Error(msg);
    console.error(err);
  }

  clear(): void {
    this.items = [];
    this.billingDetails = {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
    };
    window.localStorage.setItem("cart", "[]");
    window.localStorage.setItem(
      "billing_details",
      JSON.stringify(this.billingDetails)
    );

    if (this.checkoutModalEl) {
      const itemEls: NodeListOf<HTMLDivElement> =
        this.checkoutModalEl.querySelectorAll<HTMLDivElement>(
          "div.items-individual"
        );
      itemEls.forEach((itemEl) => itemEl.remove());
    }
  }

  removeItem(id: string): number {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      if (this.checkoutModalEl) {
        const msgEl =
          this.checkoutModalEl.querySelector<HTMLDivElement>(
            "div.cart-message"
          );
        if (msgEl) {
          msgEl.style.display = "block";
          msgEl.textContent = "An item was removed from the cart.";
        }
      }

      window.localStorage.setItem("cart", JSON.stringify(this.items));
    } else {
      this.logError("Item doesn't exist.");
    }
    return this.items.length;
  }

  addItem(item: ItemT): void {
    const { id, name, img } = item;
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      if (this.checkoutModalEl) {
        const msgEl =
          this.checkoutModalEl.querySelector<HTMLDivElement>(
            "div.cart-message"
          );
        if (msgEl) {
          msgEl.style.display === "block";
          msgEl.textContent = `1 item has been added to your cart`;
        }

        const rootEl =
          this.checkoutModalEl.querySelector<HTMLDivElement>("div.items-block");

        if (rootEl) {
          this.items.push(item);

          const itemEl = document.createElement("div");
          itemEl.className = "items-individual";
          itemEl.id = id;
          {
            const infoEl = document.createElement("div");
            infoEl.className = "div-block-6";
            {
              const imgEl = document.createElement("img");
              imgEl.className = "cart-image";
              imgEl.src = img;
              imgEl.loading = "lazy";
              imgEl.alt = "";

              const nameBlock = document.createElement("div");
              nameBlock.className = "div-block-7";
              {
                const nameEl = document.createElement("div");
                nameEl.className = "product-name";
                nameEl.textContent = name;

                nameBlock.appendChild(nameEl);
              }

              infoEl.appendChild(imgEl);
              infoEl.appendChild(nameBlock);
            }

            const deleteBlock = document.createElement("div");
            {
              const imgEl = document.createElement("img");
              imgEl.className = "close-btn";
              imgEl.loading = "lazy";
              imgEl.alt = "";
              imgEl.src =
                "https://assets.website-files.com/6436e391fe5f1a46d86470fe/643e750795f35b498d1b84ad_Close.svg";
              imgEl.setAttribute(
                "data-w-id",
                "441548ba-3ca7-00a8-ee4c-2aefc08a226b"
              );

              deleteBlock.appendChild(imgEl);
              deleteBlock.addEventListener("click", () => {
                itemEl.remove();
                this.removeItem(id);
              });
            }

            itemEl.appendChild(infoEl);
            itemEl.appendChild(deleteBlock);
          }

          rootEl.appendChild(itemEl);

          window.localStorage.setItem("cart", JSON.stringify(this.items));
        } else {
          this.logError("List element in modal doesn't exist.");
        }
      } else {
        this.logError("Modal element doesn't exist.");
      }
    } else {
      this.logError("Item already exists.");
    }
  }

  updateItemQty(id: string, newQty: number): void {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this.items[itemIndex].qty = newQty;
      window.localStorage.setItem("cart", JSON.stringify(this.items));
    } else {
      this.logError("Item doesn't exist.");
    }
  }

  setBillingDetails(details: AddressT): void {
    this.billingDetails = details;
    window.localStorage.setItem("billing_details", JSON.stringify(details));
  }
}

// export default Cart;
