const deleteUser = async (email, itemEl) => {
    try {
        const req = await fetch(`${baseUrl}/api/user/${email}`, {
            method: "DELETE",
            credentials: "include",
        });
        const res = await req.json();
        const { status, msg } = res;
        if (!status)
            throw new Error(msg);
        alert(msg);
        itemEl.remove();
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
};
const editUser = async (email, data, callback) => {
    try {
        const req = await fetch(`${baseUrl}/api/user/${email}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await req.json();
        const { status, msg } = res;
        if (!status)
            throw new Error(msg);
        callback();
        alert(msg);
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
};
const renderUsers = (users) => {
    try {
        const userContainerEl = document.getElementById("user-parent");
        if (userContainerEl) {
            userContainerEl
                .querySelectorAll("div.single-user")
                .forEach((userEl) => (userEl.style.display = "none"));
            for (const user of users) {
                const { name, email, role, self } = user;
                const userEl = document.createElement("div");
                userEl.className = "single-user";
                {
                    const defaultEl = document.createElement("div");
                    defaultEl.id = "default-state";
                    defaultEl.className = "default-user-state";
                    {
                        const nameColEl = document.createElement("div");
                        nameColEl.className = "user-personal-col name";
                        {
                            const textEl = document.createElement("div");
                            textEl.id = "name";
                            textEl.className = "user-nav-text";
                            textEl.textContent = name + (self ? " (you)" : "");
                            nameColEl.appendChild(textEl);
                        }
                        const emailColEl = document.createElement("div");
                        emailColEl.className = "user-personal-col email";
                        {
                            const textEl = document.createElement("div");
                            textEl.id = "email";
                            textEl.className = "user-nav-text normal-400";
                            textEl.textContent = email;
                            emailColEl.appendChild(textEl);
                        }
                        const roleColEl = document.createElement("div");
                        roleColEl.className = "user-personal-col role";
                        {
                            const textWrapperEl = document.createElement("div");
                            textWrapperEl.className = "role-div";
                            {
                                const textEl = document.createElement("div");
                                textEl.id = "role";
                                textEl.className = "user-nav-text normal-400";
                                textEl.textContent = role;
                                const actionsWrapper = document.createElement("div");
                                actionsWrapper.className = "edit-option-div";
                                {
                                    const editBtn = document.createElement("a");
                                    editBtn.className = "edit-user-div w-inline-block";
                                    editBtn.href = "#";
                                    {
                                        const imgEl = document.createElement("img");
                                        imgEl.className = "edit-icon";
                                        imgEl.src =
                                            "https://assets.website-files.com/6436e391fe5f1a46d86470fe/64372284a2c5886a30eeeb6a_Vector.png";
                                        imgEl.loading = "lazy";
                                        imgEl.alt = "";
                                        const textEl = document.createElement("div");
                                        textEl.className = "user-nav-text normal-400 grey";
                                        textEl.textContent = "Edit User";
                                        editBtn.appendChild(imgEl);
                                        editBtn.appendChild(textEl);
                                    }
                                    editBtn.addEventListener("click", (ev) => {
                                        ev.preventDefault();
                                        defaultEl.style.display = "none";
                                        editEl.style.display = "block";
                                    });
                                    const deleteBtn = document.createElement("a");
                                    deleteBtn.className = "remove-user-div w-inline-block";
                                    deleteBtn.href = "#";
                                    {
                                        const imgEl = document.createElement("img");
                                        imgEl.className = "edit-icon";
                                        imgEl.src =
                                            "https://assets.website-files.com/6436e391fe5f1a46d86470fe/643722d6959011151e3f7a5f_Vector.png";
                                        imgEl.loading = "lazy";
                                        imgEl.alt = "";
                                        const textEl = document.createElement("div");
                                        textEl.className = "user-nav-text normal-400 grey";
                                        textEl.textContent = "Remove User";
                                        deleteBtn.appendChild(imgEl);
                                        deleteBtn.appendChild(textEl);
                                    }
                                    deleteBtn.addEventListener("click", (ev) => {
                                        ev.preventDefault();
                                        deleteUser(email, userEl);
                                    });
                                    actionsWrapper.appendChild(editBtn);
                                    actionsWrapper.appendChild(deleteBtn);
                                }
                                textWrapperEl.appendChild(textEl);
                                textWrapperEl.appendChild(actionsWrapper);
                            }
                            roleColEl.appendChild(textWrapperEl);
                        }
                        defaultEl.appendChild(nameColEl);
                        defaultEl.appendChild(emailColEl);
                        defaultEl.appendChild(roleColEl);
                    }
                    const editEl = document.createElement("div");
                    editEl.className = "edit-user-state";
                    editEl.id = "edit-state";
                    editEl.style.display = "none";
                    {
                        const formBlock = document.createElement("div");
                        formBlock.className = "form-block w-form";
                        const roleMap = {
                            Admin: 1,
                            Dealer: 2,
                            "Fontaine Sales Team": 3,
                            "Dealer Sales Team": 4,
                        };
                        const roleList = [
                            "Admin",
                            "Dealer",
                            "Fontaine Sales Team",
                            "Dealer Sales Team",
                        ];
                        {
                            const formEl = document.createElement("form");
                            formEl.className = "form-2";
                            {
                                const nameBlock = document.createElement("div");
                                nameBlock.className = "user-personal-col name";
                                {
                                    const inputEl = document.createElement("input");
                                    inputEl.className = "w-input";
                                    inputEl.id = "name";
                                    inputEl.required = true;
                                    inputEl.value = name;
                                    nameBlock.appendChild(inputEl);
                                }
                                const emailBlock = document.createElement("div");
                                emailBlock.className = "user-personal-col email";
                                {
                                    const textEl = document.createElement("div");
                                    textEl.className = "user-nav-text normal-400";
                                    textEl.textContent = email;
                                    emailBlock.appendChild(textEl);
                                }
                                const roleBlock = document.createElement("div");
                                roleBlock.className = "user-personal-col role";
                                {
                                    const roleDiv = document.createElement("div");
                                    roleDiv.className = "role-div";
                                    {
                                        const selectEl = document.createElement("select");
                                        selectEl.id = "role";
                                        {
                                            selectEl.innerHTML = `><option value="2">Dealer</option><option value="1">Admin</option><option value="3">Fontaine Sales Team</option><option value="4">Dealer Sales Team</option>`;
                                        }
                                        selectEl.value = roleMap[role] + "";
                                        roleDiv.appendChild(selectEl);
                                    }
                                    roleBlock.appendChild(roleDiv);
                                }
                                const cancelBtn = document.createElement("a");
                                cancelBtn.className = "button-2 w-button";
                                cancelBtn.href = "#";
                                cancelBtn.textContent = "Cancel";
                                cancelBtn.addEventListener("click", (ev) => {
                                    ev.preventDefault();
                                    editEl.style.display = "none";
                                    defaultEl.style.display = "flex";
                                    nameBlock.querySelector("input").value = user.name;
                                    roleBlock.querySelector("select").value = roleMap[user.role];
                                });
                                const submitBtn = document.createElement("input");
                                submitBtn.className = "submit-button-2 w-button";
                                submitBtn.type = "submit";
                                submitBtn.value = "Save changes";
                                submitBtn.setAttribute("data-wait", "Please wait...");
                                submitBtn.addEventListener("click", (ev) => {
                                    ev.preventDefault();
                                    const userData = {
                                        name: editEl.querySelector("#name").value,
                                        role: +editEl.querySelector("#role")
                                            .value,
                                    };
                                    const callback = () => {
                                        user.name = userData.name;
                                        user.role = roleList[userData.role - 1];
                                        console.log({ name: user.name, role: user.role });
                                        editEl.style.display = "none";
                                        defaultEl.style.display = "flex";
                                        defaultEl.querySelector("#name").textContent =
                                            user.name + (user.self ? " (you)" : "");
                                        defaultEl.querySelector("#role").textContent = user.role;
                                    };
                                    editUser(email, userData, callback);
                                });
                                formEl.appendChild(nameBlock);
                                formEl.appendChild(emailBlock);
                                formEl.appendChild(roleBlock);
                                formEl.appendChild(cancelBtn);
                                formEl.appendChild(submitBtn);
                            }
                            formBlock.appendChild(formEl);
                        }
                        editEl.appendChild(formBlock);
                    }
                    userEl.appendChild(defaultEl);
                    userEl.appendChild(editEl);
                }
                userContainerEl.appendChild(userEl);
            }
        }
        else
            throw new Error("Users container element missing!");
    }
    catch (error) {
        console.error(error);
    }
};
window.addEventListener("load", async () => {
    try {
        const req = await fetch(`${baseUrl}/api/user`, { credentials: "include" });
        const resp = await req.json();
        if (resp.status) {
            const { data: users } = resp;
            renderUsers(users);
            // handling add user
            const formEl = document.getElementById("email-form");
            if (formEl) {
                formEl.addEventListener("submit", async (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    try {
                        const formData = {
                            email: "",
                            role: 0,
                        };
                        const emailEl = formEl.querySelector(`input[name="email"]`);
                        if (emailEl)
                            formData.email = emailEl.value;
                        const roleEl = formEl.querySelector(`select[name="field"]`);
                        if (roleEl)
                            formData.role = +roleEl.value;
                        const req = await fetch(`${baseUrl}/api/user`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formData),
                            credentials: "include",
                        });
                        const resp = await req.json();
                        if (!resp.status)
                            throw new Error(resp.msg);
                        alert("User added successfully!");
                        const closeBtn = document.querySelector("div.user-management-modal .close-btn");
                        if (closeBtn)
                            closeBtn.click();
                    }
                    catch (error) {
                        console.error(error);
                        alert(error.message);
                    }
                });
            }
            else {
                throw new Error("Add User form not found!");
            }
        }
        else if (parseInt(req.status / 100 + "") === 4) {
            window.location.pathname = "/dashboard";
        }
        else
            throw new Error(resp.msg);
    }
    catch (error) {
        console.error(error);
    }
});
