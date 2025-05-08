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
  alert('Cadastro realizado com sucesso!');
  window.location.href = 'login.html';
}
