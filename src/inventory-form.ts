type TrailerT = {
  name: string;
  model_no: string;
  category: string;
};
type GetTrailersAPIResp = {
  status: true;
  data: TrailerT[];
  msg: string;
};
type InventorySectionT = {
  category: string;
  selected: number;
  items: (TrailerT & { qty: number })[];
};
type InventoryT = {
  sections: InventorySectionT[];
  selected: number;
};
type InventoryItemT = {
  model_no: string;
  qty: number;
};
type InventoryFromDataT = InventoryItemT[];
type InventoryAPIRespT = {
  status: boolean;
  msg: string;
};

const getInventory: () => Promise<InventoryT> = () => {
  return new Promise((res, rej) => {
    fetch(`${baseUrl}/api/trailer`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((data: GetTrailersAPIResp) => {
        if (data.status) {
          const inventory: InventoryT = {
            sections: [],
            selected: 0,
          };
          const { data: trailers } = data;
          let c_s = -1; // current inventory section
          let c_c = ""; // current section category
          for (const trailer of trailers) {
            const { category } = trailer;
            if (category !== c_c) c_s++;

            if (!inventory.sections[c_s]) {
              c_c = category;
              inventory.sections.push({
                category,
                items: [],
                selected: 0,
              });
            }

            const section = inventory.sections[c_s];
            section.items.push(Object.assign({ qty: 0 }, trailer));
          }
          res(inventory);
        } else rej(new Error(data.msg));
      });
  });
};

const populateModal: (inventory: InventoryT) => void = (inventory) => {
  const modalEl = document.querySelector<HTMLDivElement>(
    "div.user-management-modal"
  );
  if (modalEl) {
    const formEl = modalEl.querySelector("form");
    const inventoryContainer = modalEl.querySelector("div.inventory-parent");
    inventoryContainer
      .querySelectorAll("div.inventory-content-div")
      .forEach((e) => e.remove());

    const { sections } = inventory;
    for (const section of sections) {
      const sectionEl = document.createElement("div");
      sectionEl.className = "inventory-content-div";

      {
        const headerEl = document.createElement("div");
        headerEl.className = "inventory-title-div";
        {
          const titleEl = document.createElement("div");
          titleEl.className = "title-text";
          titleEl.textContent = section.category;

          const qtyEl = document.createElement("div");
          qtyEl.className = "title-text font-400";
          qtyEl.textContent = `Total: ${section.selected}`;

          headerEl.appendChild(titleEl);
          headerEl.appendChild(qtyEl);
        }
        sectionEl.appendChild(headerEl);

        const { items } = section;
        for (const item of items) {
          const itemRowEl = document.createElement("div");
          itemRowEl.className = "inventory-input-content";
          {
            const nameEl = document.createElement("div");
            nameEl.className = "title-text font-400";
            nameEl.textContent = item.name;

            const qtyEl = document.createElement("div");
            qtyEl.className = "title-text font-400";
            qtyEl.textContent = `${item.qty}`;

            itemRowEl.appendChild(nameEl);
            itemRowEl.appendChild(qtyEl);
          }

          sectionEl.appendChild(itemRowEl);
        }
      }

      inventoryContainer.appendChild(sectionEl);
    }

    formEl.addEventListener("submit", (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();

      alert("submitted!");
    });
  }
};

window.addEventListener("load", async () => {
  const inventoryFormEl = document.querySelector<HTMLFormElement>(
    "div.inventory-content form"
  );
  const reviewFormEl = document.querySelector<HTMLFormElement>(
    "div.user-management-modal form"
  );
  if (inventoryFormEl && reviewFormEl) {
    const inventoryContainer = inventoryFormEl.querySelector<HTMLDivElement>(
      "div.inventory-parent"
    );

    try {
      inventoryFormEl
        .querySelectorAll(".inventory-content-div")
        .forEach((e) => e.remove());

      const inventory = await getInventory();

      const { sections } = inventory;

      for (const section of sections) {
        const sectionEl = document.createElement("div");
        sectionEl.className = "inventory-content-div";

        {
          const headerEl = document.createElement("div");
          headerEl.className = "inventory-title-div";
          {
            const titleEl = document.createElement("div");
            titleEl.className = "title-text";
            titleEl.textContent = section.category;

            const qtyEl = document.createElement("div");
            qtyEl.className = "title-text font-400";
            qtyEl.textContent = "Enter Quantity";

            headerEl.appendChild(titleEl);
            headerEl.appendChild(qtyEl);
          }
          sectionEl.appendChild(headerEl);

          const { items } = section;
          for (const item of items) {
            const itemRowEl = document.createElement("div");
            itemRowEl.className = "inventory-input-content";
            {
              const nameEl = document.createElement("div");
              nameEl.className = "title-text font-400";
              nameEl.textContent = item.name;

              const inputEl = document.createElement("input");
              inputEl.className = "inventory-text-field w-input";
              inputEl.type = "text";
              inputEl.placeholder = "0";
              {
                inputEl.addEventListener("input", (ev: InputEvent) => {
                  const input = ev.data;
                  let value = inputEl.value;
                  const regex = /^[0-9]+$/g;
                  if (!regex.test(input)) {
                    value = value.replace(input, "");
                  }

                  inputEl.value = value;
                  const numValue = +value;
                  section.selected += numValue - item.qty;
                  item.qty = numValue;
                });
              }

              itemRowEl.appendChild(nameEl);
              itemRowEl.appendChild(inputEl);
            }

            sectionEl.appendChild(itemRowEl);
          }
        }

        inventoryContainer.appendChild(sectionEl);
      }

      inventoryFormEl.addEventListener("submit", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();

        populateModal(inventory);
      });

      reviewFormEl.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();

        const formData: InventoryFromDataT = [];
        for (const section of inventory.sections) {
          for (const item of section.items) {
            const { model_no, qty } = item;
            formData.push({
              model_no,
              qty,
            });
          }
        }

        const req = await fetch(`${baseUrl}/api/trailer/inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
        const resp: Awaited<InventoryAPIRespT> = await req.json();
        if (resp.status) {
          alert(resp.msg);
          window.location.pathname = "/dashboard";
        } else alert(resp.msg);
      });
    } catch (error) {
      console.error(error);
    }
  } else console.error(new Error("Inventory form element missing!"));
});
