const scriptURL = 'https://script.google.com/macros/s/AKfycbypMkilPCCvpfFucPWL7___WCy0y__CN3Qn6XBgj2Q/dev';

// Função para adicionar um admin padrão ao carregar
(function adicionarAdminPadrao() {
  const adminPadrao = {
    nome: 'Henrique Santos',
    email: 'henriquefsantsss@hotmail.com',
    senha: 'henrique10',
    tipo: 'admin',
    status: 'ativo'
  };

  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      nome: adminPadrao.nome,
      email: adminPadrao.email,
      senha: adminPadrao.senha,
      tipo: adminPadrao.tipo,
      status: adminPadrao.status
    }).toString()
  })
  .then(response => response.json())
  .then(data => console.log('Admin padrão adicionado:', data))
  .catch(error => console.error('Erro ao adicionar admin:', error));
})();

// Função para cadastrar o usuário
function cadastrarUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Verifica se as senhas são iguais
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  // Cria os dados a serem enviados para o Google Apps Script
  const formData = new URLSearchParams();
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('senha', senha);
  formData.append('tipo', 'aluno');
  formData.append('status', 'ativo');

  // Envia os dados para o Google Apps Script via POST
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'login.html'; // Redireciona para a página de login
    } else {
      alert(data.message);
    }
  })
  .catch(() => {
    alert('Erro ao realizar o cadastro.');
  });
}

// Função de login
function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('senha', senha);

  fetch(scriptURL + '?action=login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      window.location.href = 'aulas.html';
    } else {
      alert(data.message);
    }
  })
  .catch(() => {
    alert('Erro ao realizar o login.');
  });
}

// Função para verificar se o usuário está logado
function verificarLogin() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuarioLogado) {
    alert('Acesso negado. Faça login.');
    window.location.href = 'login.html';
  }
}

// Função para exibir o nome do usuário logado
function exibirNomeUsuario() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuarioLogado) {
    document.getElementById('nomeUsuario').textContent = `Olá, ${usuarioLogado.nome}!`;
  }
}

// Função de logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

// Função para verificar se o usuário é admin
function verificarAdmin() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuario || usuario.tipo !== 'admin') {
    alert('Acesso restrito.');
    window.location.href = 'login.html';
  }
}

// Função para carregar a lista de usuários
function carregarUsuarios() {
  fetch(scriptURL + '?action=listarUsuarios', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('usuariosContainer');
    container.innerHTML = '<h3>Usuários Cadastrados</h3>';

    data.usuarios.forEach((u, index) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${u.nome}</strong> (${u.email}) - <em>${u.tipo}</em> - Status: <strong>${u.status}</strong></p>
        <button onclick="promoverUsuario(${index})">Promover para Admin</button>
        <button onclick="alternarStatus(${index})">${u.status === 'ativo' ? 'Inativar' : 'Ativar'}</button>
      `;
      container.appendChild(div);
    });
  })
  .catch(() => {
    alert('Erro ao carregar usuários.');
  });
}

// Função para promover um usuário a admin
function promoverUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  usuarios[index].tipo = 'admin';
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Usuário promovido a admin.');
  carregarUsuarios();
}

// Função para alternar o status do usuário (ativo/inativo)
function alternarStatus(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  usuarios[index].status = usuarios[index].status === 'ativo' ? 'inativo' : 'ativo';
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Status atualizado.');
  carregarUsuarios();
}
