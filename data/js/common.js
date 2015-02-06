
function sanitizeText(text) {
  return text.toLowerCase()
    .replace(/[àáâãä]/g, "a")
    .replace(/[èéêẽë]/g, "e")
    .replace(/[ìíîĩï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûũü]/g, "u");
}