var worker = new Worker('worker.js'),
    solveBtn, generateBtn, checkBtn, clearBtn,
    grid, cells, overlay, errorMsg,
    startTime,
    USE_WORKER = true;

var sudokuGridStr = "000000000040630009000000000000000000008079002000000608000008060019700000070040000";

function load() {
    initGrid(sudokuGridStr);
    initButtons();

    worker.onmessage = onWorkerMessageReceived;
}

function initGrid(sudokuGridStr) {
    grid = document.getElementById('grid');
    cells = grid.getElementsByTagName('td');
    overlay = document.getElementById('overlay');
    errorMsg = document.getElementById('errorMsg');
    errorMsg.addEventListener('click', closeError);

    fillGrid(sudokuGridStr, true);
}

function fillGrid(gridStr, isNewGrid) {
    isNewGrid = isNewGrid || false;

    for(var i=0, n=gridStr.length; i<n; ++i) {
        if(gridStr[i] != '0') {
            cells[i].innerHTML = gridStr[i];
            cells[i].removeAttribute('contenteditable');

            if(isNewGrid) cells[i].style.color = 'black';
        }
        else {
            cells[i].innerHTML = '';
            cells[i].style.color = 'blue';

            cells[i].setAttribute('contenteditable', 'true');
            cells[i].addEventListener('keypress', checkValidKey);
        }
    }
}

function getGridStr() {
    var str = '';
    for(var i=0, n=cells.length; i<n; ++i) {
        str += cells[i].innerHTML[0] | 0;
    }
    return str;
}

function clearGrid() {
    for(var i=0, n=cells.length; i<n; ++i) {
        sudokuGridStr[i] = 0;
        cells[i].innerHTML = '';
        cells[i].style.color = 'blue';
        cells[i].setAttribute('contenteditable', 'true');
    }
}

function checkValidKey(e) {
    if(e.which == 8 || // backspace
        (e.which >= 49 &&  // 1
        e.which <= 57 && // 9
        (e.currentTarget.innerHTML == '' || e.currentTarget.innerHTML == '<br>'))
    ) {
        return true;
    }
    e.preventDefault();
    return false;
}

function enableOverlay(enable) {
    overlay.style.display = enable ? 'block' : 'none';
}

function enableButtons(enable) {
    var btns = [solveBtn, generateBtn, clearBtn, checkBtn, workerBtn];
    if(enable)
        for(var i=0, n=btns.length; i<n; ++i)
            btns[i].removeAttribute('disabled');
    else
        for(var i=0, n=btns.length; i<n; ++i)
            btns[i].setAttribute('disabled', '');
}

function initButtons() {
    generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', function(e) {
        startTime = Date.now();
        enableButtons(false);
        enableOverlay(true);

        var content = {
            action: 'generate'
        };

        if(USE_WORKER) worker.postMessage(content);
        else {
            var sudoku = new Sudoku();
            sudoku.generate();

            onWorkerMessageReceived({
                data: {
                    action: 'generate',
                    solved: sudoku.solved,
                    cycles: sudoku.cycles,
                    gridStr: sudoku.getDataStr()
                }
            });
        }
    }, false);

    //Worker
    var workerBtn = document.getElementById('workerBtn'),
        workerStatus = document.getElementById('workerStatus');

    workerStatus.innerHTML = USE_WORKER ? 'ON' : 'OFF';
    workerBtn.addEventListener('click', function(e) {
        USE_WORKER = !USE_WORKER;

        workerStatus.innerHTML = USE_WORKER ? 'ON' : 'OFF';
    });

    //Check
    checkBtn = document.getElementById('checkBtn');
    checkBtn.addEventListener('click', function(e) {
        startTime = Date.now();
        enableButtons(false);
        enableOverlay(true);

        var content = {
            action: 'check',
            gridStr: getGridStr()
        };

        if(USE_WORKER) worker.postMessage(content);
        else {
            var sudoku = new Sudoku();
            sudoku.setData(sudokuGridStr);
            var canBeSolved = sudoku.check();

            onWorkerMessageReceived({
                data: {
                    action: 'check',
                    canBeSolved: canBeSolved
                }
            });
        }
    });

    //Solve
    solveBtn = document.getElementById('solveBtn');
    solveBtn.addEventListener('click', function(e) {
        startTime = Date.now();
        enableButtons(false);
        enableOverlay(true);

        sudokuGridStr = getGridStr();

        var content = {
            action: 'solve',
            gridStr: sudokuGridStr
        };

        if(USE_WORKER) worker.postMessage(content);
        else {
            var sudoku = new Sudoku();
            sudoku.setData(sudokuGridStr);
            sudoku.solve();

            onWorkerMessageReceived({
                data: {
                    action: 'solve',
                    solved: sudoku.solved,
                    cycles: sudoku.cycles,
                    gridStr: sudoku.getDataStr()
                }
            });
        }
    }, false);

    //Clear
    clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', function(e) {
        clearGrid();
    });

}

function onWorkerMessageReceived(event) {
    var t = ((Date.now()-startTime)*0.001).toFixed(3);

    if(event.data.action == 'solve') {
        if(event.data.solved) {
            console.log('Solved in '+event.data.cycles+' cycles, in ' + t + ' secs');
            fillGrid(event.data.gridStr);
            enableOverlay(false);
            enableButtons(true);
        }
        else {
            showError('There is no solution for this grid');
        }
    }
    else if(event.data.action == 'check') {
        if(event.data.canBeSolved)
            showError('The current grid can be solved. Keep going!');
        else
            showError('No solution could be found with the current data.');
    }
    else if(event.data.action == 'generate') {
        enableOverlay(false);
        enableButtons(true);
        sudokuGridStr = event.data.gridStr;
        console.log('Generated in '+event.data.cycles+' cycles, in ' + t + ' secs => ' + sudokuGridStr);
        fillGrid(sudokuGridStr, true);
    }
}

function showError(msg) {
    errorMsg.innerHTML = msg + '<p>(Click to close)</p>';
    errorMsg.style.display = 'block';
}

function closeError() {
    errorMsg.style.display = 'none';
    enableOverlay(false);
    enableButtons(true);
}