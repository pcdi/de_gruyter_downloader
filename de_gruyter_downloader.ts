// ==UserScript==
// @name         De Gruyter Downloader
// @namespace    https://pcdi.github.io
// @version      1.0.0
// @description  Batch download single chapter PDFs for De Gruyter books
// @author       Philipp Immel
// @match        https://www.degruyter.com/*/html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=degruyter.com
// @grant        GM_download
// ==/UserScript==

function downloadPdfs() {
  let pdfLinks = document.getElementsByClassName(
    "downloadPdf"
  ) as HTMLCollectionOf<HTMLAnchorElement>;
  for (const link of pdfLinks) {
    GM_download({
      url: link.href,
      name:
        document.querySelector<HTMLMetaElement>(
          "[name=citation_title][content]"
        )?.content +
        "/" +
        link.dataset.doi?.replaceAll("/", "_") +
        ".pdf",
      saveAs: false,
    });
  }
}

(function () {
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Download PDFs";
  btn.id = "downloadPdfs";
  btn.style.position = "fixed";
  btn.style.top = "0";
  btn.style.left = "0";
  btn.addEventListener("click", downloadPdfs);
  document.body.appendChild(btn);
})();
