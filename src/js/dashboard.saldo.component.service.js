async function fetchData() {
  const response = await fetch('../../js/mocks/dashboard/saldo.mock.json');
  const data = await response.json();
  return data;
}

async function createChart() {
  const data = await fetchData();
  const labels = data.saldos.map(saldo => new Date(saldo.fechamentoData));
  const valorFinal = data.saldos.map(saldo => saldo.valorFinal);

  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor Final (R$)',
        data: valorFinal,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return [`Data: ${context.label}`,`Valor Final: R$${context.raw}`];
            }
          }
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'dd/MM/yyyy',
            displayFormats: {
              day: 'dd/MM'
            }
          },
          title: {
            display: true,
            text: '2024'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valor Final (R$)'
          }
        }
      }
    }
  });
}

window.onload = createChart;