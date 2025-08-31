// Generates a random pastel color on every page load
(function() {
  function getRandomPastel() {
    // Pastel colors = high lightness, medium saturation
    const hue = Math.floor(Math.random() * 360);   // any hue
    const saturation = 60 + Math.random() * 20;    // 60–80%
    const lightness = 70 + Math.random() * 10;     // 70–80%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const color = getRandomPastel();

  // Apply background (or export variable)
  document.body.style.backgroundColor = color;

  // Also expose it in case you want to fetch it elsewhere
  window.randomPastel = color;
})();
