/**
 * Armenian language fixes for the imported course, news and programme content.
 *
 * Shared by `fix-armenian-content.mts`, which applies them to the Sanity
 * dataset and to `data/gos/translations/*.json` (the import source), so a
 * re-import does not bring the errors back.
 *
 * Scope, by agreement with the client:
 *   - unambiguous spelling, grammar, punctuation and typo fixes
 *   - calques rewritten as natural Armenian, meaning unchanged
 *   - scrape leftovers (form fields, duplicated paragraphs) removed
 * Medical terms with more than one accepted Armenian form are NOT touched
 * here; they are listed for a medical reviewer instead.
 */

/** Exact or regex replacements, applied in order. */
const REPLACEMENTS: Array<[RegExp | string, string]> = [
  // Stray Cyrillic letters inside Armenian or Latin words.
  ["Halluх", "Hallux"],
  ["практикական", "գործնական"],

  // Sentences rewritten as natural Armenian (meaning unchanged).
  [
    "Դասընթացը կպատմի ոսկրածակ օստեոսինթեզի հիմունքների, ինչպես նաև տուբուլյար մոդուլային ապարատներով ժամանակավոր ֆիքսացիայի և Իլիզարովի եղանակով կոտրվածքների բուժման մասին։",
    "Դասընթացում կներկայացվեն ոսկրածակ օստեոսինթեզի հիմունքները, տուբուլյար մոդուլային ապարատներով ժամանակավոր ֆիքսացիան և Իլիզարովի եղանակով կոտրվածքների բուժումը։",
  ],
  [
    "Բժշկության մեջ գիտահետազոտական աշխատանքը կլինիկական պրակտիկայի կարևոր մասն է և թույլ է տալիս ստուգել ու բժշկական հանրությանը հասցնել սեփական նորարարական բուժական հայեցակարգը։",
    "Բժշկության մեջ գիտահետազոտական աշխատանքը կլինիկական պրակտիկայի կարևոր մասն է․ այն հնարավորություն է տալիս ստուգել սեփական նորարարական բուժական մոտեցումը և ներկայացնել այն բժշկական հանրությանը։",
  ],
  [
    /^Մեր դասընթացը կպատմի, թե ինչպես են այսօր կազմակերպվում գիտական հետազոտությունները.*$/,
    "Դասընթացում կներկայացվի, թե ինչպես են այսօր կազմակերպվում գիտական հետազոտությունները և ինչի վրա են դրանք հիմնված։ Մասնակիցները կստանան գործիքներ գիտակլինիկական խնդիրը բացահայտելու և ձևակերպելու համար, կծանոթանան հետազոտությունների դիզայնին, դրանց անցկացման փուլերին, էթիկական կանոններին և արդյունքների հավաստիության ստուգման մեթոդներին, ինչպես նաև գրախոսվող ամսագրերում հրապարակման համար հոդված պատրաստելու սկզբունքներին։",
  ],
  ["Եզրակացություն. ի՞նչ է հետո", "Եզրակացություն. ի՞նչ է սպասվում հետագայում"],
  [
    "1) դուք լրացնում եք ձևը, որից հետո ձեզ է գալիս ծանուցում-նամակ՝ մասնակցության վճարման վավերապայմաններով;",
    "1) լրացնում եք ձևը, որից հետո ստանում եք ծանուցող նամակ՝ մասնակցության վճարի տվյալներով,",
  ],
  ["Ինչո՞ւ ինձ մոտ չստացվեց", "Ինչո՞ւ չստացվեց"],
  ["հարցի ժամանակակից վիճակը", "ներկայիս մոտեցումները"],
  ["Հենակետային գծերն ու անկյունները նորմայում", "Հենակետային գծերն ու անկյունները նորմալ վիճակում"],
  ["Քեյս-նստաշրջան", "Կլինիկական դեպքերի նստաշրջան"],
  [
    "Դեպքերի քննարկումներ և մոդերացվող վահանակներ",
    "Կլինիկական դեպքերի քննարկումներ մոդերատորի ղեկավարությամբ",
  ],
  // «Workshop» in the (hidden) event entries: «արհեստանոց» is a craft workshop.
  ["Բժշկական սիմուլյացիայի արհեստանոց", "Բժշկական սիմուլյացիայի աշխատաժողով"],
  ["սիմուլյացիոն արհեստանոց՝", "սիմուլյացիոն աշխատաժողով՝"],
  [/վարպետության դաս/g, "վարպետաց դաս"],
  ["Կենսական կարևոր", "Կենսականորեն կարևոր"],
  ["Հնգադասընթացային տարի՝", "Հինգ դասընթաց մեկ տարում՝"],

  // Russianisms: "…ի մոտ" for "у …".
  ["մարզիկների մոտ", "մարզիկների շրջանում"],
  ["ռևմատոիդ արթրիտով հիվանդների մոտ", "ռևմատոիդ արթրիտով հիվանդների դեպքում"],
  ["կոքսարթրոզով հիվանդների մոտ կոնքազդրային", "կոքսարթրոզով հիվանդների կոնքազդրային"],
  ["Ուրգենտ թարախային", "Շտապ թարախային"],
  ["Լեկցիոն-գործնական", "Դասախոսական-գործնական"],
  ["Տրավմատոլոգիայի և օրթոպեդիայի", "Վնասվածքաբանության և օրթոպեդիայի"],

  // Case: the object of a verb took the genitive form.
  ["Հայաստանում պատրաստում է վիրաբույժների՝", "Հայաստանում պատրաստում է վիրաբույժներ՝"],
  ["Պատրաստել վիրաբույժների՝", "Պատրաստել վիրաբույժներ՝"],
  ["Գյումրիում համախմբում է վիրաբույժների,", "Գյումրիում համախմբում է վիրաբույժներին,"],
  ["առանց փոխարինելու այդ անկախ կայքին", "առանց փոխարինելու այդ անկախ կայքը"],
  ["ընդհանուր նստաշրջանների՝", "ընդհանուր նստաշրջաններին՝"],
  ["մշտական ֆիքսացիայի»", "մշտական ֆիքսացիային»"],
  ["մշտական ներքին ֆիքսացիայի»", "մշտական ներքին ֆիքսացիային»"],
  ["հետաձգվում է մարտի 5-ին", "հետաձգվում է մինչև մարտի 5-ը"],

  // The definite article takes «ն» before a vowel.
  ["ASCEL-ը այստեղ", "ASCEL-ն այստեղ"],
  ["հիմնադրամը անկախ", "հիմնադրամն անկախ"],
  ["գրանցումը ավարտված", "գրանցումն ավարտված"],
  ["դասընթացը ընդգրկել", "դասընթացն ընդգրկել"],
  ["գիտելիքը իրապես", "գիտելիքն իրապես"],

  // Question mark on «ու» goes over the «ո».
  ["ու՞մ", "ո՞ւմ"],
  [/^Ում համար է նախատեսված$/, "Ո՞ւմ համար է նախատեսված"],

  // Clear typos in names and places (same person/place spelled correctly elsewhere).
  [/Բեզվերի(?![ա-և])/g, "Բեզվերխի"],
  // Rostov-on-Don: the natural Armenian form is «Դոնի Ռոստով».
  ["Ռոստով-Դոնի", "Դոնի Ռոստով"],
  ["Ռոստով Դոնի վրա", "Դոնի Ռոստով"],
  // hip2026: the same course's faculty list names «Никитин Сергей Сергеевич»;
  // «С.В.» appears once in the source and nowhere else.
  [/^Ս\. Վ\. Նիկիտին$/, "Ս. Ս. Նիկիտին"],

  // Capitalisation: Armenian does not title-case names of events/organisations.
  ["5-րդ Միջազգային բժշկական", "5-րդ միջազգային բժշկական"],
  ["«Գյումրու Օրթոպեդիկ Դպրոց»", "«Գյումրու օրթոպեդիկ դպրոց»"],

  // Official names as they appear in the source material.
  // The foundation's own name is «Eternal Nation (Foundation)»; «Հավերժ ազգ»
  // was a translation of the Russian page's «Вечная Нация».
  ["«Հավերժ ազգ» հիմնադրամի", "Eternal Nation հիմնադրամի"],
  // The source names it «институт здравоохранения» (առողջապահության), and
  // only the first word of an Armenian institution name is capitalised.
  ["Հայաստանի առողջության ազգային ինստիտուտի", "Հայաստանի առողջապահության ազգային ինստիտուտի"],
  [/Հայաստանի Առողջապահության ազգային ինստիտուտ/g, "Հայաստանի առողջապահության ազգային ինստիտուտ"],

  // English words in Armenian text (not accepted terms or abbreviations).
  ["այս դասընթացի chairman-ը կլինի", "այս դասընթացի նախագահը կլինի"],
  ["Դասընթացի chairman-ը՝", "Դասընթացի նախագահը՝"],
  ["Faculty-ի կազմում են նաև", "Դասախոսական կազմում են նաև"],
  ["Armen Hagopjanian-ի", "Արմեն Հակոբջանյանի"],
  ["Rasul Aliev", "Ռասուլ Ալիև"],
  ["Sahak Saribekyan", "Սահակ Սարիբեկյան"],
  ["Hrachya Harutyunyan", "Հրաչյա Հարությունյան"],
  ["Georgiy Nazaryan-ի", "Գեորգի Նազարյանի"],
  ["Georgiy Nazaryan", "Գեորգի Նազարյան"],
  ["Workshop և դեպքերի վերլուծություն", "Գործնական պարապմունք և դեպքերի վերլուծություն"],
  ["Ընդմիջում (Coffee Break)", "Սուրճի ընդմիջում"],
  [/ vs /g, " ընդդեմ "],
  [/ընդդեմ ջլային ավտոպլաստիկա$/, "ընդդեմ ջլային ավտոպլաստիկայի"],

  // Unambiguous time typos.
  ["13:10 – 13-40", "13:10 – 13:40"],
  [/^11:00([-–])11-20$/, "11:00$111:20"],
  ["17:35-17:35", "17:35-17:45"],

  // Letter salutations end with a comma, not a colon.
  [/^((?:Հարգելի|Սիրելի)[^։:]*):$/, "$1,"],

  // Punctuation.
  [/Խումբ (\d):/g, "Խումբ $1՝"],
  [/([Ա-և»)])\s?:(\s|$)/g, "$1։$2"],
  [/;(\s)/g, ",$1"],
  [/“([^”]*)”/g, "«$1»"],
  [/ +([։՝])/g, "$1"],
  [/եւ/g, "և"],
];

export function fixHy(text: string): string {
  let out = text;
  for (const [find, replace] of REPLACEMENTS) {
    out = typeof find === "string" ? out.split(find).join(replace) : out.replace(find, replace);
  }
  return out;
}

const FORM_LABELS = new Set([
  "Գրանցվել դասընթացին",
  "Ընտրեք դասընթացը",
  "Անուն",
  "Ազգանուն",
  "Տարիք",
  "Աշխատանքային ստաժ",
  "Հաստատության անվանումը, որտեղ աշխատում կամ սովորում եք",
  "Բնակության երկիրը",
  "Հեռախոս",
  "Էլ. փոստ",
  "կոնքազդրային հոդի էնդոպրոթեզավորում",
]);

/**
 * Whether a body block is a scrape leftover. `earlier` holds the normalised
 * text of the blocks kept so far in the same body, to catch exact repeats.
 */
export function isLeftover(text: string, index: number, earlier: Set<string>): string | null {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return null;
  if (earlier.has(t)) return "duplicate of an earlier block";
  if (FORM_LABELS.has(t)) return "registration form field";
  if (/^Համաձայնություն եմ տալիս անձնական տվյալների/.test(t)) return "registration form consent";
  if (/^Սեղմելով կոճակը՝ դուք համաձայնություն եք տալիս/.test(t)) return "registration form consent";
  if (/^ԳՐԱՆՑՈՒՄ «.*» ԴԱՍԸՆԹԱՑԻՆ$/.test(t)) return "registration form heading";
  if (/^Գրանցման ձեւը լրացնելուց/.test(t)) return "old-orthography duplicate of the fee paragraph";
  if (/^Գրանցումը բաց կլինի փետրվարի 10-ին ՝/.test(t)) return "old-orthography duplicate of the registration paragraph";
  if (t === "Դասընթացը հավաքված. Գրանցումը փակ է ։") return "duplicate of «Դասընթացը համալրված է…»";
  if (index > 0 && /^[A-ZԱ-Ֆ][A-ZԱ-Ֆ0-9 «»&-]+ \d{4}\s*(\/|դասախոսական|$)/.test(t)) return "page-header leftover";
  if ((t.match(/\([^()]+, [^()]+\)/g) ?? []).length > 5) return "list concatenated into one paragraph (repeated below)";
  return null;
}

/** "15:20 — 16:50" → [920, 1010] minutes, or null. */
function span(cell: string): [number, number] | null {
  const m = cell.match(/(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})/);
  return m ? [Number(m[1]) * 60 + Number(m[2]), Number(m[3]) * 60 + Number(m[4])] : null;
}

/**
 * Swaps two adjacent schedule rows only when the order is unambiguous: the
 * second row starts earlier and ends exactly where the first begins.
 */
export function fixRowOrder<T>(rows: T[], firstCell: (row: T) => string): { rows: T[]; swapped: string[] } {
  const out = [...rows];
  const swapped: string[] = [];
  for (let i = 0; i < out.length - 1; i++) {
    const a = span(firstCell(out[i]));
    const b = span(firstCell(out[i + 1]));
    if (a && b && b[0] < a[0] && b[1] === a[0]) {
      swapped.push(`${firstCell(out[i + 1])} ⇄ ${firstCell(out[i])}`);
      [out[i], out[i + 1]] = [out[i + 1], out[i]];
    }
  }
  return { rows: out, swapped };
}

/** Course descriptions were imported with a lowercase first letter. */
export function capitalise(text: string): string {
  return text.replace(/^([ա-և])/, (c) => c.toUpperCase());
}
