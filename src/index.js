document.addEventListener("DOMContentLoaded", function () {
  const citySelect = document.getElementById("cities");
  const clocksContainer = document.querySelector(".clocks-container");

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

  citySelect.addEventListener("change", function () {
    const selectedValue = this.value;

    if (!selectedValue) return;

    clocksContainer.innerHTML = ""; // clear any clocks before showing new

    if (selectedValue === "current-location") {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        () => {
          const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          clocksContainer.appendChild(
            createClockElement("My Location 📍", userTimeZone)
          );
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      const cityName = this.options[this.selectedIndex].text;
      clocksContainer.appendChild(createClockElement(cityName, selectedValue));
    }

    this.value = ""; // reset dropdown to placeholder
  });
});
