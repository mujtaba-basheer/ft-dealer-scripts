class Admin {
    constructor() {
        this.announcement = JSON.parse(window.localStorage.getItem("announcement") || "null");
    }
    wait(time) {
        return new Promise((res) => {
            setTimeout(() => res(null), time);
        });
    }
    logError(msg) {
        const err = new Error(msg);
        console.error(err);
    }
    removeAnnouncement() {
        this.announcement = { type: "general", title: "", text: "" };
        window.localStorage.removeItem("announcement");
    }
    setAnnouncement(announcement) {
        this.announcement = announcement;
        window.localStorage.setItem("announcement", JSON.stringify(announcement));
    }
}
// export default Cart;
