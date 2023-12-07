{
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
         (mouse) => mouse.target ? output.innerText = mouse.target.alt: output.innerText = "None");
   })
}