window.addEventListener("load", () => {
    const admin = new Admin();
    const announcement = admin.announcement || {
        type: "general",
        title: "",
        text: "",
    };
    const modalEl = document.querySelector("div.scrim-block.announcement");
    const announcementLive = document.querySelector("div.announce-main-wrapper.success-state");
    const formEl = document.getElementById("email-form");
    if (formEl) {
        formEl.reset();
        const typeEl = formEl.querySelector(`select[name="Announcement"]`);
        const titleEl = formEl.querySelector(`input[name="Title"]`);
        const bodyEl = formEl.querySelector(`textarea[name="Body"]`);
        const previewEl = formEl.querySelector("div.announcement-banner");
        if (typeEl && titleEl && bodyEl && previewEl) {
            typeEl.addEventListener("change", () => {
                const type = typeEl.value;
                switch (type) {
                    case "General Announcement": {
                        previewEl.classList.remove("warning");
                        previewEl.classList.add("general");
                        previewEl.querySelector("img.general-icon").style.display = "";
                        previewEl.querySelector("img.warning-icon").style.display = "none";
                        announcement.type = "general";
                        break;
                    }
                    case "Warning": {
                        previewEl.classList.remove("general");
                        previewEl.classList.add("warning");
                        previewEl.querySelector("img.general-icon").style.display = "none";
                        previewEl.querySelector("img.warning-icon").style.display = "inherit";
                        announcement.type = "warning";
                        break;
                    }
                    default: {
                        previewEl.classList.remove("warning");
                        previewEl.classList.add("general");
                        previewEl.querySelector("img.general-icon").style.display = "";
                        previewEl.querySelector("img.warning-icon").style.display = "none";
                        announcement.type = "general";
                        break;
                    }
                }
            });
            titleEl.addEventListener("input", () => {
                const title = titleEl.value;
                const textEl = previewEl.querySelector("div.general-announcement-text");
                if (textEl) {
                    textEl.textContent = title;
                    announcement.title = title;
                }
            });
            bodyEl.addEventListener("input", () => {
                const body = bodyEl.value;
                const textEl = previewEl.querySelector("div.general-announcement-text.regular");
                if (textEl) {
                    textEl.textContent = body;
                    announcement.text = body;
                }
            });
            formEl.addEventListener("submit", (ev) => {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                if (announcement.title && announcement.text) {
                    modalEl.style.display = "flex";
                    $(modalEl).animate({
                        opacity: 1,
                    }, 200);
                }
            });
            formEl.addEventListener("reset", () => { });
        }
        else
            admin.logError("Edit elements absent!");
    }
    if (modalEl) {
        const submitBtn = modalEl.querySelector("a.button.secondary.w-button");
        submitBtn.addEventListener("click", (ev) => {
            ev.preventDefault();
            $(modalEl).animate({
                opacity: 0,
            }, 500, () => {
                modalEl.style.display = "none";
                announcementLive.style.display = "block";
                const bannerEl = announcementLive.querySelector("div.announcement-banner");
                bannerEl.classList.add(announcement.type);
                const textEl = bannerEl.querySelector("div.general-announcement-text");
                if (textEl)
                    textEl.textContent = announcement.title;
                const bodyEl = bannerEl.querySelector("div.general-announcement-text.regular");
                if (bodyEl)
                    bodyEl.textContent = announcement.text;
                switch (announcement.type) {
                    case "general": {
                        bannerEl.querySelector("img.general-icon").style.display = "";
                        bannerEl.querySelector("img.warning-icon").style.display = "none";
                        break;
                    }
                    case "warning": {
                        bannerEl.querySelector("img.general-icon").style.display = "none";
                        bannerEl.querySelector("img.warning-icon").style.display = "inline-block";
                        break;
                    }
                    default: {
                        bannerEl.querySelector("img.general-icon").style.display = "";
                        bannerEl.querySelector("img.warning-icon").style.display = "none";
                        break;
                    }
                }
            });
        });
    }
    if (announcementLive) {
        const removeBtn = announcementLive.querySelector("a.button.secondary");
        removeBtn.addEventListener("click", (ev) => {
            ev.preventDefault();
            announcementLive.style.display = "none";
            formEl.reset();
            admin.removeAnnouncement();
        });
    }
});
