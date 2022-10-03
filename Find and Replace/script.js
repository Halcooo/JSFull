var sviParagrafi = document.getElementsByTagName("p");

function promjena() {
  var rijec = document.getElementById("prvi").value;
  priprema(rijec);
}
function zamjena(rijec) {
  return `<span style='background:yellow'>${rijec}</span>`;
}
function priprema(rijec) {
  for (var i = 0; i < sviParagrafi.length; i++) {
    var jedanParagraf = sviParagrafi[i].innerHTML;

    sviParagrafi[i].innerHTML = jedanParagraf.replace(rijec, zamjena(rijec));
  }
}

function zaReplace() {
  var rijec = document.getElementById("prvi").value;
  var rijecZamjena = document.getElementById("zaZamjenu").value;
  for (var i = 0; i < sviParagrafi.length; i++) {
    var jedanParagraf = sviParagrafi[i].innerHTML;

    sviParagrafi[i].innerHTML = jedanParagraf.replace(rijec, rijecZamjena);
  }
}
