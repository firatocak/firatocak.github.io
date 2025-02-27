var duration         = [], index = [], chars = [], visible = [];
var canvas           = document.getElementById('canvas');
var context          = canvas.getContext('2d');
var lineHeight       = 26, offset = 18;
var lastUpdate       = Date.now();

canvas.width         = window.innerWidth;
canvas.height        = window.innerHeight;

var rows             = Math.ceil(window.innerHeight / 26);
var columns          = Math.ceil(window.innerWidth / offset);

context.font         = 'normal 24px Matrix Code NFI';
context.fillStyle    = 'rgba(0, 204, 0, 1)';
context.shadowColor  = 'rgb(0, 204, 0)';
context.textBaseline = 'middle';
context.shadowBlur   = 5;

function getCharAlpha (index, end) {
  return index > end ? 50 - (index - end) : 50;
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCharCode () {
  var code = Math.random() < 0.5 ? getRandomInt(33, 63) : getRandomInt(90, 126);
  return String.fromCharCode(code);
}

function animate () {
  requestAnimationFrame(animate);
  now = Date.now();

  if (now - lastUpdate < 50) {
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  updateVisibleColumns();
  lastUpdate = now;

  for (var i = 0;  i < chars.length; i++) {
    if (!visible[i]) continue;

    for (var j = 0, h = chars[i].length - 6; j < chars[i].length; j++) {
      var color  = j <= (index[i] - 5) ? '0, 204, 0' : j <= (index[i] - 3) ? '187, 255, 187' : '255, 255, 255';
      var alpha  = getCharAlpha(index[i], duration[i]);
      var update = j > h ? 0.25 : 0.02;

      if (alpha === 0) {
        duration[i] = getRandomInt(rows, 100);
        index[i] = 0;
      }

      var a = +(chars[i].length / (chars[i].length - j)).toFixed(1) / 100;
      alpha = j < index[i] ? alpha * Math.min(a, 0.2) : 0;

      context.fillStyle = `rgba(${color}, ${alpha})`;
      context.fillText(chars[i][j], i * offset, j * lineHeight);

      if (Math.random() < update) {
        chars[i][j] = getCharCode();
      }
    }

    index[i]++;
  }
}

function onResize () {
  var currentRows = rows;
  var currentColumns = columns;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  
  rows = Math.ceil(window.innerHeight / 26);
  columns = Math.ceil(window.innerWidth / offset);
  
  context.font         = 'normal 24px Matrix Code NFI';
  context.fillStyle    = 'rgba(0, 204, 0, 1)';
  context.shadowColor  = 'rgb(0, 204, 0)';
  context.textBaseline = 'middle';
  context.shadowBlur   = 5;

  var newColumns = columns - currentColumns;
  var newRows = rows - currentRows;

  if (newRows > 0 && newColumns > 0) {
    var newDuration = Array.from(new Array(newColumns), d => getRandomInt(rows, 100));
    var newVisible = Array.from(new Array(newColumns), v => false);
    var newIndex = Array.from(new Array(newColumns), i => 0);

    chars = [];

    for (var i = 0; i < columns; i++) {
      var column = new Array(rows);

      for (var j = 0; j < rows; j++) {
        column[j] = getCharCode();
      }

      chars.push(column);
    }

    duration.push(...newDuration);
    visible.push(...newVisible);
    index.push(...newIndex);
  } else if (newRows < 0 && newColumns < 0) {
    var columnsDiff = Math.abs(newColumns);
    var indexLength = index.length - columnsDiff;
    var columnsLength = chars.length - columnsDiff;
    var visibleLength = visible.length - columnsDiff;
    var durationLength = duration.length - columnsDiff;

    duration = duration.slice(0, durationLength);
    visible = visible.slice(0, visibleLength);
    chars = chars.slice(0, columnsLength);
    index = index.slice(0, indexLength);
  }
}

function updateVisibleColumns () {
  if (visible.includes(false)) {
    var i = getRandomInt(0, columns);
    visible[i] = Math.random() < 0.5 || visible[i];
  }
}

(function init () {
  duration = Array.from(new Array(columns), d => getRandomInt(rows, 100));
  visible = Array.from(new Array(columns), v => false);
  index = Array.from(new Array(columns), i => 0);

  for (var i = 0; i < columns; i++) {
    var column = new Array(rows);

    for (var j = 0; j < rows; j++) {
      column[j] = getCharCode();
    }

    chars.push(column);
  }

  window.addEventListener('resize', onResize);
  requestAnimationFrame(animate);
})();
