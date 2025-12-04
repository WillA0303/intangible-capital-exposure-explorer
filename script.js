/**

Intangible Capital Exposure Explorer

Static, illustrative dataset. Not investment advice.
*/

document.addEventListener("DOMContentLoaded", () => {
// -----------------------------
// Configuration and dataset
// -----------------------------

const EXPOSURE_TIERS = {
lowMax: 33,
mediumMax: 66
};

const ALL_REGIONS = ["US", "Europe", "Asia", "Other"];
const ALL_SECTORS = [
"Technology",
"Consumer",
"Financials",
"Healthcare",
"Industrial",
"Luxury",
"Other"
];

/**

Base illustrative dataset of large global companies.

Values are deliberately approximate and static.
*/
const BASE_DATASET = [
{
id: "aapl",
name: "Apple Inc",
ticker: "AAPL",
region: "US",
country: "United States",
sector: "Technology",
marketCapUsdBn: 2800,
intangibleAssetsPct: 25,
goodwillPct: 5,
rndPctSales: 7,
marketingPctSales: 6,
softwareServicesTilt: 80,
notes: "Consumer hardware and services ecosystem with strong brand and software integration."
},
{
id: "msft",
name: "Microsoft Corp",
ticker: "MSFT",
region: "US",
country: "United States",
sector: "Technology",
marketCapUsdBn: 2700,
intangibleAssetsPct: 32,
goodwillPct: 10,
rndPctSales: 13,
marketingPctSales: 5,
softwareServicesTilt: 95,
notes: "Enterprise software, cloud and productivity platforms with high software and subscription exposure."
},
{
id: "googl",
name: "Alphabet Inc",
ticker: "GOOGL",
region: "US",
country: "United States",
sector: "Technology",
marketCapUsdBn: 1900,
intangibleAssetsPct: 28,
goodwillPct: 6,
rndPctSales: 15,
marketingPctSales: 8,
softwareServicesTilt: 95,
notes: "Search, advertising and cloud platforms built around data and software."
},
{
id: "meta",
name: "Meta Platforms",
ticker: "META",
region: "US",
country: "United States",
sector: "Technology",
marketCapUsdBn: 1100,
intangibleAssetsPct: 20,
goodwillPct: 8,
rndPctSales: 21,
marketingPctSales: 14,
softwareServicesTilt: 98,
notes: "Social platforms and advertising network with very high R&D intensity."
},
{
id: "amzn",
name: "Amazon.com",
ticker: "AMZN",
region: "US",
country: "United States",
sector: "Consumer",
marketCapUsdBn: 1800,
intangibleAssetsPct: 23,
goodwillPct: 10,
rndPctSales: 11,
marketingPctSales: 4,
softwareServicesTilt: 70,
notes: "E-commerce, logistics and cloud; mix of physical infrastructure and software."
},
{
id: "nvda",
name: "NVIDIA Corp",
ticker: "NVDA",
region: "US",
country: "United States",
sector: "Technology",
marketCapUsdBn: 2300,
intangibleAssetsPct: 30,
goodwillPct: 7,
rndPctSales: 19,
marketingPctSales: 3,
softwareServicesTilt: 75,
notes: "Semiconductor design with heavy R&D investment and licensing."
},
{
id: "tsla",
name: "Tesla Inc",
ticker: "TSLA",
region: "US",
country: "United States",
sector: "Consumer",
marketCapUsdBn: 800,
intangibleAssetsPct: 15,
goodwillPct: 2,
rndPctSales: 5,
marketingPctSales: 3,
softwareServicesTilt: 55,
notes: "Electric vehicles and energy with mix of manufacturing and software-like features."
},
{
id: "asml",
name: "ASML Holding",
ticker: "ASML",
region: "Europe",
country: "Netherlands",
sector: "Industrial",
marketCapUsdBn: 400,
intangibleAssetsPct: 35,
goodwillPct: 6,
rndPctSales: 15,
marketingPctSales: 2,
softwareServicesTilt: 60,
notes: "Highly concentrated intellectual property in semiconductor lithography."
},
{
id: "sap",
name: "SAP SE",
ticker: "SAP",
region: "Europe",
country: "Germany",
sector: "Technology",
marketCapUsdBn: 200,
intangibleAssetsPct: 40,
goodwillPct: 15,
rndPctSales: 13,
marketingPctSales: 7,
softwareServicesTilt: 90,
notes: "Enterprise software and cloud-based ERP with large software asset base."
},
{
id: "lvmh",
name: "LVMH",
ticker: "MC",
region: "Europe",
country: "France",
sector: "Luxury",
marketCapUsdBn: 450,
intangibleAssetsPct: 55,
goodwillPct: 20,
rndPctSales: 3,
marketingPctSales: 14,
softwareServicesTilt: 20,
notes: "Global luxury brands where economic value is driven by brand equity and design."
},
{
id: "ulvr",
name: "Unilever",
ticker: "ULVR",
region: "Europe",
country: "United Kingdom",
sector: "Consumer",
marketCapUsdBn: 120,
intangibleAssetsPct: 40,
goodwillPct: 18,
rndPctSales: 2,
marketingPctSales: 12,
softwareServicesTilt: 10,
notes: "Consumer brands business with significant marketing-driven intangible spend."
},
{
id: "ko",
name: "Coca-Cola",
ticker: "KO",
region: "US",
country: "United States",
sector: "Consumer",
marketCapUsdBn: 260,
intangibleAssetsPct: 60,
goodwillPct: 25,
rndPctSales: 1,
marketingPctSales: 15,
softwareServicesTilt: 5,
notes: "Beverage brands with very high brand and distribution value relative to physical assets."
},
{
id: "nsee",
name: "Nestlé",
ticker: "NESN",
region: "Europe",
country: "Switzerland",
sector: "Consumer",
marketCapUsdBn: 300,
intangibleAssetsPct: 45,
goodwillPct: 18,
rndPctSales: 1,
marketingPctSales: 10,
softwareServicesTilt: 5,
notes: "Global food brands with brand and distribution heavy asset base."
},
{
id: "jpm",
name: "JPMorgan Chase",
ticker: "JPM",
region: "US",
country: "United States",
sector: "Financials",
marketCapUsdBn: 500,
intangibleAssetsPct: 12,
goodwillPct: 5,
rndPctSales: 0,
marketingPctSales: 4,
softwareServicesTilt: 40,
notes: "Universal bank with significant technology and data spend but regulated balance sheet."
},
{
id: "visa",
name: "Visa Inc",
ticker: "V",
region: "US",
country: "United States",
sector: "Financials",
marketCapUsdBn: 500,
intangibleAssetsPct: 45,
goodwillPct: 12,
rndPctSales: 2,
marketingPctSales: 7,
softwareServicesTilt: 90,
notes: "Global payments network where value sits in network effects, software and brand."
},
{
id: "tcehy",
name: "Tencent Holdings",
ticker: "TCEHY",
region: "Asia",
country: "China",
sector: "Technology",
marketCapUsdBn: 350,
intangibleAssetsPct: 38,
goodwillPct: 12,
rndPctSales: 11,
marketingPctSales: 9,
softwareServicesTilt: 95,
notes: "Social media, gaming and fintech platforms with high software and content exposure."
},
{
id: "baba",
name: "Alibaba Group",
ticker: "BABA",
region: "Asia",
country: "China",
sector: "Consumer",
marketCapUsdBn: 190,
intangibleAssetsPct: 30,
goodwillPct: 10,
rndPctSales: 8,
marketingPctSales: 6,
softwareServicesTilt: 80,
notes: "E-commerce, cloud and digital services with a mix of logistics and platform economics."
},
{
id: "toyota",
name: "Toyota Motor",
ticker: "TM",
region: "Asia",
country: "Japan",
sector: "Industrial",
marketCapUsdBn: 250,
intangibleAssetsPct: 12,
goodwillPct: 3,
rndPctSales: 4,
marketingPctSales: 3,
softwareServicesTilt: 25,
notes: "Auto manufacturing with meaningful but not dominant intangible content."
},
{
id: "roche",
name: "Roche Holding",
ticker: "ROG",
region: "Europe",
country: "Switzerland",
sector: "Healthcare",
marketCapUsdBn: 220,
intangibleAssetsPct: 35,
goodwillPct: 15,
rndPctSales: 18,
marketingPctSales: 5,
softwareServicesTilt: 40,
notes: "Pharmaceuticals and diagnostics with high R&D intensity and patent-driven value."
},
{
id: "pfe",
name: "Pfizer Inc",
ticker: "PFE",
region: "US",
country: "United States",
sector: "Healthcare",
marketCapUsdBn: 150,
intangibleAssetsPct: 30,
goodwillPct: 16,
rndPctSales: 14,
marketingPctSales: 6,
softwareServicesTilt: 35,
notes: "Global pharma with patent and R&D driven intangible asset base."
}
];

// -----------------------------
// App state
// -----------------------------

const appState = {
baseDataset: [],
companiesWithMetrics: [],
filteredCompanies: [],
filters: {
regionsSelected: [...ALL_REGIONS],
sectorsSelected: [...ALL_SECTORS],
exposureMin: 0,
exposureMax: 100,
quickExposure: "all",
sizeFilter: "all" // "all" | "top10" | "top20"
},
sort: {
column: null,
ascending: true
},
activeCompanyId: null,
charts: {
tierBarChart: null,
intangibleScatterChart: null,
profileBarChart: null,
profileScoreChart: null
}
};

// -----------------------------
// Initialisation
// -----------------------------

function initApp() {
appState.baseDataset = BASE_DATASET.map((c) => ({ ...c }));
computeDerivedMetricsForAllCompanies();
initTabs();
initEventListeners();
initCharts();
applyFilters();
}

// -----------------------------
// Derived metrics and scoring
// -----------------------------

/**

Compute intangible exposure score and tier for each company.
*/
function computeDerivedMetricsForAllCompanies() {
appState.companiesWithMetrics = appState.baseDataset.map((c) => {
const intangibleAssetsPct = clampNumber(c.intangibleAssetsPct, 0, 100);
const rndPctSales = Math.max(0, c.rndPctSales);
const marketingPctSales = Math.max(0, c.marketingPctSales);
const softwareServicesTilt = clampNumber(c.softwareServicesTilt, 0, 100);

const normalisedIntangibleAssets = intangibleAssetsPct / 100;
const investSum = rndPctSales + marketingPctSales;
const normalisedInvestPct = Math.min(investSum / 40, 1); // cap at 1
const normalisedSoftware = softwareServicesTilt / 100;

const rawScore =
0.4 * normalisedIntangibleAssets +
0.35 * normalisedInvestPct +
0.25 * normalisedSoftware;

const exposureScore = clampNumber(rawScore * 100, 0, 100);

let exposureTier = "Medium intangible";
if (exposureScore <= EXPOSURE_TIERS.lowMax) {
exposureTier = "Low intangible";
} else if (exposureScore > EXPOSURE_TIERS.mediumMax) {
exposureTier = "High intangible";
}

return {
...c,
intangibleAssetsPct,
rndPctSales,
marketingPctSales,
softwareServicesTilt,
exposureScore,
exposureTier
};
});
}

// -----------------------------
// Tabs
// -----------------------------

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

// -----------------------------
// Event listeners
// -----------------------------

function initEventListeners() {
const applyBtn = document.getElementById("applyFiltersBtn");
if (applyBtn) {
applyBtn.addEventListener("click", () => {
readFiltersFromControls();
applyFilters();
});
}

// Table sorting
const tableHead = document.querySelector("#intangibleTable thead");
if (tableHead) {
  tableHead.addEventListener("click", (e) => {
    const th = e.target.closest("th");
    if (!th) return;
    const sortKey = th.getAttribute("data-sort");
    if (!sortKey) return;
    handleTableSort(sortKey, th);
  });
}

// Table row click -> profile
const tableBody = document.querySelector("#intangibleTable tbody");
if (tableBody) {
  tableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-id]");
    if (!row) return;
    const id = row.getAttribute("data-id");
    setActiveCompany(id);
  });
}

// Profiles dropdown
const profileSelect = document.getElementById("profileCompanySelect");
if (profileSelect) {
  profileSelect.addEventListener("change", () => {
    const id = profileSelect.value || null;
    setActiveCompany(id);
  });
}


}

// -----------------------------
// Filters
// -----------------------------

function readFiltersFromControls() {
// Regions
const regionCheckboxes = document.querySelectorAll(".region-filter");
let regionsSelected = [];
regionCheckboxes.forEach((cb) => {
if (cb.checked) regionsSelected.push(cb.value);
});
if (regionsSelected.length === 0) {
regionsSelected = [...ALL_REGIONS];
}

// Sectors
const sectorCheckboxes = document.querySelectorAll(".sector-filter");
let sectorsSelected = [];
sectorCheckboxes.forEach((cb) => {
  if (cb.checked) sectorsSelected.push(cb.value);
});
if (sectorsSelected.length === 0) {
  sectorsSelected = [...ALL_SECTORS];
}

// Exposure min/max
const minInput = document.getElementById("exposureMinInput");
const maxInput = document.getElementById("exposureMaxInput");
let minVal = parseFloat(minInput?.value ?? "0");
let maxVal = parseFloat(maxInput?.value ?? "100");

if (isNaN(minVal)) minVal = 0;
if (isNaN(maxVal)) maxVal = 100;
minVal = clampNumber(minVal, 0, 100);
maxVal = clampNumber(maxVal, 0, 100);
if (minVal > maxVal) {
  const temp = minVal;
  minVal = maxVal;
  maxVal = temp;
}

// Quick exposure filter
const quickSelect = document.getElementById("exposureQuickSelect");
const quickValue = quickSelect ? quickSelect.value : "all";

// Size filter
const sizeSelect = document.getElementById("sizeFilterSelect");
const sizeFilter = sizeSelect ? sizeSelect.value : "all";

// Apply quick filter overrides
if (quickValue === "high") {
  minVal = EXPOSURE_TIERS.mediumMax + 1;
  maxVal = 100;
} else if (quickValue === "low") {
  minVal = 0;
  maxVal = EXPOSURE_TIERS.lowMax;
}

// Write back clamped values to inputs for consistency
if (minInput) minInput.value = minVal;
if (maxInput) maxInput.value = maxVal;

appState.filters = {
  regionsSelected,
  sectorsSelected,
  exposureMin: minVal,
  exposureMax: maxVal,
  quickExposure: quickValue,
  sizeFilter
};


}

function applyFilters() {
// Start from companies with metrics
let list = [...appState.companiesWithMetrics];

const { regionsSelected, sectorsSelected, exposureMin, exposureMax } =
  appState.filters;

list = list.filter((c) => regionsSelected.includes(c.region));
list = list.filter((c) => sectorsSelected.includes(c.sector));
list = list.filter(
  (c) => c.exposureScore >= exposureMin && c.exposureScore <= exposureMax
);

// Sort by market cap descending for size filters
list.sort((a, b) => b.marketCapUsdBn - a.marketCapUsdBn);

// Apply size filter
if (appState.filters.sizeFilter === "top10") {
  list = list.slice(0, 10);
} else if (appState.filters.sizeFilter === "top20") {
  list = list.slice(0, 20);
}

appState.filteredCompanies = list;

// Reset active company if needed
if (
  !appState.activeCompanyId ||
  !appState.filteredCompanies.some((c) => c.id === appState.activeCompanyId)
) {
  appState.activeCompanyId =
    appState.filteredCompanies.length > 0
      ? appState.filteredCompanies[0].id
      : null;
}

// After filtering, update UI
updateOverviewTab();
updateScatterTab();
updateTableTab();
updateProfilesTab();


}

// -----------------------------
// Charts init
// -----------------------------

function initCharts() {
const tierCtx = document.getElementById("tierBarChart")?.getContext("2d");
if (tierCtx) {
appState.charts.tierBarChart = new Chart(tierCtx, {
  type: "bar",
  data: {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Companies",
        data: [0, 0, 0],
        backgroundColor: ["#6ee7b7", "#93c5fd", "#d8b4fe"]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,   // changed from false
    aspectRatio: 3,              // optional: wide, low chart (3:1)
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});

}

const scatterCtx =
  document.getElementById("intangibleScatterChart")?.getContext("2d");
if (scatterCtx) {
  appState.charts.intangibleScatterChart = new Chart(scatterCtx, {
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
            text: "Intangible assets (% of total assets)"
          },
          beginAtZero: true
        },
        y: {
          title: {
            display: true,
            text: "Intangible investment (% of sales: R&D + marketing)"
          },
          beginAtZero: true
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const d = ctx.raw;
              if (!d || !d.meta) return "";
              const m = d.meta;
              const invest = m.rndPctSales + m.marketingPctSales;
              return [
                `${m.name} (${m.ticker})`,
                `${m.region}, ${m.sector}`,
                `Intangibles: ${m.intangibleAssetsPct.toFixed(1)}%`,
                `R&D + marketing: ${invest.toFixed(1)}% of sales`,
                `Exposure score: ${m.exposureScore.toFixed(
                  1
                )} (${m.exposureTier})`,
                `Market cap: $${m.marketCapUsdBn.toFixed(0)}bn`
              ];
            }
          }
        }
      }
    }
  });
}

const profileBarCtx =
  document.getElementById("profileBarChart")?.getContext("2d");
if (profileBarCtx) {
  appState.charts.profileBarChart = new Chart(profileBarCtx, {
    type: "bar",
    data: {
      labels: [
        "Intangibles % assets",
        "Goodwill % assets",
        "R&D % sales",
        "Marketing % sales"
      ],
      datasets: [
        {
          label: "Value",
          data: [0, 0, 0, 0],
          backgroundColor: ["#4f46e5"]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

const profileScoreCtx =
  document.getElementById("profileScoreChart")?.getContext("2d");
if (profileScoreCtx) {
  appState.charts.profileScoreChart = new Chart(profileScoreCtx, {
    type: "bar",
    data: {
      labels: ["Exposure score"],
      datasets: [
        {
          label: "Score",
          data: [0],
          backgroundColor: ["#7c3aed"]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}


}

// -----------------------------
// Overview tab
// -----------------------------

function updateOverviewTab() {
const summaryEl = document.getElementById("overviewSummary");
const tierChart = appState.charts.tierBarChart;

const list = appState.filteredCompanies;
const count = list.length;

if (!summaryEl) return;

if (count === 0) {
  summaryEl.innerHTML =
    "<p>No companies match the current filters. Adjust filters on the left to restore the universe.</p>";
  if (tierChart) {
    tierChart.data.datasets[0].data = [0, 0, 0];
    tierChart.update();
  }
  return;
}

// Weighted averages (by market cap)
let totalMktCap = 0;
let weightedExposure = 0;
let weightedIntangibles = 0;
let weightedRnd = 0;
let weightedMkt = 0;

let lowCount = 0;
let medCount = 0;
let highCount = 0;

list.forEach((c) => {
  const w = c.marketCapUsdBn;
  totalMktCap += w;
  weightedExposure += c.exposureScore * w;
  weightedIntangibles += c.intangibleAssetsPct * w;
  weightedRnd += c.rndPctSales * w;
  weightedMkt += c.marketingPctSales * w;

  if (c.exposureTier === "Low intangible") lowCount++;
  else if (c.exposureTier === "Medium intangible") medCount++;
  else if (c.exposureTier === "High intangible") highCount++;
});

const avgExposure = totalMktCap ? weightedExposure / totalMktCap : 0;
const avgIntangibles = totalMktCap ? weightedIntangibles / totalMktCap : 0;
const avgRnd = totalMktCap ? weightedRnd / totalMktCap : 0;
const avgMkt = totalMktCap ? weightedMkt / totalMktCap : 0;

summaryEl.innerHTML = `
  <p>You are currently looking at <strong>${count}</strong> companies.</p>
  <p>
    Market-cap-weighted intangible exposure score: <strong>${avgExposure.toFixed(
      1
    )}</strong> on a 0-100 scale.
  </p>
  <p>
    Average intangibles are about <strong>${avgIntangibles.toFixed(
      1
    )}%</strong> of assets, with R&D spend around
    <strong>${avgRnd.toFixed(1)}%</strong> of sales and marketing spend around
    <strong>${avgMkt.toFixed(1)}%</strong> of sales.
  </p>
  <p>
    Distribution by tier: Low intangible <strong>${lowCount}</strong>,
    Medium intangible <strong>${medCount}</strong>, High intangible
    <strong>${highCount}</strong>.
  </p>
`;

if (tierChart) {
  tierChart.data.datasets[0].data = [lowCount, medCount, highCount];
  tierChart.update();
}


}

// -----------------------------
// Scatter tab
// -----------------------------

function updateScatterTab() {
const scatterChart = appState.charts.intangibleScatterChart;
const scatterSummary = document.getElementById("scatterSummary");
const list = appState.filteredCompanies;

if (!scatterChart || !scatterSummary) return;

if (list.length === 0) {
  scatterChart.data.datasets = [];
  scatterChart.update();
  scatterSummary.innerHTML =
    "<p>No companies to display. Adjust filters to restore the universe.</p>";
  return;
}

const maxMktCap = Math.max(...list.map((c) => c.marketCapUsdBn));
const minPointSize = 4;
const maxPointSize = 18;

function sizeForCap(mktCap) {
  if (!maxMktCap) return minPointSize;
  const ratio = mktCap / maxMktCap;
  return minPointSize + ratio * (maxPointSize - minPointSize);
}

function colorForTier(tier) {
  if (tier === "High intangible") return "rgba(124, 58, 237, 0.9)";
  if (tier === "Medium intangible") return "rgba(59, 130, 246, 0.9)";
  return "rgba(16, 185, 129, 0.9)";
}

const points = list.map((c) => {
  const investPct = c.rndPctSales + c.marketingPctSales;
  return {
    x: c.intangibleAssetsPct,
    y: investPct,
    meta: c,
    pointRadius: sizeForCap(c.marketCapUsdBn),
    pointBackgroundColor: colorForTier(c.exposureTier)
  };
});

scatterChart.data.datasets = [
  {
    type: "scatter",
    data: points,
    parsing: false,
    pointRadius: points.map((p) => p.pointRadius),
    pointBackgroundColor: points.map((p) => p.pointBackgroundColor)
  }
];
scatterChart.update();

// Summary text: count of high-high and top 2 by exposure score
const highAssetsThreshold = 40;
const highInvestThreshold = 15;

const highHigh = list.filter(
  (c) =>
    c.intangibleAssetsPct >= highAssetsThreshold &&
    c.rndPctSales + c.marketingPctSales >= highInvestThreshold
);

const topByExposure = [...list]
  .sort((a, b) => b.exposureScore - a.exposureScore)
  .slice(0, 2);

const names = topByExposure.map((c) => c.name).join(", ");

scatterSummary.innerHTML = `
  <p>
    The scatter plot maps accounting intangibles on the horizontal axis against R&D plus marketing intensity on the vertical axis.
  </p>
  <p>
    There are <strong>${highHigh.length}</strong> companies in the "high intangibles and high investment" corner
    (roughly &gt;= ${highAssetsThreshold}% of assets and &gt;= ${highInvestThreshold}% of sales).
  </p>
  <p>
    The highest intangible exposure scores in the current universe include: <strong>${names ||
      "n/a"}</strong>.
  </p>
`;


}

// -----------------------------
// Table tab
// -----------------------------

function updateTableTab() {
const tbody = document.querySelector("#intangibleTable tbody");
if (!tbody) return;

tbody.innerHTML = "";

const list = appState.filteredCompanies;

if (list.length === 0) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 11;
  cell.textContent = "No companies match the current filters.";
  row.appendChild(cell);
  tbody.appendChild(row);
  return;
}

list.forEach((c) => {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", c.id);

  let rowClass = "";
  if (c.exposureTier === "High intangible") rowClass = "row-tier-high";
  else if (c.exposureTier === "Medium intangible")
    rowClass = "row-tier-medium";
  else if (c.exposureTier === "Low intangible") rowClass = "row-tier-low";

  tr.className = rowClass;

  tr.innerHTML = `
    <td>${c.name}</td>
    <td>${c.ticker}</td>
    <td>${c.region}</td>
    <td>${c.sector}</td>
    <td>${formatNumber(c.marketCapUsdBn, 0)}</td>
    <td>${formatNumber(c.intangibleAssetsPct, 1)}</td>
    <td>${formatNumber(c.goodwillPct, 1)}</td>
    <td>${formatNumber(c.rndPctSales, 1)}</td>
    <td>${formatNumber(c.marketingPctSales, 1)}</td>
    <td>${formatNumber(c.exposureScore, 1)}</td>
    <td>${c.exposureTier}</td>
  `;
  tbody.appendChild(tr);
});

// Update header sort classes
const headers = document.querySelectorAll("#intangibleTable thead th[data-sort]");
headers.forEach((th) => th.classList.remove("sorted-asc", "sorted-desc"));

if (appState.sort.column) {
  const activeHeader = document.querySelector(
    `#intangibleTable thead th[data-sort="${appState.sort.column}"]`
  );
  if (activeHeader) {
    activeHeader.classList.add(
      appState.sort.ascending ? "sorted-asc" : "sorted-desc"
    );
  }
}


}

function handleTableSort(columnKey, headerEl) {
if (appState.sort.column === columnKey) {
appState.sort.ascending = !appState.sort.ascending;
} else {
appState.sort.column = columnKey;
appState.sort.ascending = true;
}

const dir = appState.sort.ascending ? 1 : -1;

appState.filteredCompanies.sort((a, b) => {
  const av = getSortValue(a, columnKey);
  const bv = getSortValue(b, columnKey);

  if (typeof av === "string" || typeof bv === "string") {
    return av.localeCompare(bv) * dir;
  }
  return (av - bv) * dir;
});

updateTableTab();


}

function getSortValue(c, column) {
switch (column) {
case "name":
return c.name || "";
case "ticker":
return c.ticker || "";
case "region":
return c.region || "";
case "sector":
return c.sector || "";
case "marketCapUsdBn":
return c.marketCapUsdBn ?? 0;
case "intangibleAssetsPct":
return c.intangibleAssetsPct ?? 0;
case "goodwillPct":
return c.goodwillPct ?? 0;
case "rndPctSales":
return c.rndPctSales ?? 0;
case "marketingPctSales":
return c.marketingPctSales ?? 0;
case "exposureScore":
return c.exposureScore ?? 0;
case "exposureTier":
// Order tiers Low < Medium < High
if (c.exposureTier === "Low intangible") return 0;
if (c.exposureTier === "Medium intangible") return 1;
if (c.exposureTier === "High intangible") return 2;
return 3;
default:
return 0;
}
}

// -----------------------------
// Profiles tab
// -----------------------------

function setActiveCompany(companyId) {
if (!companyId) {
appState.activeCompanyId = null;
updateProfilesTab();
return;
}
appState.activeCompanyId = companyId;
updateProfilesTab();
}

function updateProfilesTab() {
const selectEl = document.getElementById("profileCompanySelect");
const detailsEl = document.getElementById("profileDetails");
const barChart = appState.charts.profileBarChart;
const scoreChart = appState.charts.profileScoreChart;

if (!selectEl || !detailsEl) return;

const list = appState.filteredCompanies;

// Populate dropdown options
selectEl.innerHTML = "";
if (list.length === 0) {
  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = "No companies available";
  selectEl.appendChild(opt);
  appState.activeCompanyId = null;
  detailsEl.innerHTML =
    "<p>No companies are available with the current filters. Adjust filters on the left.</p>";
  if (barChart) {
    barChart.data.datasets[0].data = [0, 0, 0, 0];
    barChart.update();
  }
  if (scoreChart) {
    scoreChart.data.datasets[0].data = [0];
    scoreChart.update();
  }
  return;
}

list.forEach((c) => {
  const opt = document.createElement("option");
  opt.value = c.id;
  opt.textContent = `${c.name} (${c.ticker})`;
  selectEl.appendChild(opt);
});

// Ensure activeCompanyId is in list
if (
  !appState.activeCompanyId ||
  !list.some((c) => c.id === appState.activeCompanyId)
) {
  appState.activeCompanyId = list[0].id;
}

selectEl.value = appState.activeCompanyId;

const company = list.find((c) => c.id === appState.activeCompanyId);
if (!company) {
  detailsEl.innerHTML =
    "<p>Select a company from the dropdown once filters return some results.</p>";
  return;
}

const investPct = company.rndPctSales + company.marketingPctSales;

detailsEl.innerHTML = `
  <h3>${company.name} (${company.ticker})</h3>
  <p>
    Region: <strong>${company.region}</strong> |
    Country: <strong>${company.country}</strong> |
    Sector: <strong>${company.sector}</strong>
  </p>
  <p>
    Market cap: <strong>$${formatNumber(
      company.marketCapUsdBn,
      0
    )}bn</strong> |
    Intangible exposure tier: <strong>${company.exposureTier}</strong> (score
    <strong>${formatNumber(company.exposureScore, 1)}</strong>)
  </p>
  <div class="profile-metrics-grid">
    <div>Intangibles % of assets: <strong>${formatNumber(
      company.intangibleAssetsPct,
      1
    )}%</strong></div>
    <div>Goodwill % of assets: <strong>${formatNumber(
      company.goodwillPct,
      1
    )}%</strong></div>
    <div>R&amp;D % of sales: <strong>${formatNumber(
      company.rndPctSales,
      1
    )}%</strong></div>
    <div>Marketing % of sales: <strong>${formatNumber(
      company.marketingPctSales,
      1
    )}%</strong></div>
    <div>Intangible investment (R&amp;D + marketing): <strong>${formatNumber(
      investPct,
      1
    )}%</strong> of sales</div>
    <div>Software/services tilt: <strong>${formatNumber(
      company.softwareServicesTilt,
      0
    )}</strong> / 100</div>
  </div>
  <p style="margin-top:0.5rem;">${company.notes || ""}</p>
`;

if (barChart) {
  barChart.data.datasets[0].data = [
    company.intangibleAssetsPct,
    company.goodwillPct,
    company.rndPctSales,
    company.marketingPctSales
  ];
  barChart.update();
}

if (scoreChart) {
  scoreChart.data.datasets[0].data = [company.exposureScore];
  scoreChart.update();
}


}

// -----------------------------
// Utility functions
// -----------------------------

function clampNumber(val, min, max) {
if (isNaN(val)) return min;
return Math.min(max, Math.max(min, val));
}

function formatNumber(val, decimals) {
if (val == null || isNaN(val)) return "";
return Number(val).toFixed(decimals);
}

// -----------------------------
// Start app
// -----------------------------

initApp();
});