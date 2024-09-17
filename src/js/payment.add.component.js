// Formatação do valor monetário
document.getElementById('valorDespesa').addEventListener('input', function (e) {
    var value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = (value / 100).toFixed(2); // Divide por 100 e formata com 2 casas decimais
    value = value.replace('.', ','); // Substitui o ponto decimal por vírgula
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona ponto a cada 3 dígitos
    e.target.value = value;
});

// Validação do formulário
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()