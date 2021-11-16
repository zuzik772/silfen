const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://zuzanacreates.com/wp21d/wp-json/wp/v2/bag/" + id;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  // .then((data) => data.forEach(showOneItem));
  .then(showOneItem);

function showOneItem(item) {
  console.log(item);
  console.log("it works");

  //
  //
  // console.log(item._links["wp:attachment"][0].href);

  //   myClone.querySelector(".title").textContent = item.bag_name;
  // myClone.querySelector(".price").textContent = item.price;
  const urlGallery =
    "https://zuzanacreates.com/wp21d/wp-json/wp/v2/media?parent=" + id;
  fetch(urlGallery)
    .then(function (response) {
      return response.json();
    })
    .then((data) => data.forEach(showProduct));

  function showProduct(imageData) {
    console.log("hi");
    console.log(imageData);
    const myTemplate = document.querySelector(".imageTemplate").content;
    const myClone = myTemplate.cloneNode(true);
    myClone.querySelector("img").src = imageData.source_url;

    document.querySelector(".product_page article").appendChild(myClone);
  }

  const template = document.querySelector(".productInfoTemplate").content;
  const clone = template.cloneNode(true);
  clone.querySelector(".nameBag").textContent = item.bag_name;
  console.log(item.bag_name);
  clone.querySelector(".price").textContent = `${item.price} DKK`;
  clone.querySelector(".description").textContent = item.description;
  clone.querySelector(".material").textContent = item.material;
  clone.querySelector(".dimensions").textContent = item.dimensions;

  document.querySelector(".product_page article").appendChild(clone);
}
// showDetails();
// function showDetails() {
//   const template = document.querySelector("template").content;
//   const clone = template.cloneNode(true);
//   clone.querySelector(".price").textContent = item.price;

//   document.querySelector(".products").appendChild(clone);
// }
