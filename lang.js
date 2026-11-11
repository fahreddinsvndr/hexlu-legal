// Remembers the chosen language and, on the English root pages only, jumps to the
// visitor's language on first visit. Local only: no tracking, no third-party code.
(function () {
  var KEY = "hexlu-legal-lang";
  var CODES = ["en","tr","de","fr","es","pt","it","nl","pl","ru","uk","ar","hi","th","vi","id","ja","ko","zh-Hans","zh-Hant"];
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function detect() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    l = l.toLowerCase();
    if (l.indexOf("zh") === 0) return /hant|-tw|-hk|-mo/.test(l) ? "zh-Hant" : "zh-Hans";
    var b = l.split("-")[0];
    if (b === "in") b = "id";
    for (var i = 0; i < CODES.length; i++) if (CODES[i].toLowerCase() === b) return CODES[i];
    return "en";
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-lang]");
    if (a) set(a.getAttribute("data-lang"));
  });
  if (document.body && document.body.getAttribute("data-root")) {
    var want = get() || detect();
    if (want !== "en" && CODES.indexOf(want) > -1) {
      location.replace("lang/" + want + "/" + document.body.getAttribute("data-kind") + ".html");
    }
  }
})();
