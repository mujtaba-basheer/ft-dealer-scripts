window.addEventListener("load", () => {
    const cart = new Cart();
    const productsContainer = document.querySelector("div.product-wrapper div.collection-list.w-dyn-items");
    if (productsContainer) {
        const itemEls = productsContainer.querySelectorAll("div.w-dyn-item");
        itemEls.forEach((itemEl) => {
            const addBtn = itemEl.querySelector("a.add-to-cart-btn");
            if (addBtn) {
                addBtn.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    const item = {
                        id: "",
                        name: "",
                        img: "",
                        qty: 1,
                    };
                    const nameEl = itemEl.querySelector("h1.product-heading");
                    if (nameEl) {
                        item.name = nameEl.textContent;
                        item.id = nameEl.textContent.toLowerCase().split(" ").join("-");
                    }
                    const imgEl = itemEl.querySelector("img.product-img");
                    if (imgEl)
                        item.img = imgEl.src;
                    cart.addItem(item);
                });
            }
        });
    }
});
