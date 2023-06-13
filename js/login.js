window.addEventListener("load", () => {
    const formEl = document.getElementById("email-form");
    if (formEl) {
        formEl.addEventListener("submit", async () => {
            try {
                const formData = {
                    email: "",
                    password: "",
                };
                const emailEl = formEl.querySelector(`input[name="name"]`);
                if (emailEl)
                    formData.email = emailEl.value;
                const passwordEl = formEl.querySelector(`input[name="Password"]`);
                if (passwordEl)
                    formData.password = passwordEl.value;
                const req = await fetch(`${baseUrl}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                    credentials: "include",
                });
                const resp = await req.json();
                if (resp.status) {
                    localStorage.setItem("__user_data", JSON.stringify(resp.data));
                    setTimeout(() => {
                        window.location.pathname = "/";
                    }, 1000);
                }
                else
                    throw new Error(resp.msg);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
});
