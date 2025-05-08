// auth.js

// Função para cadastrar um novo usuário
function cadastrarUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (!nome || !email || !senha || !confirmarSenha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(usuario => usuario.email === email)) {
    alert('Já existe um usuário com este e-mail.');
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Cadastro realizado com sucesso!');
  window.location.href = 'login.html';
}

// Função para realizar o login
function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

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
    window.location.href = 'login.html';
  }
}

// Função para exibir o nome do usuário logado
function exibirNomeUsuario() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuarioLogado) {
    document.getElementById('nomeUsuario').textContent = `Bem-vindo, ${usuarioLogado.nome}!`;
  }
}

// Função para realizar o logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}
