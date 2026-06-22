// Contact form: client-side mailto composer with a graceful status message.

export function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (!form) return;

  const status = document.getElementById("cf-status");
  const setStatus = (msg: string, ok = false): void => {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle("is-ok", ok);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Please fill in name, email, and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("That email address looks off. Double-check it?");
      return;
    }

    const subject = `Portfolio: ${name}${company ? " (" + company + ")" : ""}`;
    const body =
      `Hi Biprayan,\n\n${message}\n\n` +
      `\u2014 ${name}\n${email}${company ? "\n" + company : ""}\n`;

    const mailto =
      `mailto:biprayanc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("Opening your mail client\u2026", true);
  });
}
