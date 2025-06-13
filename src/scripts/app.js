"use strict";

//formulaire

const age = document.querySelector('.age');

const random = (max,min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
age.innerHTML = random(9,0);

//nav
document.querySelectorAll('.nav__trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentElement.classList.toggle('nav--active');
    });
  });

//section


  const sectionFormulaire = document.getElementById('section--formulaire');
  const sectionMenstruation = document.getElementById('section--menstruation');
  const sectionMenstruation2 = document.getElementById('section--menstruation2');
  const sectionRendevous = document.getElementById('section--rendezvous1');
  const sectionLieu = document.getElementById('section--lieu');

  const btnContinuer = document.getElementById('envoi');
  const calendrierDiv = document.getElementById('btn--calendrier');
  const btnSuivent = document.getElementById('btn--suivent');
  const btnEnvoyer = document.getElementById('btn--envoyer');

  // quand on clic sur "Continuer"  cacher formulaire, montrer menstruation
  btnContinuer.addEventListener('click', () => {
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'block';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'none';
  });

  // quand on clique sur "Calendrier"  cacher tout sauf menstruation2
  calendrierDiv.addEventListener('click', () => {
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'block';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'none';
  });

  //quand on cclique sur "Suivent" cacher tout sauf rendvous1
  btnSuivent.addEventListener('click',() => {
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'block';
    sectionLieu.style.display = 'none';
  });

  //quand on click sur "envoyer" on cache tout sauf lieu

  btnEnvoyer.addEventListener('click',() =>{
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'block';
  });


//calendrier

var mesos = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Julliet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
];

var dies = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche'
];

var dies_abr = [
  'D',
  'L',
  'Ma',
  'Me',
  'J',
  'V',
  'S'
];

Number.prototype.pad = function(num) {
  var str = '';
  for(var i = 0; i < (num-this.toString().length); i++)
      str += '0';
  return str += this.toString();
}

function calendari(widget, data)
{

  var original = widget.getElementsByClassName('actiu')[0];

  if(typeof original === 'undefined')
  {
      original = document.createElement('table');
      original.setAttribute('data-actual',
          data.getFullYear() + '/' +
          data.getMonth().pad(2) + '/' +
          data.getDate().pad(2))
      widget.appendChild(original);
  }

  var diff = data - new Date(original.getAttribute('data-actual'));

  diff = new Date(diff).getMonth();

  var e = document.createElement('table');

  e.className = diff  === 0 ? 'amagat-esquerra' : 'amagat-dreta';
  e.innerHTML = '';

  widget.appendChild(e);

  e.setAttribute('data-actual',
                 data.getFullYear() + '/' +
                 data.getMonth().pad(2) + '/' +
                 data.getDate().pad(2))

  var fila = document.createElement('tr');
  var titol = document.createElement('th');
  titol.setAttribute('colspan', 7);

  var boto_prev = document.createElement('button');
  boto_prev.className = 'boto-prev';
  boto_prev.innerHTML = '&#9666;';

  var boto_next = document.createElement('button');
  boto_next.className = 'boto-next';
  boto_next.innerHTML = '&#9656;';

  titol.appendChild(boto_prev);
  titol.appendChild(document.createElement('span')).innerHTML = 
      mesos[data.getMonth()] + '<span class="any">' + data.getFullYear() + '</span>';

  titol.appendChild(boto_next);

  boto_prev.onclick = function() {
      data.setMonth(data.getMonth() - 1);
      calendari(widget, data);
  };

  boto_next.onclick = function() {
      data.setMonth(data.getMonth() + 1);
      calendari(widget, data);
  };

  fila.appendChild(titol);
  e.appendChild(fila);

  fila = document.createElement('tr');

  for(var i = 1; i < 7; i++)
  {
      fila.innerHTML += '<th>' + dies_abr[i] + '</th>';
  }

  fila.innerHTML += '<th>' + dies_abr[0] + '</th>';
  e.appendChild(fila);

  
  var inici_mes =
      new Date(data.getFullYear(), data.getMonth(), -1).getDay();

  var actual = new Date(data.getFullYear(),
      data.getMonth(),
      -inici_mes);


  for(var s = 0; s < 6; s++)
  {
      var fila = document.createElement('tr');

      for(var d = 1; d < 8; d++)
      {
    var cela = document.createElement('td');
    var span = document.createElement('span');

    cela.appendChild(span);

          span.innerHTML = actual.getDate();

          if(actual.getMonth() !== data.getMonth())
              cela.className = 'fora';

      
          if(data.getDate() == actual.getDate() &&
       data.getMonth() == actual.getMonth())
  cela.className = 'avui';

    actual.setDate(actual.getDate()+1);
          fila.appendChild(cela);
      }

      e.appendChild(fila);
  }

  setTimeout(function() {
      e.className = 'actiu';
      original.className +=
      diff === 0 ? ' amagat-dreta' : ' amagat-esquerra';
  }, 20);

  original.className = 'inactiu';

  setTimeout(function() {
      var inactius = document.getElementsByClassName('inactiu');
      for(var i = 0; i < inactius.length; i++)
          widget.removeChild(inactius[i]);
  }, 1000);

}

//plusieur calendarier

const calendari1 = document.getElementById('calendari1');
if (calendari1) {
  calendari(calendari1, new Date());
}

const calendari2 = document.getElementById('calendari2');
if (calendari2) {
  calendari(calendari2, new Date());
}

const calendari3 = document.getElementById('calendari3');
if (calendari3) {
  calendari(calendari3, new Date());
}


//barre de recherche 

let suggestions = [
  "246 - VIVALIA - HOPITAL ARLON - RUE DES DEPORTES 137 6700 Arlon ",
  "707 - CHU DE LIEGE --- 2840 - NOTRE-DAME DE BRUYERES - RUE DE GAILLARMONT 600 4032 Liège",
  "166 - CHU UCL NAMUR - STE. ELISABETH NAMUR --- 3290 - STE. ELISABETH NAMUR - PLACE LOUISE GODIN 15 5000 Namur",
  "146 - CHU HELORA - JOLIMONT - LOBBES --- 3200 - HOPITAL DE LA LOUVIERE - SITE JOLIMONT - RUE FERRER 159 7100 La Louvière",
  "043 - CLINIQUE SAINT PIERRE --- 1730 - ST. PIERRE OTTIGNIES - AVENUE REINE FABIOLA 9 1340 Ottignies-Louvain-la-Neuve",
  "111 - EUROPAZIEKENHUIZEN --- 1420 - ST. MICHIEL - LINTHOUTSTRAAT 150 1040 Etterbeek",
  "322 - UNIVERSITAIR ZIEKENHUIS LEUVEN --- 4260 - STADSCAMPUS LEUVEN - KAPUCIJNENVOER 7 3000 Louvain",
  "371 - ZIEKENHUIS OOST-LIMBURG --- 3560 - SINT-JAN GENK - SYNAPS PARK 1 3600 Genk",
  "308 - AZ SINT-ELISABETH --- 1250 - SINT-ELISABETH HERENTALS - NEDERRIJ(HRT) 133 2200 Herentals",
  "017 - AZ MARIA MIDDELARES --- 1850 - MEDISCH CENTRUM MARIA MIDDELARES - KLINIEKSTRAAT 27 9050 Gand",
  "117 - AZ DELTA --- 1970 - AZ DELTA TORHOUT - SINT-REMBERTLAAN 21 8820 Torhout"
];

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
  let userData = e.target.value; 
  let emptyArray = [];
  if(userData){
      icon.onclick = ()=>{
          webLink = "https://www.google.com/search?q=" + userData;
          linkTag.setAttribute("href", webLink);
          console.log(webLink);
          linkTag.click();
      }
      emptyArray = suggestions.filter((data)=>{
          //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
          return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
      });

      emptyArray = emptyArray.map((data) => {
        return '<li>' + data + '</li>';
      });
    
      searchWrapper.classList.add("active"); //show autocomplete box
      showSuggestions(emptyArray);
  
      let allList = suggBox.querySelectorAll("li");
    allList.forEach((li) => {
      li.addEventListener("click", function () {
        select(this);
      });
    });
  
  
    }else{
      searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}

function select(element){
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = ()=>{
      webLink = "https://www.google.com/search?q=" + selectData;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
  }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;

  if (!list.length) {
    listData = "<li>Aucune suggestion</li>";
  } else {
    listData = list.join("");
  }

  suggBox.innerHTML = listData;
}