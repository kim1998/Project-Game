//=============================================================================
// Multiline Choices
// MRP_MultilineChoices.js
// By Magnus0808 || Magnus Rubin Peterson
// Version 1.2
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Enables multiline choices
 * @author Magnus0808
 *
 * @help Insert \n to add a line break in a choice. E.g.
 *      This is line 1 of choice 1\n This is line 2 of choice 1
 * 
 *      Change log:
 *      1.2 - Fixed escape characters not working
 *      1.1 - Fixed issue with not being able to see part of the top choice when
 *            scrolling down.
 *      1.0 - Initial release
 */

var Imported = Imported || {};
Imported.MRP_MultilineChoices = true;

var MRP = MRP || {};
MRP.MultilineChoices = MRP.MultilineChoices || {};

(function() {
    
    MRP.MultilineChoices.Window_ChoiceList_processEscapeCharacter = Window_ChoiceList.prototype.processEscapeCharacter;
    Window_ChoiceList.prototype.processEscapeCharacter = function(code, textState) {
        MRP.MultilineChoices.Window_ChoiceList_processEscapeCharacter.call(this, code, textState);
        switch (code) {
            case 'N':
                this.processNewLine(textState);
                textState.index++;
                break;
        }
    };

    Window_ChoiceList.prototype.totalLinesNeeded = function() {
        let lines = 0;
        for(let i = 0; i < $gameMessage.choices().length; i++){
            lines += this.linesNeeded(i);
        }
        return lines;
    }

    Window_ChoiceList.prototype.linesNeeded = function(index) {
        const choice =  $gameMessage.choices()[index];
        if(choice){
            return choice.split("\\n").length;
        } else {
            return 0;
        }
    }

    Window_ChoiceList.prototype.numVisibleRows = function() {
        return Math.min(this.totalLinesNeeded(), this.maxLines());
    };
    
    Window_ChoiceList.prototype.maxRows = function() {
        return this.totalLinesNeeded();
    }

    Window_ChoiceList.prototype.row = function() {
        let row = 0;
        for (let i = 0; i < this.index(); i++){
            row += this.linesNeeded(i);
        }
        return row;
    };

    Window_ChoiceList.prototype.topRow = function () {
		var index = 0;
        var y = this.itemHeight() * this.linesNeeded(0);
		while(this._scrollY >= y) {
			var lines = this.linesNeeded(index + 1);
			if(lines > 0) {
				y += this.itemHeight() * lines;
				index++;
			} else {
				break;
			}
		}
		return index;
    }

    MRP.MultilineChoices.Window_ChoiceList_ensureCursorVisible = Window_ChoiceList.prototype.ensureCursorVisible;
    Window_ChoiceList.prototype.ensureCursorVisible = function(smooth) {
        MRP.MultilineChoices.Window_ChoiceList_ensureCursorVisible.call(this, smooth);
        if (this.innerHeight > 0 && this.row() >= 0) {
            const itemTop = this.row() * this.itemHeight();
            const itemBottom = itemTop + this.itemHeight() * this.linesNeeded(this.index());
            const scrollMin = itemBottom - this.innerHeight;
            if (scrollY < scrollMin) {
                if (smooth) {
                    this.smoothScrollTo(0, scrollMin);
                } else {
                    this.scrollTo(0, scrollMin);
                }
            }
        }
    };
    
    Window_Selectable.prototype.cursorDown = function(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
            this.smoothSelect((index + maxCols) % maxItems);
        }
    };
    
    Window_Selectable.prototype.cursorUp = function(wrap) {
        const index = Math.max(0, this.index());
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (index >= maxCols || (wrap && maxCols === 1)) {
            this.smoothSelect((index - maxCols + maxItems) % maxItems);
        }
    };


    Window_ChoiceList.prototype.calcRectY = function(index) {
        if($gameMessage.choices().length == 0) return 0;
        var y = this.rowSpacing() / 2 - this.scrollBaseY();
        for (var i = 0; i < index; i++){
            y += this.itemHeight() * this.linesNeeded(i);
        }
        return y;
    }

    MRP.MultilineChoices.Window_ChoiceList_itemRect = Window_ChoiceList.prototype.itemRect;
    Window_ChoiceList.prototype.itemRect = function(index) {
        const itemHeight = this.itemHeight();
        const rowSpacing = this.rowSpacing();
        let rect = MRP.MultilineChoices.Window_ChoiceList_itemRect.call(this, index);
        rect.y = this.calcRectY(index);
        rect.height = itemHeight * this.linesNeeded(index) - rowSpacing;
        return rect;
    };

    MRP.MultilineChoices.Window_ChoiceList_itemLineRect = Window_ChoiceList.prototype.itemLineRect;
    Window_ChoiceList.prototype.itemLineRect = function(index) {
        let rect = MRP.MultilineChoices.Window_ChoiceList_itemLineRect.call(this, index);
        rect.y -= (this.lineHeight() * (this.linesNeeded(index) - 1)) / 2;
        return rect;
    };
    
})();