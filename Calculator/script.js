const get_char = document.getElementById("text_num");
const buttons = document.querySelectorAll(".btn button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        const value_e = buttons[i].textContent;
        if (value_e == "C") {
            clear_fun();
        } else if (value_e == "=") {
            calculate_fun();
        } else {
            add_to(value_e);
        }
    });
}

function add_to(value_e) {
    get_char.value += value_e;
}
function clear_fun() {
    get_char.value = "";
}
function calculate_fun() {
    let sol = get_char.value;
    try {
        let result = eval(sol);
        get_char.value = result;
    } catch (error) {
        get_char.value = "Error";
    }
}

