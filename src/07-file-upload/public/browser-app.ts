const url = "/api/v1/products";
const fileFormDOM = document.querySelector(".file-form") as HTMLFormElement;

const nameInputDOM = document.querySelector("#name") as HTMLInputElement;
const priceInputDOM = document.querySelector("#price") as HTMLInputElement;
const imageInputDOM = document.querySelector("#image") as HTMLInputElement;

const containerDOM = document.querySelector(".container") as HTMLDivElement;

let imageValue: any;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })

interface CustomFileTarget extends EventTarget {
  files: FileList;
}

imageInputDOM.addEventListener("change", async (e) => {
  const imageFile = (e.target! as CustomFileTarget).files[0];
  const formData = new FormData();

  formData.append("image", imageFile);
  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imageValue = src;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
});

fileFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;
  try {
    const product = { name: nameValue, price: priceValue, image: imageValue };

    await axios.post(url, product);
    fetchProducts();
  } catch (error) {
    console.log(error);
  }
});

async function fetchProducts() {
  try {
    const {
      data: { products },
    } = await axios.get(url);

    const productsDOM = products
      .map((product) => {
        return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`;
      })
      .join("");
    containerDOM.innerHTML = productsDOM;
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
