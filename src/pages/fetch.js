async function fetchCreateGame() {
  return fetch("/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: generateCode() }),
  }).then((res) => res.json());
}

function generateCode() {
  return Math.floor(Math.random() * 3600) + "ES" + generateRandomWord();
}

async function fetchAddPlayer(name, room) {
  return fetch("/rooms" + "/" + room.id + "/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: room.code,
      username: name,
    }),
  })
    .then((res) => res.json())
    .catch((c) => console.log(c));
}

const sustantiv = [
  "capital",
  "continente",
  "planeta",
  "oceano",
  "monumento",
  "inventor",
  "experimento",
  "teoria",
  "revolucion",
  "imperio",
  "bandera",
  "idioma",
  "especie",
  "galaxia",
  "volcan",
  "presidente",
  "cientifico",
  "mapa",
  "museo",
  "batalla",
  "constitucion",
  "formula",
  "satélite",
  "archivo",
  "civilizacion",
  "marc",
  "leche",
  "helicoptero",
  "jamon",
  "credo",
  "dios",
  "lancero",
  "patata",
  "ornitorrinco",
  "sandwich",
  "payaso",
  "trompeta",
  "calcetin",
  "microondas",
  "banana",
  "hamster",
  "fantasma",
  "abuelo",
  "tostadora",
  "pepino",
  "pato",
  "cactus",
  "sirena",
  "gnomo",
  "churro",
  "lavadora",
  "tiburon",
];

function generateRandomWord() {
  const sustantivo = sustantiv[Math.floor(Math.random() * sustantiv.length)];
  const adjetivo = adjectiv[Math.floor(Math.random() * adjectiv.length)];
  return sustantivo + "_" + adjetivo;
}
const adjectiv = [
  "loco",
  "pegajoso",
  "brillante",
  "ridiculo",
  "saltarin",
  "peludo",
  "chillón",
  "torpe",
  "misterioso",
  "gruñon",
  "gigante",
  "minúsculo",
  "resbaloso",
  "chiflado",
  "travieso",
  "despistado",
  "zumbador",
  "bizco",
  "dramatico",
  "mareado",
  "explosivo",
  "tontorrón",
  "parlanchin",
  "cosmico",
  "bromista",
  "maczastico",
  "lamebotas",
  "fracturada",
  "carinoso",
  "perpetuoso",
  "magnifico",
  "grandioso",
  "apache",
  "halal",
  "largo",
  "desquiciado",
  "choncho",
  "chamuscado",
  "sobrecafeinado",
  "confundido",
  "rarisimo",
  "insoportable",
  "dramatiquisimo",
  "hiperactivo",
  "despeinado",
  "turbio",
  "sospechoso",
  "torcidisimo",
  "emocionado",
  "mareadisimo",
  "random",
  "epico",
  "ridiculisimo",
  "caotico",
  "legendario",
];

export async function createGame(name) {
  const room = await fetchCreateGame();

  const ok = await fetchAddPlayer(name, room);

  console.log(room);
  console.log(ok);

  console.log(generateJoinURL(room));
  localStorage.setItem("username",name)

}

function generateJoinURL(room) {
  var param = new URL("http://localhost:5173/joinroom");
  param.searchParams.append("code", room.code);
  param.searchParams.append("id", room.id);

  return param.toString();
}

export async function joinGameWithURL(name) {
  var url = new URL(window.location.href);

  var roomid = url.searchParams.get("id");
  var roomcode = url.searchParams.get("code");
  await fetchAddPlayer(name, { id: roomid, code: roomcode });

  localStorage.setItem("username",name)
}
