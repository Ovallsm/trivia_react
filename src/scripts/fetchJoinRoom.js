async function fetchCreateGame() {
  return fetch("http://localhost:8083/rooms", {
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
  return fetch("http://localhost:8083/rooms" + "/" + room.id + "/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: room.code,
      username: name,
    }),
  }).then((res) => res.json());
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

  localStorage.clear();

  localStorage.setItem("name", name);
  localStorage.setItem("token", ok.token);
  localStorage.setItem("playerId", ok.player.id);
  localStorage.setItem("roomId", room.id);
  localStorage.setItem("code", room.code);
  localStorage.setItem("isHost", true);
  return {
    token: ok.token,
    name: name,
    playerId: ok.player.id,
    roomId: room.id,
    code: room.code,
    isHost: true
  };
}

export async function joinGameWithURL(name) {
  var url = new URL(window.location.href);

  var roomid = url.searchParams.get("id");
  var roomcode = url.searchParams.get("code");

  const ok = await fetchAddPlayer(name, { id: roomid, code: roomcode });

  localStorage.clear();
  localStorage.setItem("name", name);
  localStorage.setItem("code", roomcode);
  localStorage.setItem("playerId", ok.player.id);
  localStorage.setItem("roomId", roomid);
  localStorage.setItem("token", ok.token);
  localStorage.setItem("isHost", false);
  return {
    token: ok.token,
    name: name,
    playerId: ok.player.id,
    roomId: roomid,
    code: roomcode,
    isHost: false
  };
}
