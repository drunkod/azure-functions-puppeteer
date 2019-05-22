const os = require("os");
const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports = async function(context, req) {
  let tempDir = os.tmpdir();
  let tempFile = `${tempDir}/temp.pdf`;

  await (async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://blog.leitwolf.io", { waitUntil: "networkidle2" });
    await page.pdf({ path: tempFile, format: "A4" });

    await browser.close();

    var data = fs.readFileSync(tempFile);

    context.res = {
      isRaw: true,
      body: data
    };
    context.done();
  })();
  //   context.res = {
  //     // status: 200, /* Defaults to 200 */
  //     body: `Page title: ${pageTitle}`
  //   };
};
