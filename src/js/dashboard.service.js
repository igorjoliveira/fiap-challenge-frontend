// Template HTML para o card
const cardTemplate = ({ titulo, valor, percentual }) => `
    <div class="col-md-6">
        <div class="card widget-flat">
            <div class="card-body">
                <div class="float-end">
                    <i class="mdi mdi-currency-usd widget-icon"></i>
                </div>
                <h5 class="text-muted fw-normal mt-0">${titulo}</h5>
                <h3 class="mt-3 mb-3">${valor}</h3>
                <p class="mb-0 text-muted">
                    <span class="${percentual >= 0 ? 'text-success' : 'text-danger'} me-2">
                        <i class="${percentual >= 0 ? 'mdi mdi-arrow-up-bold' : 'mdi mdi-arrow-down-bold'}"></i> 
                        ${Math.abs(percentual)}%
                    </span>
                    <span class="text-nowrap">Desde o mês passado</span>
                </p>
            </div> <!-- end card-body -->
        </div> <!-- end card -->
    </div> <!-- end col -->
`;

async function fetchData() {
  const response = await fetch('../../js/mocks/dashboard/resumo.mock.json');
  const data = await response.json();
  return data;
}

async function createCard() {
  const dados = await fetchData();
  const container = document.getElementById('card-container');
  container.innerHTML = dados.map(dado => cardTemplate(dado)).join('');

  await createChart();
}

async function fetchChartData() {
  const response = await fetch('../../js/mocks/dashboard/projecao.mock.json');
  const data = await response.json();
  return data;
}

async function createChart() {
  const data = await fetchChartData();

  const labels = data.metas.map(item => item.fechamentoData);
  const valorPlanejado = data.metas.map(item => item.valorPlanejado);
  const valorRealizado = data.metas.map(item => item.valorRealizado);

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Valor Planejado',
          data: valorPlanejado,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          barThickness: 20
        },
        {
          label: 'Valor Realizado',
          data: valorRealizado,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          barThickness: 20
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: false,
          groupPercentage: 0.4,
          barPercentage: 0.8,
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 0
          }
        },
        y: {
          stacked: false,
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: R$${value}`;
            }
          }
        }
      }
    }
  });
}

window.onload = async () => {
  await createCard();
  await createChart();
};