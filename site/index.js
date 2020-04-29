const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

// (async () => {
//   const files = await imagemin(["resources/_gen/images/uploads/*.{jpg,png}"], {
//     destination: "content/uploads/",
//     plugins: [imageminWebp({quality: 85})],
//   });
// })();


(async () => {
  const uploads = await imagemin(["../dist/uploads/*.{jpg,png}"], {
    destination: "../dist/uploads/",
    plugins: [imageminWebp({quality: 80})],
  });
})();

(async () => {
  const ampUploads = await imagemin(["../dist/amp/uploads/*.{jpg,png}"], {
    destination: "../dist/amp/uploads/",
    plugins: [imageminWebp({quality: 80})],
  });
})();

(async () => {
  const ampUploads = await imagemin(["../dist/uploads/amp/*.{jpg,png}"], {
    destination: "../dist/uploads/amp/",
    plugins: [imageminWebp({quality: 80})],
  });
})();
