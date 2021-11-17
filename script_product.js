const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://zuzanacreates.com/wp21d/wp-json/wp/v2/bag?_embed";

let allData = [];
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then((data) => {
    allData = data;
    findPresentedBag(allData);
    displaySimilarBags(allData);
  });
// .then(showOneItem);

function findPresentedBag(allBags) {
  console.log(allBags);
  const presentedBag = allBags.filter((oneBag) => {
    if (oneBag.id === Number(id)) {
      return true;
    } else {
      return false;
    }
  });
  console.log(presentedBag);
  showOneItem(presentedBag);
}

function showOneItem(item) {
  // item that is given to the function is an array containing one object, that's why
  // below I'm reffering to the frist object of array 'item'
  item = item[0];
  console.log(item);
  console.log("it works");

  // get image gallery of one bag on the product page
  // grab the parent element in this case one of pods called bag in WP
  // to upload several images we used a post that has gallery of images in WP and found the route in json
  const urlGallery = "https://zuzanacreates.com/wp21d/wp-json/wp/v2/media?parent=" + id;
  fetch(urlGallery)
    .then(function (response) {
      return response.json();
    })
    .then((data) => data.forEach(showProduct));
  //  for each loop to get every image from the gallery for 1 bag
  function showProduct(imageData) {
    // console.log("hi");
    // console.log(imageData);
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

function displaySimilarBags(allBags) {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let item;
  for (let i = 0; i < 3; i++) {
    const mathInt = array.length;
    const randomNr = Math.floor(Math.random() * mathInt);
    const pos = array[randomNr];
    array.splice(randomNr, 1);
    item = allBags[pos];
    const myTemplate = document.querySelector(".similarBagsTemplate").content;
    const myClone = myTemplate.cloneNode(true);
    myClone.querySelector(".title").textContent = item.bag_name;
    myClone.querySelector(".price").textContent = `${item.price} DKK`;
    myClone.querySelector("a").setAttribute("href", "product.html?id=" + item.id);
    myClone.querySelector("img").src =
      item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    document.querySelector("aside").appendChild(myClone);
  }
}
