
async function fetchData() {
  const response = await fetch('../../js/mocks/dashboard/categoria.mock.json');
  const data = await response.json();
  return data;
}

async function createChart() {
  const data = await fetchData();
  const ctx = document.getElementById('myChart').getContext('2d');

  const labels = data.categorias.map(cat => cat.nome);
  const valores = data.categorias.map(cat => cat.valorTotal);
  const quantidades = data.categorias.map(cat => cat.quantidade);

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor Total (R$)',
        data: valores,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            title: function (context) {
              return context[0].label;
            },
            label: function (context) {
              const valorTotal = context.raw;
              const quantidade = quantidades[context.dataIndex];
              return [`Valor Total: R$${valorTotal}`, `Quantidade: ${quantidade}`];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


window.onload = createChart;