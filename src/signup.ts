type FormDataT = {
  name: string;
  password: string;
  c_password: string;
};
type ActivateApiReqT = {
  name: string;
  password: string;
};
type ActivateApiRespT = {
  status: boolean;
  data: {
    name: string;
    email: string;
  };
  msg: string;
};

window.addEventListener("load", () => {
  const auth_token = new URLSearchParams(window.location.search).get("code");

  const formEl = document.getElementById("email-form") as HTMLFormElement;
  if (formEl) {
    formEl.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();

      const formData: FormDataT = {
        name: "",
        password: "",
        c_password: "",
      };

      const nameEl =
        formEl.querySelector<HTMLInputElement>(`input[name="Name"]`);
      if (nameEl) formData.name = nameEl.value.trim();

      const passwordEl = formEl.querySelector<HTMLInputElement>(
        `input[name="Password"]`
      );
      if (passwordEl) formData.password = passwordEl.value;

      const cPasswordEl = formEl.querySelector<HTMLInputElement>(
        `input[name="Password-2"]`
      );
      if (cPasswordEl) formData.c_password = cPasswordEl.value;

      try {
        if (formData.password && formData.password === formData.c_password) {
          const { name, password } = formData;
          const req = await fetch(`${baseUrl}/api/auth/activate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              password,
              auth_token,
            }),
            credentials: "include",
          });

          const resp: Awaited<ActivateApiRespT> = await req.json();

          if (resp.status)
            localStorage.setItem("__user_data", JSON.stringify(resp.data));
          else throw new Error(resp.msg);
        } else throw new Error("Passwords don't match!");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    });
  }
});
