document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    
    if (!name || !phone) {
        alert('Por favor, preencha ambos os campos.');
        return;
    }

    // Verifica se o nome contém pelo menos um espaço (nome completo)
    const spaceCount = (name.match(/ /g) || []).length; // Conta o número de espaços
    if (spaceCount < 1) {
        alert('Por favor, insira seu nome completo.');
        return;
    }

    // Verifica se o telefone contém apenas números
    const digitsOnlyPattern = /^\d+$/; // Aceita apenas dígitos
    const phoneDigits = phone.replace(/[^0-9]/g, ''); // Remove tudo que não é dígito

    if (phoneDigits.length !== 11 || !digitsOnlyPattern.test(phoneDigits)) {
        alert('Por favor, insira um telefone no formato correto (xx) xxxxx-xxxx.');
        return;
    }

    // Verifica o formato do telefone
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato: (xx) xxxxx-xxxx
    if (!phonePattern.test(phone)) {
        alert('Por favor, insira um telefone no formato (xx) xxxxx-xxxx.');
        return;
    }

    // Verifica se o nome ou o telefone já existem na tabela
    const tableRows = document.querySelectorAll('#contactsTable tbody tr');
    for (let row of tableRows) {
        const existingName = row.cells[0].textContent;
        const existingPhone = row.cells[1].textContent;
        if (existingName.toLowerCase() === name.toLowerCase()) {
            alert('Este contato já está na lista.');
            return;
        }
        if (existingPhone === phone) {
            alert('Este telefone já está cadastrado.');
            return;
        }
    }

    // Adiciona uma nova linha à tabela
    const table = document.getElementById('contactsTable').querySelector('tbody');
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    nameCell.textContent = name;
    phoneCell.textContent = phone;

    // Limpa os campos após a inserção
    nameInput.value = '';
    phoneInput.value = '';
});
