document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    const body_main = document.createElement("div");
    body_main.classList.add("body_main");

    var lat_value;
    var long_value;

    const weather_schemes = [
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
        "Mist",
        "Smoke",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Ash",
        "Squall",
        "Tornado",
        "Clear",
        "Clouds"
    ];

    const color_schemes = {
        Thunderstorm: "linear-gradient(to top,rgb(0, 84, 118),rgb(8, 9, 56))",
        Drizzle: "linear-gradient(to top,rgb(103, 118, 119),rgb(37, 94, 94))",
        Rain: "linear-gradient(to top,rgb(147, 156, 175),rgb(173, 182, 153))",
        Snow: "linear-gradient(to top, #e6dada,rgb(64, 105, 115))",
        Mist: "linear-gradient(to top,rgb(188, 199, 200),rgb(83, 108, 91))",
        Smoke: "linear-gradient(to top,rgb(127, 79, 79),rgb(73, 73, 73))",
        Haze: "linear-gradient(to top, #d7d2cc, #304352)",
        Dust: "linear-gradient(to top,rgb(255, 217, 210),rgb(107, 89, 85))",
        Fog: "linear-gradient(to top, #bdc3c7, #2c3e50)",
        Sand: "linear-gradient(to top,rgb(255, 217, 210),rgb(107, 89, 85))",
        Ash: "linear-gradient(to top,rgb(154, 117, 117),rgb(142, 57, 57))",
        Squall: "linear-gradient(to top,rgb(79, 131, 156),rgb(35, 55, 68))",
        Tornado: "linear-gradient(to top,rgb(175, 175, 175), #414345)",
        Clear: "linear-gradient(to top,rgb(167, 191, 148),rgb(0, 106, 142))",
        Clouds: "linear-gradient(to top, #d7d2cc, #304352)"
    };

    const image_schemes = {
        Thunderstorm: "Images/7.png",
        Drizzle: "Images/8.png",
        Rain: "Images/9.png",
        Snow: "Images/10.png",
        Mist: "Images/11.png",
        Smoke: "Images/12.png",
        Haze: "Images/13.png",
        Dust: "Images/14.png",
        Fog: "Images/15.png",
        Sand: "Images/16.png",
        Ash: "Images/17.png",
        Squall: "Images/18.png",
        Tornado: "Images/19.png",
        Clear: "Images/20.png",
        Clouds: "Images/21.png"
    };


    const icon_classes = {
        Thunderstorm: "fa-cloud-bolt",
        Drizzle: "fa-cloud-rain",
        Rain: "fa-cloud-showers-heavy",
        Snow: "fa-snowflake",
        Mist: "fa-smog",
        Smoke: "fa-smog",
        Haze: "fa-water",
        Dust: "fa-wind",
        Fog: "fa-smog",
        Sand: "fa-wind",
        Ash: "fa-cloud",
        Squall: "fa-wind",
        Tornado: "fa-tornado",
        Clear: "fa-sun",
        Clouds: "fa-cloud"
    };

    const content_body = document.createElement("div");
    content_body.classList.add("content_body");

    const nav_bar = document.createElement("div");
    nav_bar.classList.add("nav_bar");

    const bar_icon = document.createElement("i");
    bar_icon.classList.add("fa-solid", "fa-bars", "icons");

    const text_container = document.createElement("div");
    text_container.classList.add("text_container");

    const city_name = document.createElement("h3");
    city_name.innerText = "City";

    const date_time = document.createElement("p");


    function update_time() {
        const date_ = new Date;
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day_ = date_.getDay();
        let time_hour = date_.getHours();
        let time_minute = date_.getMinutes();
        let period = "AM";

        if (time_hour >= 12) {
            period = "PM";
            if (time_hour > 12) time_hour -= 12;
        } else if (time_hour === 0) {
            time_hour = 12;
        }

        time_minute = time_minute.toString().padStart(2, "0");
        date_time.innerHTML = `${dayNames[day_]}, ${time_hour}:${time_minute} ${period}`;

    }
    setInterval(update_time, 1000);
    update_time();
    text_container.append(city_name, date_time);


    const add_icon = document.createElement("i");
    add_icon.classList.add("fa-solid", "fa-plus","icons");
    add_icon.id = "add_icon";
    add_icon.addEventListener("click", function () {


    });


    nav_bar.append(bar_icon, text_container, add_icon);
    content_body.appendChild(nav_bar);

    const main_content = document.createElement("div");
    main_content.classList.add("main_content");

    const left_content = document.createElement("div");
    left_content.classList.add("left_content");

    const icon_value = document.createElement("i");
    icon_value.id = "weather_icon";
    icon_value.classList.add("fa-solid");

    const temp_feel_value = document.createElement("p");
    temp_feel_value.innerText = "Hot";

    const temp_cont = document.createElement("div");
    temp_cont.classList.add("temp_container");
    temp_cont.append(icon_value, temp_feel_value);

    const temp_value = document.createElement("p");
    temp_value.innerText = " 30°";

    left_content.append(temp_cont, temp_value);


    const right_content = document.createElement("div");
    right_content.classList.add("right_content");

    const temp_low = document.createElement("p");
    temp_low.innerText = "11°C";

    const temp_break_line = document.createElement("p");
    temp_break_line.classList.add("break_line");

    const temp_high = document.createElement("p");
    temp_high.innerText = "34°C";


    right_content.append(temp_high, temp_break_line, temp_low);

    main_content.append(left_content, right_content);
    content_body.appendChild(main_content);

    const detail_content = document.createElement("div");
    detail_content.classList.add("detail_content");


    content_body.appendChild(detail_content);

    body_main.appendChild(content_body);
    body.appendChild(body_main);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show_location);
        } else {
            alert("Not allowed error");
        }

    };

    function show_location(position) {
        long_value = position.coords.longitude;
        lat_value = position.coords.latitude;
        fetchweather(long_value, lat_value);
    }

    function extract_data(data) {
        const data_temp = data.main.temp;
        const data_temp_low = data.main.temp_min;
        const data_temp_high = data.main.temp_max;
        const city_name_api = data.name;
        const weather = data.weather[0].main;

        city_name.innerText = city_name_api;
        temp_high.innerText = parseInt(data_temp_high) + "°C";
        temp_low.innerText = parseInt(data_temp_low) + "°C";
        temp_value.innerText = parseInt(data_temp);
        temp_feel_value.innerText = weather;

        icon_value.className = "fa-solid";
        const iconClass = icon_classes[weather] || "fa-question";
        icon_value.classList.add(iconClass);

        content_body.style.background = color_schemes[weather] || "linear-gradient(to top, #ccc, #999)";

        const image_path = image_schemes[weather];
        if (image_path) {
            body_main.style.backgroundImage = `url('${image_path}')`;
            body_main.style.backgroundSize = "cover";
            body_main.style.backgroundPosition = "center";
        }

    }


    function fetchweather(longitude, latitude) {
        fetch(`http://localhost:5501/api/weather?lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                extract_data(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

    }

    getLocation();
});