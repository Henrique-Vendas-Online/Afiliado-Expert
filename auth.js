const scriptURL = 'https://script.google.com/macros/s/SEU_SCRIPT_ID/exec';

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

::contentReference[oaicite:0]{index=0}
 
