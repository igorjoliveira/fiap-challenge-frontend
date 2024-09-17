
async function fetchData() {
  const response = await fetch('../../js/mocks/dashboard/custo.mock.json');
  const data = await response.json();
  return data;
}

async function createChart() {
  const data = await fetchData();
  const labels = data.custos.map(custo => custo.cadastroData);
  const valorTotal = data.custos.map(custo => custo.valorTotal);

  const ctx = document.getElementById('myLineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor Total (R$)',
        data: valorTotal,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            tooltipFormat: 'LLL yyyy',
            displayFormats: {
              month: 'MMM yyyy'
            }
          },
          title: {
            display: true,
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valor Total (R$)'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Valor Total: R$${context.raw}`;
            }
          }
        }
      }
    }
  });
}

window.onload = createChart;
