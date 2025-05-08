const scriptURL = 'https://script.google.com/macros/s/AKfycbxZQa0LkgYotOGn5yHgdum_Uwvd37OQ2-MN-mC_sJLIaf7C8oSAl_QY-muMEWoGmxA7Ow/exec';

(function adicionarAdminPadrao() {
  const adminPadrao = {
    nome: 'Henrique Santos',
    email: 'henriquefsantsss@hotmail.com',
    senha: 'henrique10',
    tipo: 'admin',
    status: 'ativo',
  };

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioExistente = usuarios.find(u => u.email === adminPadrao.email);

  if (!usuarioExistente) {
    usuarios.push(adminPadrao);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
})();

function cadastrarUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioExistente = usuarios.find(u => u.email === email);

  if (usuarioExistente) {
    alert('Este e-mail já está cadastrado');
    return;
  }

  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
    tipo: 'aluno',
    status: 'ativo',
  };

  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Enviar os dados para o Google Sheets
  const formData = new URLSearchParams();
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('senha', senha);
  formData.append('tipo', 'aluno');
  formData.append('status', 'ativo');

  // Envio dos dados para o Google Sheets via Google Apps Script
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  })
  .then(response => {
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  })
  .catch(error => {
    console.error('Erro ao enviar dados para a planilha:', error);
    alert('Cadastro local salvo, mas houve um erro ao enviar os dados ao servidor.');
    window.location.href = 'login.html';
  });
}
