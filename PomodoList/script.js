document.addEventListener("DOMContentLoaded", () => {
    let Tasks_list = [];
    const task_text = document.getElementById("taskinput");
    const task_board = document.getElementById("taskList");
    const add_btn = document.getElementById("add_task_btn");

    add_btn.addEventListener("click", ()=>{
        const task = task_text.value.trim();
        if (task !== "") {
            createTask(task);
            Tasks_list.push(task);
            saveTasks();
            task_text.value = "";
        }

    });



    function createTask(task){
        const list_el = document.createElement("li");
        list_el.classList.add("task");

        const task_name = document.createElement("span");
        task_name.textContent = task;

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-xmark");

        icon.addEventListener("click", () => {
            list_el.remove();
            Tasks_list = Tasks_list.filter(ta => ta !== task);
            saveTasks();
        });

        list_el.appendChild(icon);
        list_el.appendChild(task_name);
        task_board.appendChild(list_el);
    }

    function saveTasks() {
        localStorage.setItem("Tasks", JSON.stringify(Tasks_list));
        console.log()
    }

    function loadTasks() {
        const getstored = JSON.parse(localStorage.getItem("Tasks"));
        if (getstored) {
            Tasks_list = getstored;
            getstored.forEach(task => {
                createTask(task);
            });
        }
    };

    loadTasks();

    const increase_btn = document.getElementById("increase_btn");
    const decrease_btn = document.getElementById("decrease_btn");
    const timer_value = document.getElementById("progress_display");

    const startButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");

    let timer;
    let time_left = parseInt(timer_value.innerText) * 60;
    let is_running = false;
    let is_paused = false;

    increase_btn.addEventListener("click", () => {
        let timer_val = parseInt(timer_value.innerText);
        if (timer_val < 120) {
            timer_val += 5;
            time_left = timer_val * 60;
            timer_value.innerHTML = timer_val + ":00";
        }
    });

    decrease_btn.addEventListener("click", () => {
        let timer_val = parseInt(timer_value.innerText);
        if (timer_val > 5) {
            timer_val -= 5;
            time_left = timer_val * 60;
            timer_value.innerHTML = timer_val + ":00";
        }
    });


    startButton.addEventListener("click", startTimer);

    function startTimer() {
        if (!is_running) {
            is_running = true;
            is_paused = false;
            startButton.innerHTML = "Pause";

            timer = setInterval(() => {
                if (time_left <= 0) {
                    clearInterval(timer);
                    alert("Time's Up");
                    startButton.innerText = "Start";
                    is_running = false;
                    is_paused = false;
                } else {
                    time_left--;
                    updatedisplay();
                }
            }, 1000);
        } else if (!is_paused){
            is_paused = true;
            clearInterval(timer);
            startButton.innerText = "Resume";
        } else {
            is_paused = false;
            startButton.innerText = "Pause";
            timer = setInterval(() => {
                if (time_left <= 0) {
                    clearInterval(timer);
                    alert("Time's Up");
                    startButton.innerText = "Start";
                    is_running = false;
                    is_paused = false;
                } else {
                    time_left--;
                    updatedisplay();
                }
            }, 1000);   
        }
    };

    function updatedisplay() {
        let minutes = Math.floor(time_left / 60).toString().padStart(2, "0");
        let seconds = (time_left % 60).toString().padStart(2,"0");
        timer_value.innerText= `${minutes}:${seconds}`;
    }


    resetButton.addEventListener("click", () => {
        clearInterval(timer);
        is_running = false;
        is_paused = false;
        time_left = 25 * 60;
        timer_value.innerHTML = "25:00";
        startButton.innerHTML = "Start";
    });


});

