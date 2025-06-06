document.addEventListener("DOMContentLoaded", function () {
  const citySelect = document.getElementById("cities");
  const clocksContainer = document.querySelector(".clocks-container");

  const defaultCities = [
    { name: "London, UK 🇬🇧", tz: "Europe/London" },
    { name: "New York, US 🇺🇸", tz: "America/New_York" },
    { name: "Tokyo, Japan 🇯🇵", tz: "Asia/Tokyo" },
  ];

  function createClockElement(cityName, timezone) {
    const clockDiv = document.createElement("div");
    clockDiv.className = "city-clock";
    clockDiv.innerHTML = `
      <div class="city-header">
        <h2>${cityName}</h2>
        <button class="remove-btn">×</button>
      </div>
      <div class="time"></div>
      <div class="date"></div>
    `;

    function updateTime() {
      const now = moment().tz(timezone);
      clockDiv.querySelector(".time").textContent = now.format("h:mm:ss A");
      clockDiv.querySelector(".date").textContent =
        now.format("dddd, MMMM D, YYYY");
    }

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    clockDiv.dataset.intervalId = intervalId;

    clockDiv
      .querySelector(".remove-btn")
      .addEventListener("click", function () {
        clearInterval(intervalId);
        clockDiv.remove();
      });

    return clockDiv;
  }

  defaultCities.forEach((city) => {
    clocksContainer.appendChild(createClockElement(city.name, city.tz));
  });

  citySelect.addEventListener("change", function () {
    if (!this.value) return;

    const cityName = this.options[this.selectedIndex].text;
    const timezone = this.value;

    const existingCities = [...document.querySelectorAll(".city-clock h2")];
    if (existingCities.some((el) => el.textContent === cityName)) {
      alert(`${cityName} is already displayed!`);
      this.value = "";
      return;
    }

    clocksContainer.appendChild(createClockElement(cityName, timezone));
    this.value = "";
  });
});
