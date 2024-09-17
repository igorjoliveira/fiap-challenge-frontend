let chartInstance = null;

async function fetchData() {
  const response = await fetch('../../js/mocks/report/revenue.financial.mock.json');
  const data = await response.json();
  return data;
}

async function renderTable(data) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${item.descricao}</td>
            <td>${item.loja}</td>
            <td>${item.origem_transacao}</td>
            <td>${item.forma_pagamento}</td>
            <td>R$ ${item.valor.toFixed(2).replace('.', ',')}</td>
            <td>${new Date(item.data_hora_realizada).toLocaleString('pt-BR')}</td>
            <td>${item.usuario}</td>
        `;
    tableBody.appendChild(row);
  });

  await updateChart(data);
}

async function applyFilters() {
  var jsonData = await fetchData();
  const descricao = document.getElementById('descricao').value;
  const origemTransacao = document.getElementById('origemTransacao').value;
  const formaPagamento = document.getElementById('formaPagamento').value;

  const filteredData = jsonData.receitas.filter(item => {
    return (descricao === '' || item.descricao.includes(descricao)) &&
      (origemTransacao === '' || item.origem_transacao === origemTransacao) &&
      (formaPagamento === '' || item.forma_pagamento === formaPagamento);
  });

  await renderTable(filteredData);
}

async function updateChart(data) {
  const paymentData = data.reduce((acc, item) => {
    acc[item.forma_pagamento] = (acc[item.forma_pagamento] || 0) + item.valor;
    return acc;
  }, {});

  // Se o gráfico já existe, destrua-o antes de criar um novo
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = document.getElementById('paymentChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(paymentData),
      datasets: [{
        label: 'Distribuição por Forma de Pagamento',
        data: Object.values(paymentData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2).replace('.', ',')}`;
            }
          }
        }
      }
    }
  });
}

document.getElementById('descricao').addEventListener('change', applyFilters);
document.getElementById('origemTransacao').addEventListener('change', applyFilters);
document.getElementById('formaPagamento').addEventListener('change', applyFilters);

document.addEventListener('DOMContentLoaded', async () => {
  var jsonData = await fetchData();
  await renderTable(jsonData.receitas);
});