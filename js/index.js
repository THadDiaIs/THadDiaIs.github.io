let personalLinkClick = (e) => {
   e.preventDefault();
   navigator.clipboard.writeText(e.target.alt);
   ///create a tooltip here and a notification to replace the alert below
   let notif = document.getElementById("notif");
   notif.classList.add("notification");
   notif.innerHTML = `<p class="notification-text">${e.target.alt} copied to clipboard!</p>
   <button class="notification-btn">x</button>`;
   setTimeout(() => {
      notif.innerHTML = "";
      notif.classList.remove("notification");
   }, 4000)
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
         <div class="url-link"><a href="${data[key].url}" target="_blank" rel="noopener noreferrer" >Repo</a></div>
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

   let baseScroll = 0;
   let transparency = 1;
   let nav = document.getElementById("nav-bar");
   let windowHalfHeight = (window.innerHeight / 2);
   let welcome = document.getElementById("welcome");
   let transparencyDelta = (1 / windowHalfHeight);
   window.addEventListener('scroll', () => {
      if (window.scrollY > windowHalfHeight - 100 ) {
         nav.classList.add("blured");
      } else {
         nav.classList.remove("blured");
      }
      
      if (window.scrollY < baseScroll) {
         if (transparency < 1)transparency = 0 + (transparencyDelta * window.scrollY);
      } else {
         if (transparency > 0)transparency = 1 - (transparencyDelta * window.scrollY);
      }

      console.log(transparency, "transpatency")
      welcome.style.backgroundColor = `rgba(11, 36, 71, ${transparency})`;
      baseScroll = window.scrollY

      /* document.getElementById("hexagon").animate([
         {  rotate: '0deg' },
         {  rotate: '60deg' }
      ], {
         duration: 500
      }); */


   });

   document.querySelectorAll("img.personal-link-img").forEach((img) => {
      img.addEventListener("mouseover", (e) => personalLinkHover(e));
      img.addEventListener("mouseleave", () => output.innerText = "|")
   });

}
