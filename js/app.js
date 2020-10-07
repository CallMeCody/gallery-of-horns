'use strict';

// let $animalsTemplate = $('.animalsTemplate');  // not used now with mustache
// let $horns = $('.animals'); // not used now with mustache
let keywordArray = [];
let imgArr = [];


/* ----  Loading page 1 and page 2 JSON files by Function */

function loadPage1() {
  $('main').empty();
  $('select').empty();
  imgArr = [];
  keywordArray = [];
  console.log('build page 1: ');
  console.log(keywordArray);
  $.ajax('./data/page-1.json', { method: 'get', datatype: 'json' })
    .then(page1 => {
      page1.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });

      populateDropdown();
      // hornSort();  //Sort by Number of Horns

      imgArr.forEach((typeOfAnimal) => {
        $('main').append(typeOfAnimal.createHTML());
      });
    }
    );
}

function loadPage2() {

  $('main').empty();
  $('select').empty();
  imgArr = [];
  keywordArray = [];
  console.log(' Begining of page rendering: ', keywordArray);
  $.ajax('./data/page-2.json', { method: 'get', datatype: 'json' })
    .then(page2 => {
      page2.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });

      populateDropdown();
      // hornSort();  //Sort by Number of Horns

      imgArr.forEach((typeOfAnimal) => {
        $('main').append(typeOfAnimal.createHTML());
      });
    }
    );

}


/* constructor and Prototype to diplay pages  */

function Hornsgallery(src) {
  this.src = src.image_url;
  this.title = src.title;
  this.description = src.description;
  this.keyword = src.keyword;
  this.horns = src.horns;

  imgArr.push(this);
}

Hornsgallery.prototype.createHTML = function(){
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
};

const populateDropdown = () => {
  const $default = $('select');
  imgArr.forEach((animal) => {
    if (keywordArray.includes(animal.keyword) === false) {
      keywordArray.push(animal.keyword);
    }
  });
  console.log('build the dropdown!');
 
  keywordArray.forEach((keyword) => {
    const $newDefault = $(`<option value='${keyword}'> ${keyword} </option>`);
    $default.append($newDefault);
    
  });
};

/* target keyword on change, change the display to choice */

$('select').on('change', function () {
  $('section').hide();
  $('section').remove('.class');
  $('section').each((index, element) => {
    if (this.value === $(element).attr('class')) {
      $(element).show();
    }
    else if (this.value === 'default') {
      $('section').show();
    }
  });
});


/*  -----------------  function calls and event listerner ---------*/

loadPage1();
/*  --------  Load page based on page number click ----- */
document.getElementById('button1').addEventListener('click', loadPage1);
document.getElementById('button2').addEventListener('click', loadPage2);


// TODO: 
// ======  Setup Page 2 ============//
/* 
 TODO:  STRETCH GOAL - put a varaible into the function based on click and load. [dry code]

*/
