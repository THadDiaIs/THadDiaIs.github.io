let personalLinkClick = (e) => {
   e.preventDefault();
   navigator.clipboard.writeText(e.target.alt);
   ///create a tooltip here and a notification to replace the alert below
   alert("Copied the text: " + e.target.alt);
}

let output = document.getElementById("output-box");
let personalLinkHover = (e) => {
   e.target.alt ? output.innerText = e.target.alt : output.innerText = "|";
}

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
         <div class="url-link"><a href="${data[key].url}">Visit</a></div>
         </div>
         `
         }
         document.getElementById("proj-container").innerHTML = newHtml
      })
   }).catch((error) => {
      console.log("Error", error)
   })

   fetch('./json/certificates.json').then((response) => {
      return response.json().then((data) => {
         let newHtml = ""
         for (let key in data) {
            newHtml += `
            <div class="cert">
            <img class="cert-img" src="${data[key].src}" alt="${data[key].name}">
            <p class="cert-text"><a href="${data[key].link}" target="_blank" rel="noopener noreferrer">${data[key].name}</a></p>
            </div>
            `
         }
         document.getElementById("certs-container").innerHTML = newHtml
      })
   })
   .catch((error) => {
      console.log("Error", error)
   })

   window.addEventListener('scroll', () => {
      let nav = document.getElementById("nav-bar");
      if (window.scrollY > 5) {
         nav.classList.add("blured");
      } else {
         nav.classList.remove("blured");
      }

      /* document.getElementById("hexagon").animate([
         {  rotate: '0deg' },
         {  rotate: '60deg' }
      ], {
         duration: 500
      }); */


   });

   document.querySelectorAll("img.personal-link-img").forEach((img) => {
      img.addEventListener("mouseover", (e) => personalLinkHover(e));
      img.addEventListener("mousseout", () => output.innerText = "|")
   });

}
