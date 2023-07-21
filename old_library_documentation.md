# Based Scraper JavaScript

![Pe Viitor logo](https://peviitor.ro/static/media/peviitor_logo.df4cd2d4b04f25a93757bb59b397e656.svg)

## Descriere 

**scraper_peviitor** este o bibliotecă de scraping bazată pe JavaScript, care se bazează pe bibliotecile de parsing HTML, JSSoup și Axios. Acesta vă permite să extrageți datele necesare din paginile web și să le salvați într-un format ușor de utilizat, cum ar fi CSV sau JSON. Cu , **scraper_peviitor** puteți selecta elementele HTML specifice de pe o pagină web și puteți extrage informațiile necesare, cum ar fi textul, link-urile, imagini etc.

Caracteristicile cheie ale **scraper_peviitor** includ:
- Utilizează bibliotecile JavaScript populare, JSSoup și Axios, pentru a facilita scraping-ul web.
- Extrage datele necesare de pe o pagină web folosind selecții HTML specifice.
- Oferă o varietate de opțiuni de stocare pentru datele scrapate, inclusiv JSON.
- Este ușor de utilizat și integrat în proiectele JavaScript existente.

**scraper_peviitor** este o opțiune excelentă pentru dezvoltatorii JavaScript care caută o bibliotecă puternică și flexibilă de scraping. Cu **scraper_peviitor**, puteți automatiza procesul de extragere a datelor din paginile web, economisind timp și efort.

## Instalare

Pentru a instala biblioteca **scraper_peviitor**, urmați următorii pași:

- Clonați fișierul `git clone https://github.com/peviitor-ro/based_scraper_py.git`
- Navigați la directorul **based_scraper_js**. Rulați comanda `cd based_scraper_js` pentru a naviga la acest director.
- Rulați comanda `npm i` pentru a instala **scraper_peviitor**.

## Exemple de utilizare 
1. Descărcarea conținutului de la un anumit URL:
```javascript
const scraper = require("../peviitor_scraper.js");
const s = new scraper.Scraper('https://www.example.com');
s.soup.then((soup) => {
 console.log(soup);
};
```
Aceste linii de cod creează un obiect Scraper care are ca URL https://www.example.com, și apoi descarcă codul HTML de la acel URL folosind atributul  `soup` și returnează un obiect JSSoup care poate fi ulterior folosit pentru a căuta anumite elemente în cadrul paginii web.
    
Pentru a extrage toate tag-urile "a" care conțin un atribut "href" care începe cu "https://":

```javascript
s.soup.then((soup) => {
 const anchors = soup.findAll("a", {"href":(response) =>{
   response.startsWith("https://");
   };
 });
};
```
    
Pentru a extrage primul tag "h1" de pe pagină:

```javascript
s.soup.then((soup) => {
 const heading = soup.find("hi");
};
```

2. Pentru a face un request POST către un API și a extrage răspunsul în format JSON:

```javascript
const scraper = require("../peviitor_scraper.js");
const s = new scraper.ApiScraper('https://api.example.com');
const data = {"key1": "value1", "key2": "value2"};
s.post(data).then((soup) => {
 console.log(soup);
};
```

3. Schimbarea URL-ului folosit de un obiect Scraper:

```javascript
// in dezvoltare
```

## Atribute si Metode

### Name:

În biblioteca **scraper_peviitor**, obiectul Name este folosit pentru a reprezenta numele unui tag HTML. De exemplu, dacă ai un element HTML de tipul `<head>`, obiectul Name asociat acestui tag va fi "head". Obiectul Name poate fi folosit pentru a căuta elemente specifice într-un document HTML sau pentru a filtra un set de elemente.

```javascript
s.soup.then((soup) => {
 const tag = soup.find("head");
 tag.name
 // 'head'
};
```

### Attributes:
Obiectul Attributes din **scraper_peviitor** este folosit pentru a reprezenta atributele unui tag HTML. Atributele pot fi accesate și modificate folosind sintaxa obiectului Attributes.

De exemplu, dacă ai un tag HTML de tipul `<a href="https://www.example.com">Example</a>`, poți accesa atributul href folosind obiectul Attributes. Astfel, poți obține valoarea cu atributul href:

```javascript
s.soup.then((soup) => {
 const tag = soup.find("a");
 tag.attrs.href
 // 'https://www.example.com'
};
```
### Navigation

#### .previousElement, .nextElement

Metodele .previousElement() și .nextElement() sunt metode ale obiectului Element din JavaScript și sunt folosite pentru a accesa elementele înrudite cu un anumit element HTML în cadrul unui document.

Metoda .previousElement() este folosită pentru a accesa elementul anterior al unui element HTML, adică primul element anterior care este, de asemenea, un element HTML. De exemplu, în cazul următorului fragment de cod HTML:

```html
<ul>
  <li>Primul element</li>
  <li>Al doilea element</li>
  <li>Al treilea element</li>
</ul>
```

Dacă vrem să accesează elementul `<li>` care conține textul "Al doilea element", putem folosi următorul cod JavaScript:

```javascript
s.soup.then((soup) => {
 const ul = soup.nextElement;
 const secondli = ul.nextElement.nextElement;
 // secondli.string: 'Al doilea element';
 const firstli = li.previousElement;
 // firstli.string: 'Primul element';
};
```
#### .previousSibling, .nextSibling

Metodele .previousSibling și .nextSibling sunt metode ale obiectului Node din JavaScript și sunt folosite pentru a accesa nodurile înrudite cu un anumit nod HTML în cadrul unui document.

Metoda .previousSibling este folosită pentru a accesa nodul anterior al unui nod HTML, adică primul nod anterior care este, de asemenea, un nod.

Dacă vrem să accesează nodul text care se află înaintea primului element din listă, putem folosi următorul cod JavaScript:

```javascript
s.soup.then((soup) => {
 const previousNode = element.previousSibling;
};
```
În acest exemplu, element reprezintă primul element din listă, adică elementul `<li>` cu textul "Primul element". Folosind metoda .previousSibling, putem accesa nodul anterior al acestui element, adică nodul text care se află înaintea sa.

Metoda .nextSibling este folosită pentru a accesa nodul următor al unui nod HTML, adică primul nod următor care este, de asemenea, un nod. 
```javascript
s.soup.then((soup) => {
 const nextNode = element.nextSibling;
};
```
În acest exemplu, nextNode reprezintă nodul următor al nodului reprezentat de variabila soup, adică primul element următor din listă. Folosind metoda .nextSibling(), putem accesa nodul următor al acestui element.


Pentru a vedea mai multe exemple, puteți verifica fișierele din folderul "sites". Acesta conține diverse pagini web pe care le puteți utiliza pentru a testa funcționalitatea clasei Scraper și a altor clase legate de web scraping. În aceste fișiere puteți găsi diverse exemple de atribute și taguri pe care le puteți utiliza în metodele din clasa Rules. De asemenea, puteți crea propriile exemple în aceste fișiere și să le utilizați pentru a experimenta și a îmbunătăți codul dvs.

