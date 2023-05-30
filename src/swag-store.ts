window.addEventListener("load", () => {
  const cart = new Cart();

  const productsContainer = document.querySelector<HTMLDivElement>(
    "div.product-wrapper div.collection-list.w-dyn-items"
  );
  if (productsContainer) {
    const itemEls =
      productsContainer.querySelectorAll<HTMLDivElement>("div.w-dyn-item");
    itemEls.forEach((itemEl) => {
      const addBtn =
        itemEl.querySelector<HTMLAnchorElement>("a.add-to-cart-btn");
      if (addBtn) {
        addBtn.addEventListener("click", (ev) => {
          ev.preventDefault();
          const item: ItemT = {
            id: "",
            name: "",
            img: "",
            qty: 1,
          };

          const nameEl =
            itemEl.querySelector<HTMLHeadingElement>("h1.product-heading");
          if (nameEl) {
            item.name = nameEl.textContent;
            item.id = nameEl.textContent.toLowerCase().split(" ").join("-");
          }

          const imgEl =
            itemEl.querySelector<HTMLImageElement>("img.product-img");
          if (imgEl) item.img = imgEl.src;

          cart.addItem(item);
        });
      }
    });
  }
});
