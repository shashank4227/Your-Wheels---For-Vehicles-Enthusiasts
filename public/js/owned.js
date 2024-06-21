function details(cardIndex) {
  var var1 = document.querySelectorAll(".owned-card .details")[cardIndex];
  var var2 = document.querySelectorAll(".owned-card .service-history")[
    cardIndex
  ];
  var var3 = document.querySelectorAll(".owned-card .insurance")[cardIndex];

  var1.style.display = "block";
  var2.style.display = "none";
  var3.style.display = "none";
}

function service(cardIndex) {
  var var1 = document.querySelectorAll(".owned-card .details")[cardIndex];
  var var2 = document.querySelectorAll(".owned-card .service-history")[
    cardIndex
  ];
  var var3 = document.querySelectorAll(".owned-card .insurance")[cardIndex];

  var1.style.display = "none";
  var2.style.display = "block";
  var3.style.display = "none";
}

function insurance(cardIndex) {
  var var1 = document.querySelectorAll(".owned-card .details")[cardIndex];
  var var2 = document.querySelectorAll(".owned-card .service-history")[
    cardIndex
  ];
  var var3 = document.querySelectorAll(".owned-card .insurance")[cardIndex];

  var1.style.display = "none";
  var2.style.display = "none";
  var3.style.display = "block";
}
