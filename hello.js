const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type methode

TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;

  // Get full text of current word
  const fullTxt = this.words[current];
  // Check if deleting
  if (this.isDeleting) {
    // Remove Char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add Char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<h1 class="txt">${this.txt}</h1>`;

  // Initial Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delet to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt == "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  // new TypeWriter(txtElement, words, wait);
}

// // ES6 Class
// class TypeWriter {
//   constructor(txtElement, words, wait = 3000) {

//   }
// }
