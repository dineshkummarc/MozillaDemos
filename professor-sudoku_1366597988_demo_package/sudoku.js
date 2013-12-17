function Sudoku() {
    this.dataArr = [];
    this.cycles = 0;
    this.solved = false;
}

Sudoku.prototype = {

    setData: function(dataStr) {
        if(dataStr.length != 81) throw 'The grid string should contain 81 numbers';
        this.dataArr = dataStr.split('').map(function(x) { return x | 0; });
    },
    getData: function() {
        return this.dataArr;
    },
    getDataStr: function() {
        return this.dataArr.join('');
    },

    getRandomValue: function(len)
    {
        return Math.random() * len | 0;
    },

    check: function() {
        for(i=0; i<81; ++i) {
            if(this.dataArr[i] != 0 && !this._isValid(i, this.dataArr[i])) return false;
        }

        return true;
    },

    generate: function() {
        var i, n, that = this,
            cellValue,
            cellValueIdx,
            randomValue,
            cellsPossiblesValues = new Array(81),
            possiblesValues;

        function resetValues(cellIdx) {
            that.dataArr[cellIdx] = 0;
            cellsPossiblesValues[cellIdx] = '123456789'.split('').map(function(x) { return x | 0; });
        }

        this.cycles = 0;
        this.dataArr = new Array(81);
        for(i=0, n=this.dataArr.length; i<n; ++i) {
            resetValues(i);
        }

        // First, we generate a full grid
        i=0;
        n=this.dataArr.length;
        while(i<n) {
            possiblesValues = cellsPossiblesValues[i].slice(0);
            this.dataArr[i] = 0;

            while(possiblesValues.length > 0) {
                ++this.cycles;
                randomValue = this.getRandomValue(possiblesValues.length);
                cellValue = possiblesValues.splice(randomValue, 1)[0];

                if(this._isValid(i, cellValue)) {
                    this.dataArr[i] = cellValue;
                    cellValueIdx = cellsPossiblesValues[i].indexOf(cellValue);
                    if(cellValueIdx == -1) throw 'CellValueIdx should not be -1';
                    cellsPossiblesValues[i].splice(cellValueIdx, 1);
                    break;
                }
            }

            if(possiblesValues.length == 0 && this.dataArr[i] == 0) {
                resetValues(i);

                if(i==0) throw 'Should not happen';

                --i; // previous cell
            }
            else {
                ++i; // next cell
            }
        }

        // Then, we remove enough cells to only keep 17 random values, and at least 1 value by square
        var cells = this.dataArr.slice(0);
        for(i=0, n=81-17; i<n;++i) {
            while( 1 ) {
                randomValue = this.getRandomValue(81);
                if(this.dataArr[randomValue] != 0 && !this._isSquareSingleValue(randomValue)) {
                    this.dataArr[randomValue] = 0;
                    break;
                }
            }
        }

        return;

    },

    solve: function() {
        if(!this.check()) return;

        var emptyCells = [],
            i, n, j;

        this.cycles = 0;
        this.solved = false;

        // convert values in int and get empty cells
        for(i=0; i<81; ++i) {
            if(this.dataArr[i] === 0) emptyCells.push(i);
        }

        i=0;
        n=emptyCells.length;
        while(i<n) {
            for(j=this.dataArr[emptyCells[i]]+1; j<10; ++j) {
                ++this.cycles;

                if(this._isValid(emptyCells[i], j)) {
                    this.dataArr[emptyCells[i]] = j;
                    break;
                }
            }
            if(j == 10) {
                this.dataArr[emptyCells[i]] = 0;

                // first cell and no solution
                if(i == 0) {
                    // No Solution :/
                    return;
                }

                // go back to previous cell
                --i;
            }
            else {
                // next cell
                ++i;
            }
        }

        this.solved = true;
    },

    _isValid: function(cell, value) {
        var i, n, j, k,
            line = Math.floor(cell/9),
            column = Math.floor(cell%9),
            squareLine = Math.floor(line/3),
            squareColumn = Math.floor(column/3);

        // check lines
        for(i=line*9, n=i+9; i<n; ++i) {
            if(i != cell && this.dataArr[i] == value) return false;
        }

        // check colums
        for(i=column, n=i+81; i<n; i+=9) {
            if(i != cell && this.dataArr[i] == value) return false;
        }

        // check square
        for(j=squareColumn*3, k=j+3; j<k; ++j) {
            for(i=squareLine*27, n=i+27; i<n; i+=9) {
                if(i+j != cell && this.dataArr[i+j] == value) return false;
            }
        }

        return true;
    },

    _isSquareSingleValue: function(cell) {
        var i, n, j, k,
            line = Math.floor(cell/9),
            column = Math.floor(cell%9),
            squareLine = Math.floor(line/3),
            squareColumn = Math.floor(column/3),
            valueFound = false;

        // check square
        for(j=squareColumn*3, k=j+3; j<k; ++j) {
            for(i=squareLine*27, n=i+27; i<n; i+=9) {
                if(this.dataArr[i+j] != 0) {
                    if(valueFound) return false;
                    valueFound = true;
                }
            }
        }

        return valueFound;
    }
};