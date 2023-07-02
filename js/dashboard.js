window.addEventListener("load", async () => {
    try {
        // fetching submissions
        const req = await fetch(`${baseUrl}/api/inventory/submissions`, {
            credentials: "include",
        });
        const resp = await req.json();
        if (!resp.status)
            throw new Error(resp.msg);
        const { data: { trailers, records, categories }, } = resp;
        const dashboardContainer = document.querySelector(".dashboard-panel");
        const existingEls = dashboardContainer.querySelectorAll(".category-row, .category-column");
        existingEls.forEach((el) => el.remove());
        const panelHeading = document.querySelector(".panel-title-flex h1");
        panelHeading.textContent = `Dealer Inventory – Past ${records.length} Months`;
        {
            const theadEl = document.createElement("div");
            theadEl.className = "category-row";
            {
                const catEl = document.createElement("div");
                catEl.className = "main-col model";
                {
                    const textEl = document.createElement("div");
                    textEl.className = "main-col-text";
                    textEl.textContent = "Fontaine Model";
                    catEl.appendChild(textEl);
                }
                const nameEl = document.createElement("div");
                nameEl.className = "main-col suspension-configuration";
                {
                    const textEl = document.createElement("div");
                    textEl.className = "main-col-text";
                    textEl.textContent = "Model Name";
                    nameEl.appendChild(textEl);
                }
                theadEl.appendChild(catEl);
                theadEl.appendChild(nameEl);
                for (const record of records) {
                    const dateEl = document.createElement("div");
                    dateEl.className = "main-col month";
                    {
                        const textEl = document.createElement("div");
                        textEl.className = "main-col-text";
                        textEl.textContent = record.date;
                        dateEl.appendChild(textEl);
                    }
                    theadEl.appendChild(dateEl);
                }
            }
            dashboardContainer.appendChild(theadEl);
            let i = 0; // trailer index
            const colors = ["#fdeaea", "#e3ffd2", "#dbe5ff", "#fbe1ff", "#fff3db"];
            let ci = 0; // color index
            for (const catgory of categories) {
                const catWrapper = document.createElement("div");
                catWrapper.className = "category-column";
                catWrapper.style.backgroundColor = colors[ci++];
                if (ci === colors.length)
                    ci = 0;
                {
                    const catEl = document.createElement("div");
                    catEl.className = "category-sub-column max-146";
                    {
                        const textEl = document.createElement("div");
                        textEl.className = "main-col-text black";
                        textEl.textContent = catgory;
                        catEl.appendChild(textEl);
                    }
                    const dataEl = document.createElement("div");
                    dataEl.className = "column-horizontal-set";
                    {
                        for (let j = i; j < trailers.length; j++) {
                            const trailer = trailers[i];
                            if (trailer.category === catgory) {
                                const rowEl = document.createElement("div");
                                rowEl.className = "column-flex-set";
                                {
                                    const nameEl = document.createElement("div");
                                    nameEl.className = "configuration-col rev";
                                    {
                                        const textEl = document.createElement("div");
                                        textEl.className = "configuration-text";
                                        textEl.textContent = trailer.name;
                                        nameEl.appendChild(textEl);
                                    }
                                    rowEl.appendChild(nameEl);
                                    for (const record of records) {
                                        const qtyEl = document.createElement("div");
                                        qtyEl.className = "month-col";
                                        {
                                            const textEl = document.createElement("div");
                                            textEl.className = "configuration-text";
                                            textEl.textContent = record.data[i] + "";
                                            qtyEl.appendChild(textEl);
                                        }
                                        rowEl.appendChild(qtyEl);
                                    }
                                }
                                dataEl.appendChild(rowEl);
                                i++;
                            }
                            else
                                break;
                        }
                    }
                    catWrapper.appendChild(catEl);
                    catWrapper.appendChild(dataEl);
                }
                dashboardContainer.appendChild(catWrapper);
            }
        }
        // handling csv request
        {
            const exportBtn = document.querySelector(".export-btn");
            if (exportBtn) {
                const href = exportBtn.getAttribute("href");
                if (href === "#") {
                    const fileReq = await fetch(`${baseUrl}/api/inventory/submissions-csv`, { credentials: "include" });
                    const file = await fileReq.blob();
                    const fileUrl = URL.createObjectURL(file);
                    exportBtn.href = fileUrl;
                    const date = new Date();
                    exportBtn.download = `${date.valueOf()}.csv`;
                }
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
