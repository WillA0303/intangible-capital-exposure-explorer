/**

Capital Efficiency Map

All analytics are simplified, illustrative and not investment advice.
*/

document.addEventListener("DOMContentLoaded", () => {
const appState = {
companies: [],
thresholds: {
roic: 10,
reinvest: 30
},
settings: {
showLabels: true,
colourByQuadrant: true,
highlightCompounders: true,
defaultCostOfCapital: 8
},
charts: {
mapChart: null
},
sort: {
column: null,
ascending: true
}
};

/**

Initialise the app
*/
function init() {
initTabs();
initEventListeners();
initCharts();
// Load some default example companies
loadExampleCompanies();
renderCompanyInputTable();
syncSettingsViewFromState();
handleRecalculate();
}

/**

Tabs
*/
function initTabs() {
const tabButtons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {

  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-tab-target");
    if (!targetId) return;
    tabButtons.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(targetId);
    if (panel) panel.classList.add("active");
  });
});


}

/**

Event listeners for inputs and buttons
*/
function initEventListeners() {
const quickBtn = document.getElementById("quickExamplesBtn");
const addCompanyBtn = document.getElementById("addCompanyBtn");
const recalcBtn = document.getElementById("recalculateBtn");

if (quickBtn) {

  quickBtn.addEventListener("click", () => {
    loadExampleCompanies();
    renderCompanyInputTable();
    handleRecalculate();
  });
}

if (addCompanyBtn) {
  addCompanyBtn.addEventListener("click", () => {
    addEmptyCompany();
    renderCompanyInputTable();
  });
}

if (recalcBtn) {
  recalcBtn.addEventListener("click", handleRecalculate);
}

// Settings sync
const settingsForm = document.getElementById("settingsForm");
if (settingsForm) {
  settingsForm.addEventListener("change", () => {
    collectThresholdsAndSettingsFromSettingsTab();
    syncThresholdInputsFromState();
    handleRecalculate();
  });
}

// Thresholds on left panel
const leftThresholdInputs = [
  document.getElementById("roicThresholdInput"),
  document.getElementById("reinvestThresholdInput"),
  document.getElementById("showLabelsInput"),
  document.getElementById("colourByQuadrantInput"),
  document.getElementById("highlightCompoundersInput")
];

leftThresholdInputs.forEach((el) => {
  if (!el) return;
  el.addEventListener("change", () => {
    collectThresholdsAndSettingsFromLeftPanel();
    syncSettingsViewFromState();
    handleRecalculate();
  });
});

// Sorting for table
const companyTableHead = document.querySelector("#companyTable thead");
if (companyTableHead) {
  companyTableHead.addEventListener("click", (e) => {
    const th = e.target.closest("th");
    if (!th) return;
    const sortKey = th.getAttribute("data-sort");
    if (!sortKey) return;
    handleSort(sortKey, th);
  });
}


}

/**

Initialise Chart.js scatter chart
*/
function initCharts() {
const ctx = document.getElementById("mapChart").getContext("2d");

appState.charts.mapChart = new Chart(ctx, {

  type: "scatter",
  data: {
    datasets: []
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Reinvestment rate (%)"
        },
        beginAtZero: true
      },
      y: {
        title: {
          display: true,
          text: "ROIC (%)"
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const dataPoint = ctx.raw;
            if (!dataPoint || !dataPoint.meta) return "";
            const m = dataPoint.meta;
            return [
              `${m.name} (${m.ticker || "no ticker"})`,
              `ROIC: ${m.roic.toFixed(1)}%`,
              `Reinvest: ${m.reinvest.toFixed(1)}%`,
              `Quadrant: ${m.quadrant}`,
              `Value score: ${m.score.toFixed(2)}`
            ];
          }
        }
      }
    }
  }
});


}

/**

Load some example companies into state
*/
function loadExampleCompanies() {
appState.companies = [
{
name: "Alpha plc",
ticker: "ALP",
roicPct: 22,
reinvestPct: 45,
growthPct: 12,
costOfCapitalPct: 8
},
{
name: "Beta Corp",
ticker: "BET",
roicPct: 18,
reinvestPct: 15,
growthPct: 5,
costOfCapitalPct: 7
},
{
name: "Gamma Holdings",
ticker: "GAM",
roicPct: 7,
reinvestPct: 10,
growthPct: 2,
costOfCapitalPct: 8
},
{
name: "Delta Industries",
ticker: "DEL",
roicPct: 6,
reinvestPct: 55,
growthPct: 8,
costOfCapitalPct: 9
},
{
name: "Epsilon Group",
ticker: "EPS",
roicPct: 30,
reinvestPct: 25,
growthPct: 10,
costOfCapitalPct: 8
}
];
}

/**

Add an empty company row to state
*/
function addEmptyCompany() {
appState.companies.push({
name: "",
ticker: "",
roicPct: null,
reinvestPct: null,
growthPct: null,
costOfCapitalPct: null
});
}

/**

Render the company input table from state
*/
function renderCompanyInputTable() {
const tbody = document.querySelector("#companyInputTable tbody");
if (!tbody) return;

tbody.innerHTML = "";

appState.companies.forEach((c, idx) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" data-field="name" data-index="${idx}" value="${c.name || ""}"></td>
    <td><input type="text" data-field="ticker" data-index="${idx}" value="${c.ticker || ""}"></td>
    <td><input type="number" step="0.1" data-field="roicPct" data-index="${idx}" value="${c.roicPct ?? ""}"></td>
    <td><input type="number" step="0.1" data-field="reinvestPct" data-index="${idx}" value="${c.reinvestPct ?? ""}"></td>
    <td><input type="number" step="0.1" data-field="growthPct" data-index="${idx}" value="${c.growthPct ?? ""}"></td>
    <td><input type="number" step="0.1" data-field="costOfCapitalPct" data-index="${idx}" value="${c.costOfCapitalPct ?? ""}"></td>
    <td><button type="button" class="remove-row-btn" data-index="${idx}">X</button></td>
  `;
  tbody.appendChild(tr);
});

// Attach listeners for inputs and remove buttons
tbody.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", handleCompanyInputChange);
});

tbody.querySelectorAll(".remove-row-btn").forEach((btn) => {
  btn.addEventListener("click", handleRemoveCompanyRow);
});


}

/**

Handle changes in company inputs (inline)
*/
function handleCompanyInputChange(e) {
const el = e.target;
const index = parseInt(el.getAttribute("data-index"), 10);
const field = el.getAttribute("data-field");
if (isNaN(index) || !field) return;

const value = el.value;

const company = appState.companies[index];
if (!company) return;

if (field === "name" || field === "ticker") {
  company[field] = value;
} else {
  const num = parseFloat(value);
  company[field] = isNaN(num) ? null : num;
}


}

/**

Remove a company row
*/
function handleRemoveCompanyRow(e) {
const idx = parseInt(e.target.getAttribute("data-index"), 10);
if (isNaN(idx)) return;
appState.companies.splice(idx, 1);
renderCompanyInputTable();
handleRecalculate();
}

/**

Collect company inputs from DOM into state just before calculations
*/
function collectCompanyInputs() {
const tbody = document.querySelector("#companyInputTable tbody");
if (!tbody) return;

const rows = tbody.querySelectorAll("tr");

const companies = [];

rows.forEach((row) => {
  const inputs = row.querySelectorAll("input[data-field]");
  const company = {
    name: "",
    ticker: "",
    roicPct: null,
    reinvestPct: null,
    growthPct: null,
    costOfCapitalPct: null
  };

  inputs.forEach((input) => {
    const field = input.getAttribute("data-field");
    let value = input.value;
    if (field === "name" || field === "ticker") {
      company[field] = value.trim();
    } else {
      const num = parseFloat(value);
      company[field] = isNaN(num) ? null : num;
    }
  });

  // Keep rows that have at least a name or some numeric content
  const hasContent =
    company.name ||
    company.ticker ||
    company.roicPct !== null ||
    company.reinvestPct !== null ||
    company.growthPct !== null;

  if (hasContent) {
    if (company.costOfCapitalPct === null) {
      company.costOfCapitalPct = appState.settings.defaultCostOfCapital;
    }
    companies.push(company);
  }
});

appState.companies = companies;


}

/**

Collect thresholds/settings from left panel
*/
function collectThresholdsAndSettingsFromLeftPanel() {
const getNumber = (id, fallback) => {
const el = document.getElementById(id);
if (!el) return fallback;
const val = parseFloat(el.value);
return isNaN(val) ? fallback : val;
};

appState.thresholds.roic = getNumber("roicThresholdInput", appState.thresholds.roic);

appState.thresholds.reinvest = getNumber("reinvestThresholdInput", appState.thresholds.reinvest);

const showLabels = document.getElementById("showLabelsInput");
const colourByQuad = document.getElementById("colourByQuadrantInput");
const highlightComp = document.getElementById("highlightCompoundersInput");

if (showLabels) appState.settings.showLabels = showLabels.checked;
if (colourByQuad) appState.settings.colourByQuadrant = colourByQuad.checked;
if (highlightComp) appState.settings.highlightCompounders = highlightComp.checked;


}

/**

Collect thresholds/settings from Settings tab
*/
function collectThresholdsAndSettingsFromSettingsTab() {
const getNumber = (id, fallback) => {
const el = document.getElementById(id);
if (!el) return fallback;
const val = parseFloat(el.value);
return isNaN(val) ? fallback : val;
};

appState.thresholds.roic = getNumber("settingsRoicThreshold", appState.thresholds.roic);

appState.thresholds.reinvest = getNumber(
  "settingsReinvestThreshold",
  appState.thresholds.reinvest
);

appState.settings.defaultCostOfCapital = getNumber(
  "defaultCoCInput",
  appState.settings.defaultCostOfCapital
);

const showLabels = document.getElementById("settingsShowLabels");
const colourByQuad = document.getElementById("settingsColourByQuadrant");
const highlightComp = document.getElementById("settingsHighlightCompounders");

if (showLabels) appState.settings.showLabels = showLabels.checked;
if (colourByQuad) appState.settings.colourByQuadrant = colourByQuad.checked;
if (highlightComp) appState.settings.highlightCompounders = highlightComp.checked;


}

/**

Keep Settings tab view in sync with state
*/
function syncSettingsViewFromState() {
const rTh = document.getElementById("settingsRoicThreshold");
const reinTh = document.getElementById("settingsReinvestThreshold");
const defaultCoC = document.getElementById("defaultCoCInput");
const showLabels = document.getElementById("settingsShowLabels");
const colourByQuad = document.getElementById("settingsColourByQuadrant");
const highlightComp = document.getElementById("settingsHighlightCompounders");

if (rTh) rTh.value = appState.thresholds.roic;

if (reinTh) reinTh.value = appState.thresholds.reinvest;
if (defaultCoC) defaultCoC.value = appState.settings.defaultCostOfCapital;
if (showLabels) showLabels.checked = appState.settings.showLabels;
if (colourByQuad) colourByQuad.checked = appState.settings.colourByQuadrant;
if (highlightComp) highlightComp.checked = appState.settings.highlightCompounders;


}

/**

Keep left panel threshold inputs in sync with state
*/
function syncThresholdInputsFromState() {
const rTh = document.getElementById("roicThresholdInput");
const reinTh = document.getElementById("reinvestThresholdInput");
const showLabels = document.getElementById("showLabelsInput");
const colourByQuad = document.getElementById("colourByQuadrantInput");
const highlightComp = document.getElementById("highlightCompoundersInput");

if (rTh) rTh.value = appState.thresholds.roic;

if (reinTh) reinTh.value = appState.thresholds.reinvest;
if (showLabels) showLabels.checked = appState.settings.showLabels;
if (colourByQuad) colourByQuad.checked = appState.settings.colourByQuadrant;
if (highlightComp) highlightComp.checked = appState.settings.highlightCompounders;


}

/**

Classify quadrant given ROIC and reinvestment
*/
function classifyQuadrant(roicPct, reinvestPct, thresholds) {
const rTh = thresholds.roic;
const reinTh = thresholds.reinvest;

if (roicPct >= rTh && reinvestPct >= reinTh) return "Compounder";

if (roicPct >= rTh && reinvestPct < reinTh) return "Cash generator";
if (roicPct < rTh && reinvestPct < reinTh) return "Mature stabiliser";
return "Value trap / capital burner";


}

/**

Compute toy 5-year capital scenario
*/
function computeToyScenarioForCompany(roicPct, reinvestPct) {
if (roicPct === null || reinvestPct === null) {
return {
capitalBase5: null,
cumulativeNopat5: null
};
}

let capitalBase = 100;

let cumulativeNopat = 0;

for (let i = 0; i < 5; i++) {
  const nopat = capitalBase * (roicPct / 100);
  cumulativeNopat += nopat;
  const reinvest = nopat * (reinvestPct / 100);
  capitalBase += reinvest;
}

return {
  capitalBase5: capitalBase,
  cumulativeNopat5: cumulativeNopat
};


}

/**

Compute derived metrics for all companies in state
*/
function computeDerivedMetricsForAllCompanies() {
appState.companies = appState.companies.map((c) => {
const roic = c.roicPct ?? 0;
const reinvest = c.reinvestPct ?? 0;
const costOfCapital =
c.costOfCapitalPct == null
? appState.settings.defaultCostOfCapital
: c.costOfCapitalPct;

const spread = roic - costOfCapital;
const score = spread * (reinvest / 100);

const quadrant = classifyQuadrant(roic, reinvest, appState.thresholds);

const toy = computeToyScenarioForCompany(roic, reinvest);

return {
...c,
roicPct: roic,
reinvestPct: reinvest,
costOfCapitalPct: costOfCapital,
spreadPct: spread,
valueScore: score,
quadrant,
capitalBase5: toy.capitalBase5,
cumulativeNopat5: toy.cumulativeNopat5
};
});
}

/**

Update map tab and chart
*/
function updateMapTab() {
const chart = appState.charts.mapChart;
if (!chart) return;

const points = [];

let maxX = 0;
let maxY = 0;

appState.companies.forEach((c) => {
  if (c.roicPct == null || c.reinvestPct == null) return;
  const x = c.reinvestPct;
  const y = c.roicPct;
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);

  const meta = {
    name: c.name || "Unnamed",
    ticker: c.ticker || "",
    roic: c.roicPct,
    reinvest: c.reinvestPct,
    quadrant: c.quadrant,
    score: c.valueScore ?? 0
  };

  points.push({
    x,
    y,
    meta
  });
});

const thresholdX = appState.thresholds.reinvest;
const thresholdY = appState.thresholds.roic;

// Colouring logic by quadrant
function colorForQuadrant(quadrant) {
  if (!appState.settings.colourByQuadrant) return "rgba(37, 99, 235, 0.8)";
  switch (quadrant) {
    case "Compounder":
      return "rgba(22, 163, 74, 0.9)";
    case "Cash generator":
      return "rgba(14, 165, 233, 0.9)";
    case "Mature stabiliser":
      return "rgba(156, 163, 175, 0.9)";
    case "Value trap / capital burner":
      return "rgba(249, 115, 22, 0.9)";
    default:
      return "rgba(37, 99, 235, 0.8)";
  }
}

const dataPoints = points.map((p) => {
  const baseRadius = 5;
  const isCompounder = p.meta.quadrant === "Compounder";
  const radius =
    appState.settings.highlightCompounders && isCompounder
      ? baseRadius + 2
      : baseRadius;

  return {
    x: p.x,
    y: p.y,
    meta: p.meta,
    backgroundColor: colorForQuadrant(p.meta.quadrant),
    radius
  };
});

// Vertical and horizontal threshold lines
const lineMaxX = Math.max(maxX, thresholdX * 1.2, 10);
const lineMaxY = Math.max(maxY, thresholdY * 1.2, 10);

const verticalLine = [
  { x: thresholdX, y: 0 },
  { x: thresholdX, y: lineMaxY }
];
const horizontalLine = [
  { x: 0, y: thresholdY },
  { x: lineMaxX, y: thresholdY }
];

chart.data.datasets = [
  {
    type: "scatter",
    data: dataPoints,
    parsing: false,
    pointBackgroundColor: dataPoints.map((d) => d.backgroundColor),
    pointRadius: dataPoints.map((d) => d.radius)
  },
  {
    type: "line",
    data: verticalLine,
    borderColor: "rgba(148, 163, 184, 0.8)",
    borderWidth: 1,
    pointRadius: 0,
    borderDash: [4, 4]
  },
  {
    type: "line",
    data: horizontalLine,
    borderColor: "rgba(148, 163, 184, 0.8)",
    borderWidth: 1,
    pointRadius: 0,
    borderDash: [4, 4]
  }
];

chart.options.scales.x.max = lineMaxX;
chart.options.scales.y.max = lineMaxY;

chart.options.plugins.legend.display = false;
chart.options.plugins.tooltip.enabled = true;

chart.update();

// Summary text
const mapSummary = document.getElementById("mapSummary");
if (mapSummary) {
  const counts = countQuadrants();
  mapSummary.innerHTML = `
    <p>Companies on map: <strong>${appState.companies.length}</strong></p>
    <p>
      Compounders: <strong>${counts.compounders}</strong>,
      Cash generators: <strong>${counts.cashGenerators}</strong>,
      Mature stabilisers: <strong>${counts.stabilisers}</strong>,
      Value traps / capital burners: <strong>${counts.valueTraps}</strong>.
    </p>
    <p>
      Thresholds: ROIC ≥ ${appState.thresholds.roic.toFixed(
        1
      )}% and reinvestment ≥ ${appState.thresholds.reinvest.toFixed(
    1
  )}% define the "high" quadrant boundaries.
    </p>
  `;
}


}

/**

Count companies per quadrant
*/
function countQuadrants() {
let compounders = 0;
let cashGenerators = 0;
let stabilisers = 0;
let valueTraps = 0;

appState.companies.forEach((c) => {

  switch (c.quadrant) {
    case "Compounder":
      compounders++;
      break;
    case "Cash generator":
      cashGenerators++;
      break;
    case "Mature stabiliser":
      stabilisers++;
      break;
    case "Value trap / capital burner":
      valueTraps++;
      break;
  }
});

return { compounders, cashGenerators, stabilisers, valueTraps };


}

/**

Update table tab
*/
function updateTableTab() {
const tbody = document.querySelector("#companyTable tbody");
if (!tbody) return;

tbody.innerHTML = "";

appState.companies.forEach((c) => {
  const tr = document.createElement("tr");

  let rowClass = "";
  if (c.quadrant === "Compounder") rowClass = "row-compounder";
  else if (c.quadrant === "Cash generator") rowClass = "row-cash-generator";
  else if (c.quadrant === "Mature stabiliser") rowClass = "row-stabiliser";
  else if (c.quadrant === "Value trap / capital burner")
    rowClass = "row-value-trap";

  tr.className = rowClass;

  tr.innerHTML = `
    <td>${c.name || ""}</td>
    <td>${c.ticker || ""}</td>
    <td>${formatNumber(c.roicPct, 1)}</td>
    <td>${formatNumber(c.reinvestPct, 1)}</td>
    <td>${formatNumber(c.costOfCapitalPct, 1)}</td>
    <td>${formatNumber(c.spreadPct, 1)}</td>
    <td>${formatNumber(c.valueScore, 2)}</td>
    <td>${c.quadrant || ""}</td>
    <td>${c.capitalBase5 != null ? formatNumber(c.capitalBase5, 1) : ""}</td>
  `;
  tbody.appendChild(tr);
});


}

/**

Update quadrants tab
*/
function updateQuadrantsTab() {
const cards = {
Compounder: document.getElementById("quadrant-compounders"),
"Cash generator": document.getElementById("quadrant-cash-generators"),
"Mature stabiliser": document.getElementById("quadrant-stabilisers"),
"Value trap / capital burner": document.getElementById("quadrant-value-traps")
};

const buckets = {

  Compounder: [],
  "Cash generator": [],
  "Mature stabiliser": [],
  "Value trap / capital burner": []
};

appState.companies.forEach((c) => {
  if (buckets[c.quadrant]) buckets[c.quadrant].push(c);
});

const descriptions = {
  Compounder:
    "High ROIC and high reinvestment. Potential long-term value compounders if sustained.",
  "Cash generator":
    "High ROIC but low reinvestment. Often strong cash producers with limited reinvestment.",
  "Mature stabiliser":
    "Lower ROIC and lower reinvestment. Often more mature or defensive profiles.",
  "Value trap / capital burner":
    "Low ROIC but high reinvestment. Growth that risks destroying value if ROIC stays low."
};

let bestQuadrant = null;
let bestQuadrantScore = -Infinity;
let bestCompany = null;

Object.keys(buckets).forEach((q) => {
  const list = buckets[q];
  const card = cards[q];
  if (!card) return;

  if (list.length === 0) {
    card.innerHTML = `
      <h3>${q}</h3>
      <p>${descriptions[q]}</p>
      <p>No companies in this quadrant.</p>
    `;
    return;
  }

  const avgRoic =
    list.reduce((acc, c) => acc + (c.roicPct || 0), 0) / list.length;
  const avgReinv =
    list.reduce((acc, c) => acc + (c.reinvestPct || 0), 0) / list.length;
  const avgScore =
    list.reduce((acc, c) => acc + (c.valueScore || 0), 0) / list.length;

  // Determine best quadrant by avg score
  if (avgScore > bestQuadrantScore) {
    bestQuadrantScore = avgScore;
    bestQuadrant = q;
  }

  // Top 3 by valueScore
  const top3 = [...list]
    .sort((a, b) => (b.valueScore || 0) - (a.valueScore || 0))
    .slice(0, 3);

  if (!bestCompany || (top3[0] && top3[0].valueScore > bestCompany.valueScore))
    bestCompany = top3[0] || bestCompany;

  const topListHtml =
    top3.length > 0
      ? `<ul>${top3
          .map(
            (c) =>
              `<li>${c.name || "Unnamed"} (${formatNumber(
                c.valueScore,
                2
              )})</li>`
          )
          .join("")}</ul>`
      : "<p>No companies with scores in this quadrant.</p>";

  card.innerHTML = `
    <h3>${q}</h3>
    <p>${descriptions[q]}</p>
    <p><strong>Count:</strong> ${list.length}</p>
    <p><strong>Average ROIC:</strong> ${formatNumber(avgRoic, 1)}%</p>
    <p><strong>Average reinvestment:</strong> ${formatNumber(avgReinv, 1)}%</p>
    <p><strong>Average value score:</strong> ${formatNumber(avgScore, 2)}</p>
    <p><strong>Top companies by score:</strong></p>
    ${topListHtml}
  `;
});

const summaryEl = document.getElementById("quadrantSummaryText");
if (summaryEl) {
  if (!bestQuadrant || !bestCompany) {
    summaryEl.innerHTML = `
      <p>Once you add companies with ROIC and reinvestment data, this tab will summarise which quadrant appears most value-creative based on your inputs.</p>
    `;
  } else {
    summaryEl.innerHTML = `
      <p>For these thresholds, the highest average value creation score currently comes from the <strong>${bestQuadrant}</strong> quadrant, with an average score of <strong>${formatNumber(
      bestQuadrantScore,
      2
    )}</strong>.</p>
      <p>Your strongest individual company by this metric is <strong>${
        bestCompany.name || "Unnamed"
      }</strong> with a score of <strong>${formatNumber(
      bestCompany.valueScore,
      2
    )}</strong>, given its ROIC, reinvestment rate, and cost of capital assumptions.</p>
    `;
  }
}


}

/**

Format number to fixed decimals, handling null
*/
function formatNumber(val, decimals) {
if (val == null || isNaN(val)) return "";
return Number(val).toFixed(decimals);
}

/**

Handle table sorting
*/
function handleSort(column, headerEl) {
if (appState.sort.column === column) {
appState.sort.ascending = !appState.sort.ascending;
} else {
appState.sort.column = column;
appState.sort.ascending = true;
}

const dir = appState.sort.ascending ? 1 : -1;

appState.companies.sort((a, b) => {
  const av = getSortValue(a, column);
  const bv = getSortValue(b, column);

  if (typeof av === "string" || typeof bv === "string") {
    return av.localeCompare(bv) * dir;
  }
  return (av - bv) * dir;
});

// Update header classes
document.querySelectorAll("#companyTable th[data-sort]").forEach((th) => {
  th.classList.remove("sorted-asc", "sorted-desc");
});
if (headerEl) {
  headerEl.classList.add(appState.sort.ascending ? "sorted-asc" : "sorted-desc");
}

updateTableTab();


}

/**

Get value used for sorting for a company and column
*/
function getSortValue(c, column) {
switch (column) {
case "name":
return c.name || "";
case "ticker":
return c.ticker || "";
case "roic":
return c.roicPct ?? 0;
case "reinvest":
return c.reinvestPct ?? 0;
case "costOfCapital":
return c.costOfCapitalPct ?? appState.settings.defaultCostOfCapital;
case "spread":
return c.spreadPct ?? 0;
case "score":
return c.valueScore ?? 0;
case "quadrant":
return c.quadrant || "";
case "capitalBase5":
return c.capitalBase5 ?? 0;
default:
return 0;
}
}

/**

Main recalculation pipeline
*/
function handleRecalculate() {
// Collect latest input state
collectCompanyInputs();
collectThresholdsAndSettingsFromLeftPanel();
syncSettingsViewFromState();

// Compute derived metrics

computeDerivedMetricsForAllCompanies();

// Update all output views
updateMapTab();
updateTableTab();
updateQuadrantsTab();


}

// Start app
init();
});