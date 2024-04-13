document.getElementById('cameraBtn').addEventListener('click', function() {
    // Open Google Lens
    window.open('https://lens.google/', '_blank');
});



// Function to initialize the map
function initMap() {
    // Default location (New York City)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };
  
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: defaultLocation,
    });
  
    // Add a marker for the default location
    new google.maps.Marker({
      position: defaultLocation,
      map: map,
    });
  
    // Event listener for the Locate Me button
    document.getElementById("locate-btn").addEventListener("click", () => {
      // Check if geolocation is supported by the browser
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // Center the map on the user's location
            map.setCenter(userLocation);
            // Add a marker for the user's location
            new google.maps.Marker({
              position: userLocation,
              map: map,
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom marker icon
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  
    // Event listener for image upload
    document.getElementById("image-upload").addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          document.getElementById("image-result").innerHTML = `<h3>Uploaded Image</h3><img src="${img.src}" width="200"/>`;
          // Call your image recognition function here
          // For example:
          // recognizeImage(img);
        };
      };
      reader.readAsDataURL(file);
    });
  }
  
  // Load the Google Maps JavaScript API asynchronously
  (g => {
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}),
      r = new Set,
      e = new URLSearchParams,
      u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => h = n(Error(p + " could not load."));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
  })({
    key: "AIzaSyBROOcv98Z9hwiU0E5rR9IuNrZmkO3g1nc", // Replace "YOUR_API_KEY" with your actual API key
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
  