const USER_THEME = "user_dark";

let ACTIVE_DARK = false;
let COOKIE_SET = checkCookie(USER_THEME);
let toggle_switch;

function switchTheme(forceDark = false) {
    let doc = document.documentElement;
    toggle_switch = document.getElementById("theme-toggle-switch");
    console.log("theme switch to dark: " + !ACTIVE_DARK || forceDark);

    if (forceDark) {
        if (ACTIVE_DARK) return;

        doc.setAttribute("data-bs-theme", "dark");
        toggle_switch.checked = ACTIVE_DARK = true;
        return;
    }

    toggle_switch.checked = ACTIVE_DARK = !ACTIVE_DARK;
    doc.setAttribute("data-bs-theme", ACTIVE_DARK ? "dark" : "light");
    setCookie(USER_THEME, ACTIVE_DARK);
}

// Check for OS preferred theme
console.log(COOKIE_SET);
console.log(getCookie(USER_THEME));
if (COOKIE_SET) {
    const t = getCookie(USER_THEME);
    if (t) {
        switchTheme(t);
    }
} else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
) {
    switchTheme(true);
}
