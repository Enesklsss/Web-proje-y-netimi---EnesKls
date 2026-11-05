const kategoriler = {
  "Kitap":      { emoji: "📚", renk: "#ffe0b3" },
  "Ev eşyası":  { emoji: "🪴", renk: "#cdeee7" },
  "Giyim":      { emoji: "🧥", renk: "#fcd3dc" },
  "Elektronik": { emoji: "🎧", renk: "#d6e0ff" },
  "Oyuncak":    { emoji: "🧩", renk: "#fff0a8" }
};

const esyalar = [
  { ad: "Roman seti (5 kitap)", kategori: "Kitap", mahalle: "Çankaya", istek: "Çocuk kitabı" },
  { ad: "Çalışma lambası", kategori: "Ev eşyası", mahalle: "Kadıköy", istek: "Saksı bitkisi" },
  { ad: "Kışlık mont (M beden)", kategori: "Giyim", mahalle: "Bornova", istek: "Spor ayakkabı" },
  { ad: "Eski model kulaklık", kategori: "Elektronik", mahalle: "Çankaya", istek: "Powerbank" },
  { ad: "Ahşap yapboz", kategori: "Oyuncak", mahalle: "Kadıköy", istek: "Kutu oyunu" }
];

let secili = "Hepsi";
const liste = document.getElementById("liste");
const bos = document.getElementById("bos");
const arama = document.getElementById("arama");
const cipler = document.getElementById("cipler");
const form = document.getElementById("form");
const bildirim = document.getElementById("bildirim");

function bildir(mesaj) {
  bildirim.textContent = mesaj;
  bildirim.classList.add("goster");
  setTimeout(() => bildirim.classList.remove("goster"), 2500);
}

function ciplerCiz() {
  cipler.innerHTML = "";
  ["Hepsi", ...Object.keys(kategoriler)].forEach(ad => {
    const b = document.createElement("button");
    b.className = "cip";
    b.type = "button";
    b.textContent = ad === "Hepsi" ? "Hepsi" : kategoriler[ad].emoji + " " + ad;
    b.setAttribute("aria-pressed", ad === secili);
    b.addEventListener("click", () => { secili = ad; ciplerCiz(); ciz(); });
    cipler.appendChild(b);
  });
}

function ciz() {
  const aranan = arama.value.trim().toLowerCase();
  const sonuc = esyalar.filter(e =>
    (secili === "Hepsi" || e.kategori === secili) &&
    (e.ad + " " + e.mahalle).toLowerCase().includes(aranan)
  );
  liste.innerHTML = "";
  bos.hidden = sonuc.length > 0;

  sonuc.forEach(e => {
    const k = kategoriler[e.kategori];
    const kart = document.createElement("article");
    kart.className = "esya";

    const simge = document.createElement("div");
    simge.className = "simge";
    simge.style.background = k.renk;
    simge.textContent = k.emoji;
    const baslik = document.createElement("h3");
    baslik.textContent = e.ad;
    const yer = document.createElement("div");
    yer.className = "mahalle";
    yer.textContent = "📍 " + e.mahalle;
    const istek = document.createElement("div");
    istek.className = "istek";
    istek.textContent = "Karşılığında: " + e.istek;
    const buton = document.createElement("button");
    buton.className = "dugme";
    buton.textContent = "Takas teklif et";
    buton.addEventListener("click", () => bildir("🎉 Teklifin gönderildi: " + e.ad));

    kart.append(simge, baslik, yer, istek, buton);
    liste.appendChild(kart);
  });
}

const secim = form.querySelector("select");
Object.keys(kategoriler).forEach(ad => secim.add(new Option(ad, ad)));

form.addEventListener("submit", ev => {
  ev.preventDefault();
  const v = new FormData(form);
  esyalar.unshift({
    ad: v.get("ad").trim(),
    kategori: v.get("kategori"),
    mahalle: v.get("mahalle").trim(),
    istek: v.get("istek").trim()
  });
  form.reset();
  arama.value = "";
  secili = "Hepsi";
  ciplerCiz();
  ciz();
  bildir("✅ Eşya listeye eklendi");
  document.getElementById("esyalar").scrollIntoView({ behavior: "smooth" });
});

arama.addEventListener("input", ciz);
ciplerCiz();
ciz();
