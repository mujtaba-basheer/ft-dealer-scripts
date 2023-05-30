const updateCartSize = async (n: number) => {
  const itemsNumTop = document.querySelector("div.cart-item div.items-number");
  if (itemsNumTop) itemsNumTop.textContent = `${n} items are in your cart`;

  const summaryWrapper = document.querySelector<HTMLDivElement>(
    "div.summary-wrapper"
  );
  if (summaryWrapper) {
    const itemNumEl =
      summaryWrapper.querySelector<HTMLDivElement>("div.item-number");
    if (itemNumEl) itemNumEl.textContent = n + "";
  }
};

window.addEventListener("load", () => {
  const cart = new Cart();

  const { items } = cart;
  updateCartSize(items.length);

  const productsContainer = document.querySelector<HTMLDivElement>(
    "div.cart-product-list"
  );
  if (productsContainer) {
    productsContainer
      .querySelectorAll("div.cart-product")
      .forEach((item) => item.remove());

    for (const item of items) {
      const { id, img, name, qty } = item;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-product";
      itemEl.id = id;
      {
        const imgBlock = document.createElement("div");
        imgBlock.className = "cart-product-img";
        {
          const imgEl = document.createElement("img");
          imgEl.className = "cart-product-image";
          imgEl.src = img;
          imgEl.loading = "lazy";
          imgEl.alt = "";

          imgBlock.appendChild(imgEl);
        }

        const infoEl = document.createElement("div");
        infoEl.className = "cart-product-details";
        {
          const summaryBlock = document.createElement("div");
          summaryBlock.className = "product-summary-div";
          {
            const nameEl = document.createElement("h6");
            nameEl.className = "h6 cart";
            nameEl.textContent = name;

            summaryBlock.appendChild(nameEl);
          }

          infoEl.appendChild(summaryBlock);
        }

        const formBlock = document.createElement("div");
        formBlock.className = "cart-select-form";
        {
          const innerFormBlock = document.createElement("div");
          innerFormBlock.className = "cart-form-block w-form";
          {
            const formEl = document.createElement("form");
            formEl.className = "cart-form";
            {
              const selectEl = document.createElement("select");
              selectEl.className = "cart-select w-select";
              {
                for (let i = 1; i <= 4; i++) {
                  const optionEl = document.createElement("option");
                  optionEl.value = i + "";
                  optionEl.textContent = i + "";
                  if (i === qty) optionEl.selected = true;

                  selectEl.appendChild(optionEl);
                }
              }
              selectEl.addEventListener("change", () => {
                const newQty: number = +selectEl.value;
                cart.updateItemQty(id, newQty);
              });

              formEl.appendChild(selectEl);
            }

            innerFormBlock.appendChild(formEl);
          }

          formBlock.appendChild(innerFormBlock);
        }

        const removeEl = document.createElement("a");
        removeEl.className = "remove-link";
        removeEl.href = "#";
        removeEl.textContent = "Remove";
        removeEl.addEventListener("click", (ev) => {
          ev.preventDefault();
          itemEl.remove();
          const n = cart.removeItem(id);
          updateCartSize(n);
        });

        itemEl.appendChild(imgBlock);
        itemEl.appendChild(infoEl);
        itemEl.appendChild(formBlock);
        itemEl.appendChild(removeEl);
      }

      productsContainer.appendChild(itemEl);
    }

    const removeAllBtn = document.querySelector<HTMLAnchorElement>(
      "div.cart-item a.remove-all-link"
    );
    if (removeAllBtn) {
      removeAllBtn.addEventListener("click", (ev) => {
        ev.preventDefault();

        cart.clear();
        productsContainer
          .querySelectorAll("div.cart-product")
          .forEach((item) => item.remove());
        updateCartSize(0);
      });
    }
  }
});
