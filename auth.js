const scriptURL = 'https://script.google.com/macros/s/AKfycbxZQa0LkgYotOGn5yHgdum_Uwvd37OQ2-MN-mC_sJLIaf7C8oSAl_QY-muMEWoGmxA7Ow/exec';

function cadastrarUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(u => u.email === email)) {
    alert('Este e-mail já está cadastrado.');
    return;
  }

  const novoUsuario = { nome, email, senha, tipo: 'aluno', status: 'ativo' };
  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  const formData = new URLSearchParams();
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('senha', senha);
  formData.append('tipo', 'aluno');
  formData.append('status', 'ativo');

  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  }).then(() => {
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  }).catch(() => {
    alert('Cadastro local salvo, mas houve erro ao enviar ao servidor.');
    window.location.href = 'login.html';
  });
}

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

function verificarLogin() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuarioLogado) {
    alert('Acesso negado. Faça login.');
    window.location.href = 'login.html';
  }
}

function exibirNomeUsuario() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuarioLogado) {
    document.getElementById('nomeUsuario').textContent = `Olá, ${usuarioLogado.nome}!`;
  }
}

function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

function verificarAdmin() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuario || usuario.tipo !== 'admin') {
    alert('Acesso restrito.');
    window.location.href = 'login.html';
  }
}

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

function promoverUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  usuarios[index].tipo = 'admin';
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Usuário promovido a admin.');
  carregarUsuarios();
}

function alternarStatus(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  usuarios[index].status = usuarios[index].status === 'ativo' ? 'inativo' : 'ativo';
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Status atualizado.');
  carregarUsuarios();
}
