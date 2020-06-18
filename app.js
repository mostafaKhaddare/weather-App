window.addEventListener("load", () => {
  let long;
  let lat; // العرض
  const TIME_ZONE = document.querySelector(".time-zone");
  const TEMPERATURE_DEGRE = document.querySelector(".temperature-degre");
  const TEMPERATURE_DESCRIPTION = document.querySelector(
    ".temperature-description"
  );
  const IMG = document.querySelector("img");
  const BUTTON = document.querySelector(".change");
  const SPAN = document.querySelector("span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.weatherapi.com/v1/current.json?key=b45dc21fcdd6404abd2102905201806&q=${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_c, temp_f } = data.current;
          const { text, icon } = data.current.condition;
          const timeZone = data.location.tz_id;
          console.log(icon);
          //set to dom
          TIME_ZONE.textContent = timeZone;

          TEMPERATURE_DESCRIPTION.textContent = text;
          IMG.src = icon;
          //switch between celsius and fahrenheit
          BUTTON.addEventListener("click", () => {
            if (SPAN.textContent === "°C") {
              SPAN.textContent = "°F";
              TEMPERATURE_DEGRE.textContent = temp_f;
            } else {
              SPAN.textContent = "°C";
              TEMPERATURE_DEGRE.textContent = temp_c;
            }
          });
        });
    });
  }
});
