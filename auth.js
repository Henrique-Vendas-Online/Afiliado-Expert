function fazerLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Aqui você define o login e senha válidos
  const usuarioCorreto = "aluno";
  const senhaCorreta = "senha123";

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    // Login bem-sucedido
    window.location.href = "aulas.html";
  } else {
    document.getElementById("erro").textContent = "Usuário ou senha incorretos.";
  }
}
