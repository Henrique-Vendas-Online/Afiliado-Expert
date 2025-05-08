// URL do Google Apps Script
const sheet = SpreadsheetApp.openById('https://script.google.com/macros/s/AKfycbypMkilPCCvpfFucPWL7___WCy0y__CN3Qn6XBgj2Q/dev').getSheetByName('Usuarios');

// Função de login
function doPost(e) {
  const parametros = e.parameter;
  const usuario = parametros.usuario;
  const senha = parametros.senha;

  // Verifica se o usuário existe na planilha
  const usuarios = sheet.getDataRange().getValues();
  for (let i = 0; i < usuarios.length; i++) {
    const row = usuarios[i];
    const nome = row[0].toLowerCase();
    const email = row[1].toLowerCase();
    const senhaGuardada = row[2];
    const status = row[3];

    // Verifica se o nome de usuário ou e-mail coincide
    if ((nome === usuario || email === usuario) && senhaGuardada === senha) {
      if (status === 'inativo') {
        return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Usuário inativo'}))
                             .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Envia os dados do usuário autenticado
      return ContentService.createTextOutput(JSON.stringify({status: 'success', usuario: {nome: row[0], email: row[1], tipo: row[4], status: row[3]}}))
                           .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Usuário ou senha inválidos'}))
                       .setMimeType(ContentService.MimeType.JSON);
}

// Função para cadastrar novo usuário
function cadastrarUsuario(nome, email, senha) {
  const data = new Date();
  const status = 'ativo';
  const tipo = 'aluno';

  // Adiciona novo usuário na planilha
  sheet.appendRow([nome, email, senha, status, tipo]);

  return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Cadastro realizado com sucesso!'}))
                       .setMimeType(ContentService.MimeType.JSON);
}

// Função para adicionar um admin padrão, se necessário
function adicionarAdminPadrao() {
  const adminPadrao = ['Henrique Santos', 'henriquefsantsss@hotmail.com', 'senhaadmin', 'ativo', 'admin'];
  sheet.appendRow(adminPadrao);
}
