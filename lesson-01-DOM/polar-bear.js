document.addEventListener('DOMContentLoaded', () => {
  let keys = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family',
            'Genus', 'Species'];
  let infoboxElements = document.querySelectorAll('.infobox td');
  let infoboxText = Array.from(infoboxElements).map(td => td.textContent.trim());
  let classifications = {};
  keys.forEach(key => {
    let infoIdx = infoboxText.findIndex(str => str.includes(key)) + 1;
    classifications[key] = infoboxText[infoIdx];
  })
  console.log(classifications);
});