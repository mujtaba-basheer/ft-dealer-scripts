type LoginFormDataT = {
  email: string;
  password: string;
};
type LoginAPIRespT = {
  status: boolean;
  data: any;
  msg: string;
};

window.addEventListener("load", () => {
  const formEl = document.getElementById("email-form") as HTMLFormElement;
  if (formEl) {
    formEl.addEventListener("submit", async () => {
      try {
        const formData: LoginFormDataT = {
          email: "",
          password: "",
        };

        const emailEl =
          formEl.querySelector<HTMLInputElement>(`input[name="name"]`);
        if (emailEl) formData.email = emailEl.value;

        const passwordEl = formEl.querySelector<HTMLInputElement>(
          `input[name="Password"]`
        );
        if (passwordEl) formData.password = passwordEl.value;

        const req = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
        const resp: Awaited<LoginAPIRespT> = await req.json();

        if (resp.status) {
          localStorage.setItem("__user_data", JSON.stringify(resp.data));
          setTimeout(() => {
            window.location.pathname = "/";
          }, 1000);
        } else throw new Error(resp.msg);
      } catch (error) {
        console.error(error);
      }
    });
  }
});
