const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://zuzanacreates.com/wp21d/wp-json/wp/v2/bag/" + id;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(showOneItem);

function showOneItem(item) {
  console.log(item);
  console.log("it works");

// get image gallery of one bag on the product page 
// grab the parent element in this case one of pods called bag in WP 
// to upload several images we used a post that has gallery of images in WP and found the route in json 
  const urlGallery =
    "https://zuzanacreates.com/wp21d/wp-json/wp/v2/media?parent=" + id;
  fetch(urlGallery)
    .then(function (response) {
      return response.json();
    })
    .then((data) => data.forEach(showProduct));
//  for each loop to get every image from the gallery for 1 bag
  function showProduct(imageData) {
    console.log("hi");
    console.log(imageData);
    const myTemplate = document.querySelector(".imageTemplate").content;
    const myClone = myTemplate.cloneNode(true);
    myClone.querySelector("img").src = imageData.source_url;
    document.querySelector(".left").appendChild(myClone);
  }
// new template for right side information display
// url + id to identify specific bag
  const template = document.querySelector(".productInfoTemplate").content;
  const clone = template.cloneNode(true);
  clone.querySelector(".nameBag").textContent = item.bag_name;
  console.log(item.bag_name);
  clone.querySelector(".price").textContent = `${item.price} DKK`;
  clone.querySelector(".description").textContent = item.description;
  clone.querySelector(".material").textContent = item.material;
  clone.querySelector(".dimensions").textContent = item.dimensions;
  document.querySelector(".right").appendChild(clone);
}
