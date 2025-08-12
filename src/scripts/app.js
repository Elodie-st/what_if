"use strict";

//nav
document.querySelectorAll('.nav__trigger').forEach(function(trigger) {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    const iphone = this.closest('.iphone'); // remonte jusqu'au bloc contenant tout
    console.log("CLIC !", iphone);
    if (iphone) {
      iphone.classList.toggle('nav--active');
    }
  });
});



const page = document.body.dataset.page;

if (page === 'IVG') {




//formulaire

const age1 = document.querySelector('.chifre1');
const age2 = document.querySelector('.chifre2');

const random = (max,min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
if(age1) age1.innerHTML = random(7,1);
if(age2) age2.innerHTML = random(9,0);

//nom et prenom
const inputs = document.querySelectorAll('.infobox');

inputs.forEach(input => {
  const label = input.previousElementSibling;
  input.addEventListener('focus', () => {
    if (label && label.classList.contains('infoLabel')) {
      label.style.visibility = 'hidden';
    }
  });

  input.addEventListener('blur', () => {
    if (label && label.classList.contains('infoLabel') && input.value === "") {
      label.style.visibility = 'visible';
    }
  });
});


//section


  const sectionFormulaire = document.getElementById('section--formulaire');
  const sectionMenstruation = document.getElementById('section--menstruation');
  const sectionMenstruation2 = document.getElementById('section--menstruation2');
  const sectionRendevous = document.getElementById('section--rendezvous1');
  const sectionLieu = document.getElementById('section--lieu');
  const sectionPopup = document.getElementById('section--mesage');

  const btnContinuer = document.getElementById('envoi');
  const calendrierDiv = document.getElementById('btn--calendrier');
  const btnSuivent = document.getElementById('btn--suivent');
  const btnEnvoyer = document.getElementById('btn--envoyer');
  const btnConfirmer = document.getElementById('btn--confirmer')

  // quand on clic sur "Continuer"  cacher formulaire, montrer menstruation
 
  if (btnContinuer) {
  btnContinuer.addEventListener('click', () => {
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'block';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'none';
    sectionPopup.style.display = 'none';
  });
  }
  // quand on clique sur "Calendrier"  cacher tout sauf menstruation2
  calendrierDiv.addEventListener('click', () => {
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'block';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'none';
    sectionPopup.style.display = 'none';
  });

  //quand on cclique sur "Suivent" cacher tout sauf rendvous1
  btnSuivent.addEventListener('click',() => {
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'block';
    sectionLieu.style.display = 'none';
    sectionPopup.style.display = 'none';
  });

  //quand on click sur "envoyer" on cache tout sauf lieu

  btnEnvoyer.addEventListener('click',() =>{
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'block';
    sectionPopup.style.display = 'none';
  });

  //quand on click sur "envoyer" on cache tout sauf mesage

  btnConfirmer.addEventListener('click',() =>{
    sectionFormulaire.style.display = 'none';
    sectionMenstruation.style.display = 'none';
    sectionMenstruation2.style.display = 'none';
    sectionRendevous.style.display = 'none';
    sectionLieu.style.display = 'none';
    sectionPopup.style.display = 'block';
  });


//calendrier
const monthNames = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
];
const dayNames = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

function createCalendar(container, date = new Date()) {
  // Vider l'ancien calendrier
  container.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  // Créer le tableau
  const table = document.createElement("table");
  table.className = "calendar fade-in";

  // En-tête : navigation + titre
  const headerRow = document.createElement("tr");
  const headerCell = document.createElement("th");
  headerCell.colSpan = 7;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "◀";
  prevBtn.onclick = () => {
    date.setMonth(month - 1);
    createCalendar(container, new Date(date));
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "▶";
  nextBtn.onclick = () => {
    date.setMonth(month + 1);
    createCalendar(container, new Date(date));
  };

  const title = document.createElement("span");
  title.textContent = `${monthNames[month]} ${year}`;

  headerCell.append(prevBtn, title, nextBtn);
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);

  // Ligne des jours
  const daysRow = document.createElement("tr");
  for (const day of dayNames) {
    const th = document.createElement("th");
    th.textContent = day;
    daysRow.appendChild(th);
  }
  table.appendChild(daysRow);

  // Trouver le premier jour à afficher (lundi de la première semaine)
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // Lundi = 0
  let current = new Date(year, month, 1 - startDay);

  // 6 lignes max
  for (let week = 0; week < 6; week++) {
    const row = document.createElement("tr");
    for (let day = 0; day < 7; day++) {
      const cell = document.createElement("td");
      const span = document.createElement("span");
      span.textContent = current.getDate();

      if (current.getMonth() !== month) {
        cell.classList.add("fora"); // Hors mois
      }
       // Aujourd'hui
       const today = new Date();
       if (
         current.getDate() === today.getDate() &&
         current.getMonth() === today.getMonth() &&
         current.getFullYear() === today.getFullYear()
       ) {
         cell.classList.add("avui");
       }
 
  // Sélection de date
  cell.addEventListener("click", () => {
    // Retirer la sélection précédente dans ce calendrier
    container.querySelectorAll(".selected").forEach(c => c.classList.remove("selected"));
    cell.classList.add("selected");
    console.log("Date sélectionnée :", current.toISOString().split("T")[0]);
  });

  cell.appendChild(span);
  row.appendChild(cell);
  current.setDate(current.getDate() + 1);
}
table.appendChild(row);
}

container.appendChild(table);
}

// Initialiser sur plusieurs calendriers
["calendari1", "calendari2", "calendari3"].forEach(id => {
const el = document.getElementById(id);
if (el) createCalendar(el);
});



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

// on reprend se que l utilisateur tape
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
      //trouver un hopitale en tapent un nom
      emptyArray = suggestions.filter((data)=>{
          return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase()); 
      });
      //afficger la liste des sugestion et clicke
      emptyArray = emptyArray.map((data) => {
        return '<li>' + data + '</li>';
      });
    
      searchWrapper.classList.add("active"); 
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
//aficher le resulta
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

}
