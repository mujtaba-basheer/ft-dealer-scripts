const baseUrl = new URLSearchParams(window.location.search).get("testing") === "true"
    ? "http://localhost:5000"
    : "https://api.ftdealer.com";
window.addEventListener("load", () => {
    const logoutBtn = document.querySelector(".log-out-link");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (ev) => {
            ev.preventDefault();
            try {
                const req = await fetch(`${baseUrl}/api/auth/logout`, {
                    credentials: "include",
                });
                const resp = await req.json();
                if (resp.status)
                    window.location.pathname = "/";
                else
                    throw new Error(resp.msg);
            }
            catch (error) {
                console.error(error);
                alert(error.message);
            }
        });
    }
});
