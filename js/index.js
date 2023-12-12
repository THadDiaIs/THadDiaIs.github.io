{

   fetch('./json/projects.json').then((response) => {
      return response.json().then((data) => {
         let newHtml = ""
         for (let key in data) {
            newHtml += `
            <div class="proj">
         <div class="sample" style="background-image: url(${data[key].snapshot});">
         <h2 class="proj-name">${data[key].name}</h2>
            <div class="technologies">${data[key].technologies.map((tech) => `<img class="tech" src="./images/${tech}.svg" alt="${tech}">`).join("")}</div>
            </div>
            <p class="description">
            ${data[key].description}
         </p>
         <div class="url-link"><a href="${data[key].url}">${data[key].url}</a></div>
         </div>
         `
         }
         document.getElementById("proj-container").innerHTML = newHtml
      })
   }).catch((error) => {
      console.log("Error", error)
   })

   document.addEventListener('scroll', () => {
      let nav = document.getElementById("nav-bar");
      if (window.scrollY > 0) {
         nav.classList.add("blured");
      } else {
         nav.classList.remove("blured");
      }
   });

   let output = document.getElementById('output-box');
   document.querySelectorAll(".personal-link-img").forEach((elem) => {
      addEventListener('mouseover',
         (mouse) => mouse.target ? output.innerText = mouse.target.alt : output.innerText = "None");
   })
}