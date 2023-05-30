type AnnouncementT = {
  type: "general" | "warning";
  title: string;
  text: string;
};

class Admin {
  announcement: AnnouncementT | null;

  constructor() {
    this.announcement = JSON.parse(
      window.localStorage.getItem("announcement") || "null"
    );
  }

  wait(time: number): Promise<null> {
    return new Promise((res) => {
      setTimeout(() => res(null), time);
    });
  }

  logError(msg: string): void {
    const err = new Error(msg);
    console.error(err);
  }

  removeAnnouncement(): void {
    this.announcement = { type: "general", title: "", text: "" };
    window.localStorage.removeItem("announcement");
  }

  setAnnouncement(announcement: AnnouncementT): void {
    this.announcement = announcement;
    window.localStorage.setItem("announcement", JSON.stringify(announcement));
  }
}

// export default Cart;
