function createButtonsMain (nameButton, idButton, num){
  const button = document.createElement('button');
  button.id = idButton;
  button.innerText = nameButton;
  button.value = num;
  document.querySelector('.buttons-container').appendChild(button);
  if (num !== 0) {
    button.addEventListener('click', showRounds);
  } else if (nameButton === 'SOMA') {
      button.addEventListener('click', somaPontos);
  } else if (nameButton === 'Nova Partida') {
      button.addEventListener('click', function() {
        let resposta = confirm('Tem certeza que deseja reiniciar a partida?');
        if (resposta){
          zeraTudo();
        }
      });
  }
}

createButtonsMain ('1a Rodada', 'btn-rodada1', 1);
createButtonsMain ('2a Rodada', 'btn-rodada2', 2);
createButtonsMain ('3a Rodada', 'btn-rodada3', 3);
createButtonsMain ('4a Rodada', 'btn-rodada4', 4);
createButtonsMain ('5a Rodada', 'btn-rodada5', 5);
createButtonsMain ('SOMA', 'btn-soma', 0);
createButtonsMain ('Nova Partida', 'btn-reinicio', 0);

let numRodada = 0;

document.getElementById('rounds1').style.display = 'none';
document.getElementById('rounds2').style.display = 'none';
document.getElementById('rounds3').style.display = 'none';
document.getElementById('rounds4').style.display = 'none';
document.getElementById('rounds5').style.display = 'none';
document.querySelector('.players-container').style.display = 'none';
document.querySelector('.parabens').style.display = 'none';

function updateHeaderGame() {
  document.querySelector('#dupla1 p').innerText = document.getElementById('dupla-input1').value;
  document.querySelector('#dupla2 p').innerText = document.getElementById('dupla-input2').value;
};

function displayRodadas(){
  if (numRodada != 0) {
    document.querySelector('.players-container').style.display = 'block';
  }

  switch (numRodada) {
    case 1:
      document.getElementById('rounds1').style.display = 'block';
      break;
    case 2:
      document.getElementById('rounds1').style.display = 'block';
      document.getElementById('rounds2').style.display = 'block';
      break;
    case 3:
      document.getElementById('rounds1').style.display = 'block';
      document.getElementById('rounds2').style.display = 'block';
      document.getElementById('rounds3').style.display = 'block';
      break;
    case 4:
      document.getElementById('rounds1').style.display = 'block';
      document.getElementById('rounds2').style.display = 'block';
      document.getElementById('rounds3').style.display = 'block';
      document.getElementById('rounds4').style.display = 'block';
      break;
    case 5:
      document.getElementById('rounds1').style.display = 'block';
      document.getElementById('rounds2').style.display = 'block';
      document.getElementById('rounds3').style.display = 'block';
      document.getElementById('rounds4').style.display = 'block';
      document.getElementById('rounds5').style.display = 'block';
      break;
  }
}

function showRounds(e){
  // if ((document.getElementById('dupla-input1').value === '') || (document.getElementById('dupla-input2').value === '')){
  //   alert('Insira o nome das duplas');
  //   return;
  // }
  num = parseInt(e.target.value);
  console.log(num, typeof(num));
  if (num == 1) {
    numRodada = 1;
    updateHeaderGame();
    displayRodadas();
  } else if (numRodada != (num - 1)){   //if (parseInt(numRodada) !== (parseInt(num) - 1)){
              alert('Você ainda não iniciou a rodada anterior!');
            } else {
              numRodada = num;
              displayRodadas();
            }
  
  console.log(numRodada, typeof(numRodada));
}

function testaValor(numRodada){
  const pontosDupla1 = document.querySelectorAll('.input-pontos1');
  const pontosDupla2 = document.querySelectorAll('.input-pontos2');
  let valida1 = true;
  let valida2 = true;

  for (let index = 0; index < numRodada * 2; index++) {
    const valor1 = pontosDupla1[index].value;
    const valor2 = pontosDupla2[index].value;
    if (valor1 === '' || valor1 > 2999) {
      valida1 = false;
    }
    if (valor2 === '' || valor2 > 2999) {
      valida2 = false;
    }
  }
  if (valida1 === false){
    alert('Pontos da Dupla 1 devem estar válidos e preenchidos');
  }  
  if (valida2 === false){
    alert('Pontos da Dupla 2 devem estar válidos e preenchidos');
  }

  return valida1 && valida2;
}

function parabens(strVencedor){
  document.getElementById('rounds1').style.display = 'none';
  document.getElementById('rounds2').style.display = 'none';
  document.getElementById('rounds3').style.display = 'none';
  document.getElementById('rounds4').style.display = 'none';
  document.getElementById('rounds5').style.display = 'none';
  
  document.getElementById('vencedor').innerText = strVencedor;
  const parabens = document.querySelector('.parabens');
  parabens.style.display = 'block';
  document.getElementById('audio').play();
}

function vencedor(soma1, soma2) {
  if (soma1 > 2999 || soma2 > 2999) {
    if (soma1 > soma2){
      parabens(document.getElementById('dupla-input1').value); 
    } else {
      parabens(document.getElementById('dupla-input2').value);
    }
  }
}

function somaPontos() {
  const totDupla1 = document.getElementById('totDupla1');
  const totDupla2 = document.getElementById('totDupla2');
  let soma1 = 0;
  let soma2 = 0;
  if (testaValor(numRodada) === true) {
    const pontosDupla1 = document.querySelectorAll('.input-pontos1');
    for (let index = 0; index < pontosDupla1.length; index++) {
      if (pontosDupla1[index].value !== ''){
        soma1 += parseInt(pontosDupla1[index].value);
        //console.log(parseInt(pontosDupla1[index].value));
      }
    }
    const pontosDupla2 = document.querySelectorAll('.input-pontos2');
    for (let index = 0; index < pontosDupla2.length; index++) {
      if (pontosDupla2[index].value !== ''){
        soma2 += parseInt(pontosDupla2[index].value);
      }
    }
    saveGame();
    totDupla1.innerText = soma1;
    totDupla2.innerText = soma2;
    vencedor(soma1, soma2);
  }
}

function zeraTudo(){
  numRodada = 0;
  document.getElementById('totDupla1').innerText = '0';
  document.getElementById('totDupla2').innerText = '0';
  const pontosDupla1 = document.querySelectorAll('.input-pontos1');
  const pontosDupla2 = document.querySelectorAll('.input-pontos2');
  for (let index = 0; index < pontosDupla1.length; index++) {
      pontosDupla1[index].value = '';
      pontosDupla2[index].value = '';
  }
  saveGame();
  document.getElementById('rounds1').style.display = 'none';
  document.getElementById('rounds2').style.display = 'none';
  document.getElementById('rounds3').style.display = 'none';
  document.getElementById('rounds4').style.display = 'none';
  document.getElementById('rounds5').style.display = 'none';
  document.querySelector('.players-container').style.display = 'none';
  document.querySelector('.parabens').style.display = 'none';
}

// Recupera do local Storage
function getPontos(){
  numRodada = parseInt(JSON.parse(localStorage.getItem('rodada')));
  document.getElementById('dupla-input1').value = JSON.parse(localStorage.getItem('dupla1'));
  document.getElementById('dupla-input2').value = JSON.parse(localStorage.getItem('dupla2'));
  updateHeaderGame();
  displayRodadas();
  const pontosDupla1 = document.querySelectorAll('.input-pontos1');
  const pontosDupla2 = document.querySelectorAll('.input-pontos2');
  const arrayPontos1 = JSON.parse(localStorage.getItem('pontos1'));
  const arrayPontos2 = JSON.parse(localStorage.getItem('pontos2'));
  if (arrayPontos1 !== null) {
    for (let index = 0; index < arrayPontos1.length; index++) {
      pontosDupla1[index].value = arrayPontos1[index];
      pontosDupla2[index].value = arrayPontos2[index];
    }  
  }
  somaPontos();
}

function saveGame() {
  const dupla1 = document.querySelector('#dupla1 p').innerText;
  const dupla2 = document.querySelector('#dupla2 p').innerText;
  if (dupla1 !== '') {
    localStorage.setItem('dupla1', JSON.stringify(dupla1));
  } else {
    localStorage.removeItem('dupla1');
  }
  if (dupla2 !== '') {
    localStorage.setItem('dupla2', JSON.stringify(dupla2));
  } else {
    localStorage.removeItem('dupla2');
  }
  // numRodada
  localStorage.setItem('rodada', JSON.stringify(numRodada));
  // salva pontos da dupla 1
  const pontos1 = document.querySelectorAll('.input-pontos1');
  if (pontos1.length) {
    const arrayPontos1 = [];
    pontos1.forEach(item => {
      arrayPontos1.push(item.value);
    });
    localStorage.setItem('pontos1', JSON.stringify(arrayPontos1));
  } else {
    localStorage.removeItem('pontos1');
  }
  // salva pontos da dupla 2
  const pontos2 = document.querySelectorAll('.input-pontos2');
  if (pontos2.length) {
    const arrayPontos2 = [];
    pontos2.forEach(item => {
      arrayPontos2.push(item.value);
    });
    localStorage.setItem('pontos2', JSON.stringify(arrayPontos2));
  } else {
    localStorage.removeItem('pontos2');
  }
}

getPontos();