importScripts('sudoku.js');

onmessage = function(event) {
    var action = event.data.action,
        sudoku = new Sudoku();

    if(action == 'generate') {
        sudoku.generate();
    }
    else if(action == 'check') {
        sudoku.setData(event.data.gridStr);
        postMessage({
            action: action,
            canBeSolved: sudoku.check()
        });
        return;
    }
    else if(action == 'solve') {
        sudoku.setData(event.data.gridStr);
        sudoku.solve();
    }

    postMessage({
        action: action,
        solved: sudoku.solved,
        cycles: sudoku.cycles,
        gridStr: sudoku.getDataStr()
    });
};