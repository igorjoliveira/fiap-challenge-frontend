const rowsPerPage = 5;
let currentPage = 1;

async function fetchData() {
  const response = await fetch('/src/js/mocks/payment/despesas.mock.json');
  const data = await response.json();
  return data;
}

async function renderTable(page) {
  var jsonData = await fetchData();

  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';

  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, jsonData.despesas.length);
  const paginatedData = jsonData.despesas.slice(start, end);

  paginatedData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td class="table-user">${item.descricao}</td>
          <td>${item.pagamentoData}</td>
          <td>${item.tipoDespesa}</td>
          <td>R$ ${item.valor.toFixed(2).replace('.', ',')}</td>
          <td class="table-action">
              <a href="javascript: void(0);" class="action-icon"> <i class="mdi mdi-pencil"></i></a>
              <a href="javascript: void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>
          </td>
      `;
      tableBody.appendChild(row);
  });

  await renderPagination(jsonData.despesas.length);
  renderPaginationInfo(jsonData.despesas.length)
}

async function renderPagination(totalItems) {
  const pagination = document.querySelector('#pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="javascript: void(0);">${i}</a>`;
      pageItem.addEventListener('click', () => {
          currentPage = i;
          renderTable(currentPage);
      });
      pagination.appendChild(pageItem);
  }
}

function renderPaginationInfo(totalItems) {
  const paginationInfo = document.querySelector('#pagination-info');  
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  paginationInfo.innerHTML = `Mostrando ${startItem} a ${endItem} de ${totalItems} itens`;
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderTable(currentPage);
});