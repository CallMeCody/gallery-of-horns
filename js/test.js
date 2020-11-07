'use strict';
//global array each animal pushed into
let animalArray = [];

// -------------------------------AJAX Calls----------------------------//
$.ajax('data/page-1.json', { method: 'GET', datatype: 'JSON' })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.list();
      newHornAnimal.class = 'pageOne';
    })
  });

$.ajax('data/page-2.json', { method: 'GET', datatype: 'JSON' })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.list();
      newHornAnimal.class = 'pageTwo';
    })
    sortByTitle();
    createElements();
    $('.pageTwo').hide();
  });

// ------------------------------- FUNCTIONS------------------------------//
function sortByTitle() {
  animalArray.sort(function (a, b) {
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    }
  });
  console.log('animal array', animalArray);
}

function sortByHorns() {
  animalArray.sort(function (a, b) {
    if (a.hornCount > b.hornCount) {
      return 1;
    } else if (a.hornCount < b.hornCount) {
      return -1;
    }
  });
  console.log('animal array', animalArray);
}

function createElements() {
  animalArray.forEach(obj => {
    $('main').append(obj.createHTML());
  });
}
function clearElements() {
  $('main').empty();
}

//-----------------------------CONSTRUCTOR-----------------------------//
// constructor function builds animal obnject
function Animal(object) {
  this.name = object.keyword;
  this.image = object.image_url;
  this.description = object.description;
  this.hornCount = object.horns;
  this.title = object.title;

  animalArray.push(this);
}

Animal.prototype.list = function () {
  //Remove duplicate images
  //https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
  //Collaborated with Tia and David
  let seen = {};

  const $options = $(`<option value="${this.name}">${this.name.toUpperCase()}</option>`);

  $('select').append($options);

  $('option').each(function () {
    let txt = $(this).text().toLocaleUpperCase();
    if (seen[txt]) {
      $(this).remove();
    }
    else
      seen[txt] = true;
  });
};

Animal.prototype.createHTML = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
};

//---------------------------EVENT LISTENERS---------------------------//
$('#buttonTitle').on('click', () => {
  clearElements();
  sortByTitle();
  createElements();
});

$('#buttonHorns').on('click', () => {
  clearElements();
  sortByHorns();
  createElements();
});

$('#button1').on('click', function () {
  $('.pageOne').show();
  $('.pageTwo').hide();
});

$('#button2').on('click', function () {
  $('.pageTwo').show();
  $('.pageOne').hide();
});

$('select').on('change', function () {
  $('section').hide();
  $('section').each((index, element) => {
    if (this.value === $(element).attr('data-keyword')) {
      $(element).show();
    }
    else if (this.value === 'default') {
      $('section').show();
    }
  });
});
document.getElementById('button2').addEventListener('click', loadPage2);

function loadPage2() {

  $('main').empty();
  imgArr = [];
  $.ajax('./data/page-2.json', { method: 'get', datatype: 'json' })
    .then(potato => {
      potato.forEach(animalsVal => {
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


// -----  Sort on number of horns -----//




// imgArr.forEach(function(storedImages){
//   if('rhino' === storedImages.keyword){
//     const imageTitle = storedImages.title;
//     const imageListItems = $('li');
//     imageListItems.each(function(){
//       console.log(imageTitle);
//       if($(this).find('h2').text() === imageTitle){
//         $(this).show();
//         console.log($(this), 'i found it');
//       }
//     });
//   }
// });


// function sortbyKeyword(keyword) {
//   console.log('test');
//   clearElements();
//   let filteredArr = [];
//   for (let i = 0; i < imgArr.length; i++) {
//     if (imgArr[i].keyword === keyword){
//       filteredArr.push(imgArr[i]);
//     }
//   }
//   filteredArr.forEach((typeOfAnimal) => {
//     $('main').append(typeOfAnimal.createHTML());
//   });
// }


// function clearElements() {
//   $('main').empty();
// }

/* TODO:  Filter by Keyword
1. User clicks on Dropdown - eventHandler?
2. User Selects .select()  unique keywords from json file  --   DONE
  a. load the drop down with the unique keyword
  b. load  " hide old /new images " when keyword is selected.
  
*/

// create new array with selected keywords


// .hide() for when clicked and re-create the html.



// Hornsgallery.prototype.renderJquery = function () {
//   let $newUrl = $horns.clone();
//   $newUrl.attr('class', `${this.keyword}`);
//   $newUrl.find('h2').text(this.title);
//   $newUrl.find('img').attr('src', this.src);
//   $newUrl.find('p').text(this.description);
//   $animalsTemplate.append($newUrl);
// };
