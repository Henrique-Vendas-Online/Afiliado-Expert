const scriptURL = 'https://script.google.com/macros/s/AKfycbwJt0vMHyKXTcaoznXOC2Q-rqzDUfSW-mIdmZI5q6QlzSZxt25wUNLAoge_YKkg4zD0/exec';

// Função para adicionar um admin padrão ao carregar
(function adicionarAdminPadrao() {
  const adminPadrao = {
    nome: 'Henrique Santos',
    email: 'henriquefsantsss@hotmail.com',
    senha: 'henrique10',
    tipo: 'admin',
    status: 'ativo'
  };

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existeAdmin = usuarios.some(u => u.email === adminPadrao.email);

  if (!existeAdmin) {
    usuarios.push(adminPadrao);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
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
  .then(() => {
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; // Redireciona para a página de login
  })
  .catch(() => {
    alert('Erro ao realizar o cadastro.');
  });
}

// Função de login
function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = 'aulas.html';
  } else {
    alert('E-mail ou senha inválidos.');
  }
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
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const container = document.getElementById('usuariosContainer');
  container.innerHTML = '<h3>Usuários Cadastrados</h3>';

  usuarios.forEach((u, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${u.nome}</strong> (${u.email}) - <em>${u.tipo}</em> - Status: <strong>${u.status}</strong></p>
      <button onclick="promoverUsuario(${index})">Promover para Admin</button>
      <button onclick="alternarStatus(${index})">${u.status === 'ativo' ? 'Inativar' : 'Ativar'}</button>
    `;
    container.appendChild(div);
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
