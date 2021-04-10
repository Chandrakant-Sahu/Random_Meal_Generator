// Initializing the variables and url of JSON content page
const getMealbutton = document.querySelector("#mealButton");
const targetDiv = document.querySelector(".meal-wrapper");
const url = "https://www.themealdb.com/api/json/v1/1/random.php";

// Fetching the url using async / await
const getMealData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    mealData(data);
  } catch (error) {
    console.log(error);
  }

  changeButtonStyle();
};


// Toggling the class of the 'Get Meal' button
const changeButtonStyle = () => {
  setTimeout(() => {
    getMealbutton.classList.toggle("myButtonStyle");
    getMealbutton.textContent = "Get another meal";
  }, 2000);
};

// Function to perform all ths operational tasks
const mealData = (data) => {
  let dataContents = data.meals[0];
  let ingredients = [];

  // Getting ingredients into an array
  for (let i = 1; i <= 20; i++) {
    if (dataContents[`strIngredient${i}`]) {
      ingredients.push(`${dataContents[`strIngredient${i}`]}`);
    } else {
      break;
    }
  }

  // Checking if the meal has any tag(s) associated with it or not
  let mealTags = dataContents.strTags;
  if (mealTags === null) {
    mealTags = "No Tags";
  } else {
    mealTags = mealTags;
  }

  // Dynamically rendering  HTML and meal information into the page
  let newInnerHTML = `
                <section class="meal-overview">
                    <div id="meal-thumbnail">
                        <h4>${dataContents.strMeal}</h4>
                        <img src="${dataContents.strMealThumb}" alt="">
                    </div>
                    <div id="meal-tags">
                        <p><strong>Category: </strong>${
                          dataContents.strCategory
                        }</p>
                        <p><strong>Area: </strong>${dataContents.strArea}</p>
                        <p><strong>Tags: </strong>${mealTags}</p>
                    </div>
                </section>
                <section class="meal-instructions">
                    <h4>Instructions</h4>
                    <p>${dataContents.strInstructions}</p>
                </section>
                <section class="meal-ingredients">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${ingredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join(" ")}
                    </ul>
                </section>
                <section class="meal-video">
                    <h4>Check Out Video</h4>
                    <iframe src="https://www.youtube.com/embed/${dataContents.strYoutube.slice(
                      -11
                    )}" frameborder="0" style="border: 0"></iframe>
                </section>
            `;
  targetDiv.innerHTML = newInnerHTML;
};

// Adding event to the 'Get Meal' button
getMealbutton.addEventListener("click", getMealData);
