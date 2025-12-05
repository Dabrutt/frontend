import { progressAPI, modulesAPI, learningPathsAPI } from "../../api/api.js";
import * as echarts from "echarts";

export default class DashboardPage {
  constructor() {
    this.title = "Dashboard";
  }

  async getHtml() {
    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-brand-500">Runtutan Belajar</h2>
        <div class="text-sm text-gray-500">Dashboard Academy</div>
      </div>

      <!-- MAIN CHART CARD -->
      <section class="card bg-white rounded-md overflow-hidden">
        <div class="card-header flex items-center gap-3">
          <div class="p-2 bg-brand-600 rounded-md">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-width="1.5" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-semibold">Aktivitas Belajar</div>
            <div class="text-xs text-gray-200">Perkembangan mingguan</div>
          </div>
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div id="progress-minutes" class="text-2xl font-bold">...</div>
              <div class="text-sm text-gray-500">
                Perbandingan minggu lalu
                <span id="progress-percent" class="text-success font-semibold">...</span>
              </div>
            </div>
            <div class="text-sm text-gray-500">
              Modules
              <div id="progress-modules" class="text-lg font-semibold">...</div>
            </div>
          </div>
          <div id="learningChart" style="height: 220px; width: 100%"></div>
        </div>
      </section>

      <!-- TWO COLUMN SECTION -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- LEARNING PATHS -->
        <article class="card bg-white rounded-md overflow-hidden">
          <div class="card-header flex items-center gap-3">
            <div class="p-2 rounded bg-brand-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="1.5" d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold">Progres Kelas Learning Path</div>
              <div class="text-xs text-gray-200">Ikuti urutan kelas</div>
            </div>
          </div>
          <div class="p-4 space-y-4">
            <div id="learning-paths"></div>
          </div>
        </article>

        <!-- NON LEARNING PATH MODULES -->
        <article class="card bg-white rounded-md overflow-hidden">
          <div class="card-header flex items-center gap-3">
            <div class="p-2 rounded bg-brand-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="1.5" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold">Progres Kelas Non Learning Path</div>
              <div class="text-xs text-gray-200">Belajar bebas</div>
            </div>
          </div>
          <div class="p-4 space-y-4">
            <div id="non-learning-modules"></div>
          </div>
        </article>

      </div>
    </div>
  `;
  }

  async load() {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if not authenticated
      window.location.hash = "#/login";
      return;
    }

    await this.initChart();
    await this.loadLearningPaths();
    await this.loadNonLearningPathModules();
  }

  async initChart() {
    setTimeout(async () => {
      const chartDom = document.getElementById("learningChart");
      if (!chartDom) return;

      console.log("Mencari elemen chart:", chartDom);

      let labels = [];
      let values = [];

      try {
        const apiData = await progressAPI.getChart();

        console.log("Data mentah dari API:", apiData);

        labels = apiData?.labels || [];
        values = apiData?.data || [];

        console.log("Labels yang dipakai:", labels);
        console.log("Values yang dipakai:", values);

      } catch (err) {
        console.error("Gagal mengambil data chart:", err);
      }

      const myChart = echarts.init(chartDom);
      console.log("ECharts Instance:", myChart);
      

      const option = {
        tooltip: { trigger: "axis" },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: labels,
        },

        yAxis: { type: "value" },

        series: [
          {
            name: "Menit Belajar",
            type: "line",
            smooth: true,
            data: values,
          },
        ],
      };

      console.log("Option final yang dipasang ke chart:", option);

      myChart.setOption(option);
      console.log("Chart berhasil di-render");

      window.addEventListener("resize", () => {
        console.log("Resize chart");
        myChart.resize();
      });

      // Populate progress overview data
      try {
        const overviewData = await progressAPI.getOverview();
        console.log("Overview Data:", overviewData);

        // Update progress display with correct API response structure
        document.getElementById("progress-minutes").textContent = `${overviewData.percentage}%`;
        document.getElementById("progress-percent").textContent = `▲ ${overviewData.percentage}%`;
        document.getElementById("progress-modules").textContent = overviewData.modules?.length || 0;
      } catch (err) {
        console.error("Gagal mengambil data overview:", err);
        document.getElementById("progress-minutes").textContent = "Error";
        document.getElementById("progress-percent").textContent = "Error";
        document.getElementById("progress-modules").textContent = "Error";
      }

    }, 20);
  }


  async loadLearningPaths() {
    const container = document.querySelector("#learning-paths");
    if (!container) return;

    try {
      const paths = await learningPathsAPI.getAll();
      console.log("Learning Paths Data:", paths);
      container.innerHTML = paths
        .map(
          (p) => `
          <div class="border rounded p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="list-dot bg-green-500"></span>
                <div class="text-sm font-semibold">${p.learning_path_name}</div>
              </div>
              <div class="text-sm text-gray-500">${p.modules?.length || 0} Modules</div>
            </div>
            <div class="text-xs text-gray-500">Learning Path</div>
          </div>
        `
        )
        .join("");
    } catch (err) {
      console.error("Error loading learning paths:", err);
      container.innerHTML = `<p class="text-red-500">Gagal load data Learning Paths</p>`;
    }
  }

  async loadNonLearningPathModules() {
    const container = document.querySelector("#non-learning-modules");
    if (!container) return;

    try {
      // Get modules and their progress data
      const [modules, overviewData] = await Promise.all([
        modulesAPI.getAll(),
        progressAPI.getOverview()
      ]);

      console.log("Modules Data:", modules);
      console.log("Overview Data for modules:", overviewData);

      container.innerHTML = modules
        .map(
          (m) => {
            // Find progress for this module from overview data
            const moduleProgress = overviewData.modules?.find(mod => mod.id === m.id)?.progress || 0;
            return `
            <div class="border rounded p-3">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="list-dot ${moduleProgress >= 100 ? "bg-green-500" : "bg-red-500"}"></span>
                  <div class="text-sm font-semibold">${m.title}</div>
                </div>
                <div class="text-sm text-gray-500">${moduleProgress}% / 100%</div>
              </div>
              <div class="progress-rail w-full rounded-full">
                <div class="rounded-full"
                     style="width:${moduleProgress}%; height:10px; background:${moduleProgress >= 100 ? "#10b981" : "#ef4444"}">
                </div>
              </div>
            </div>
          `;
          }
        )
        .join("");
    } catch (err) {
      console.error("Error loading modules:", err);
      container.innerHTML = `<p class="text-red-500">Gagal load data Modules</p>`;
    }
  }
}

