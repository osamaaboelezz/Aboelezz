// pastel-color.js
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);   // pick any hue
  const pastel = `hsl(${hue}, 70%, 85%)`;        // fixed saturation & lightness for pastel look
  return pastel;
}

// Output directly if file is loaded as a script
if (typeof window !== "undefined") {
  console.log(getRandomPastelColor());
}
