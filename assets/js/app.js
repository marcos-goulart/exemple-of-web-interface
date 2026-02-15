// ================= Sidebar =================
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

// ================= Dark Mode =================
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent =
        document.body.classList.contains("dark-mode")
            ? "Light Mode"
            : "Dark Mode";
});

// ================= Chart =================
const ctx = document.getElementById("turnoverChart").getContext("2d");

const turnoverChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Turnover %",
            data: [12, 14, 11, 15, 13, 16],
            tension: 0.4,
            fill: true,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 800
        },
        plugins: {
            legend: { display: false }
        }
    }
});

// ================= Employee Search =================
const searchInput = document.getElementById("employeeSearch");

searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
        const name = row.querySelector("td").textContent.toLowerCase();
        row.style.display = name.includes(filter) ? "" : "none";
    });
});

// ================= Animated Counter =================
function animateValue(elementId, start, end, duration, suffix = "") {
    const element = document.getElementById(elementId);
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(start + range * progress);

        element.innerHTML = value.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ================= Trend Indicator =================
function updateWithIndicator(elementId, newValue, suffix = "") {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent.replace(/\D/g, "")) || 0;

    const difference = newValue - currentValue;
    const arrow = difference >= 0 ? " ↑" : " ↓";
    const color = difference >= 0 ? "#22c55e" : "#ef4444";

    animateValue(elementId, currentValue, newValue, 800, suffix);

    setTimeout(() => {
        element.innerHTML += `<span style="color:${color}; font-size:22px; font-weight:700; margin-left:6px; vertical-align:middle;">${arrow}</span>`;
    }, 820);
}

// ================= Chart Glow Effect =================
function glowChart() {
    turnoverChart.data.datasets[0].borderColor = "#3b82f6";
    turnoverChart.data.datasets[0].backgroundColor = "rgba(59,130,246,0.2)";
    turnoverChart.update();

    setTimeout(() => {
        turnoverChart.data.datasets[0].borderColor = undefined;
        turnoverChart.data.datasets[0].backgroundColor = undefined;
        turnoverChart.update();
    }, 800);
}

// ================= Random Chart Generator =================
function generateRandomTrend() {
    return Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 10 + 5)
    );
}

// ================= Simulate Stats =================
function simulateStats() {

    const totalEmployees = Math.floor(Math.random() * 500 + 1000);
    const retentionRate = Math.floor(Math.random() * 20 + 75);
    const turnoverRisk = 100 - retentionRate;
    const engagementScore = Math.floor(Math.random() * 30 + 60);

    updateWithIndicator("totalEmployees", totalEmployees);
    updateWithIndicator("retentionRate", retentionRate, "%");
    updateWithIndicator("turnoverRisk", turnoverRisk, "%");
    updateWithIndicator("engagementScore", engagementScore, "/100");

    turnoverChart.data.datasets[0].data = generateRandomTrend();
    glowChart();
}

document.getElementById("simulateStats")
    .addEventListener("click", simulateStats);

// ================= Auto Simulation =================
setInterval(simulateStats, 5000);
