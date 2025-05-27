
const draggables = [];
let active = null;
let highlight = null;
let offsetX = 0, offsetY = 0;
const my3DArray = [];
let direction = null; // 0 up, 1 right, 2 down, 3 left
let objectSnaping = null;



document.addEventListener('mousemove', (e) => {

    
    if (active) {
        active.image.style.left = (e.clientX - offsetX) + 'px';
        active.image.style.top = (e.clientY - offsetY) + 'px';
        let foundHighlight = false;
        draggables.forEach((img) => {
            console.log(draggables);
            if (!img.length) {
                console.log(img);
                console.log(img.image);
                if (img != active) {
                    iWidth = parseInt(img.image.width);
                    iHeight = parseInt(img.image.height);
                    console.log(img.image.style.left);
                    iLeft = parseInt(img.image.style.left);
                    console.log(img.image.style.top);
                    iTop = parseInt(img.image.style.top);

                    aWidth = parseInt(active.image.width);
                    aHeight = parseInt(active.image.height);
                    console.log(active.image.style.left);
                    aLeft = parseInt(active.image.style.left);
                    console.log(active.image.style.top);
                    aTop = parseInt(active.image.style.top);

                    aMidY = aTop + aHeight / 2
                    aMidx = aLeft + aWidth / 2

                    if (aMidY > iTop &&
                        aMidY < iTop + iHeight &&
                        aMidx > iLeft + iWidth &&
                        aMidx < iLeft + iWidth * 2) {
                        if (!highlight) {
                            highlight = active.image.cloneNode();
                            direction = 1;
                            objectSnaping = img;
                            highlight.style.left = iLeft + iWidth + 'px';
                            highlight.style.top = iTop + 'px';
                            const element = document.getElementById("body");
                            element.appendChild(highlight);
                        }
                        foundHighlight = true;
                    }
                    else if (aMidY > iTop &&
                        aMidY < iTop + iHeight &&
                        aMidx > iLeft - iWidth &&
                        aMidx < iLeft) {
                        if (!highlight) {
                            highlight = active.image.cloneNode();
                            direction = 3;
                            objectSnaping = img;
                            highlight.style.left = iLeft - iWidth + 'px';
                            highlight.style.top = iTop + 'px';
                            const element = document.getElementById("body");
                            element.appendChild(highlight);
                        }
                        foundHighlight = true;
                    }
                    else if (aMidY < iTop &&
                        aMidY > iTop - iHeight &&
                        aMidx > iLeft &&
                        aMidx < iLeft + iWidth) {
                        if (!highlight) {
                            highlight = active.image.cloneNode();
                            direction = 0;
                            objectSnaping = img;
                            highlight.style.left = iLeft + 'px';
                            highlight.style.top = iTop - aHeight + 'px';
                            const element = document.getElementById("body");
                            element.appendChild(highlight);
                        }
                        foundHighlight = true;
                    }
                    else if (aMidY < iTop + iHeight * 2 &&
                        aMidY > iTop + iHeight &&
                        aMidx > iLeft &&
                        aMidx < iLeft + iWidth) {
                        if (!highlight) {
                            highlight = active.image.cloneNode();
                            direction = 2;
                            objectSnaping = img;
                            style = "opacity: 0.5;";
                            highlight.style.left = iLeft + 'px';
                            highlight.style.top = iTop + aHeight + 'px';
                            const element = document.getElementById("body");
                            element.appendChild(highlight);
                        }
                        foundHighlight = true;
                    }

                    console.log(direction);

                    console.log(foundHighlight);
                }
            }
        });
        if (!foundHighlight && highlight) {
            highlight.remove();
            highlight = null;
        }
        if (highlight) {
            highlight.ondragstart = function () { return false; };
        }
        cleanNulls3DArray(my3DArray);
        reposition3DArray(my3DArray);
    }
    //draggables = document.querySelectorAll('.draggable');
    //console.debug(draggables);

});

document.addEventListener('mouseup', () => {
    if (highlight) {
        active.image.style.top = highlight.style.top;
        active.image.style.left = highlight.style.left;
        sort3DArray(my3DArray,active,objectSnaping)
        

        highlight.remove();
        highlight = null;
    }
    if (active) {
        active.image.style.cursor = 'grab';
        active = null;
    }
    cleanNulls3DArray(my3DArray);
    console.log(my3DArray);
});

function sort3DArray(array, active, to) {
    cleanNulls3DArray(array)
    const locationS = locateObject(array, to);
    const locationA = locateObject(array, active);

    array[locationA[0]][locationA[1]][locationA[2]] = null;
    plusY = 0
    plusX = 0
    console.log(my3DArray);
    console.log(direction);
    if (direction == 0) {
        for (let i = array[locationS[0]].length; i > locationS[1]; i--) {
            array[locationS[0]][i] = array[locationS[0]][i - 1];
        }
        array[locationS[0]][locationS[1]] = new Array;
        array[locationS[0]][locationS[1]][locationS[2]] = active;
    }
    if (direction == 1) {
        array[locationS[0]][locationS[1]][locationS[2] + 1] = active;
    }
    if (direction == 2) {
        array[locationS[0]][locationS[1] + 1] = new Array;
        array[locationS[0]][locationS[1] + 1][locationS[2]] = active;
    }
    // this causes negitives and would need a full work through
    if (direction == 3) {
        array[locationS[0]][locationS[1]][locationS[2] - 1] = active;
    }

    //cleanNulls3DArray(array);
    //console.log(my3DArray);
    //reposition3DArray(array);

    console.log(my3DArray);
}

// returns false if empty
function cleanNulls3DArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (cleanNulls2DArray(array[i]) == false) {
            array.splice(i, 1);
            i--;
        }
    }
}

// returns false if empty
function cleanNulls2DArray(array) {
    if ( array == null )
    {
        return false;
    }
    for (let i = 0; i < array.length; i++) {
        if (cleanNullsArray(array[i]) == false) {
            array.splice(i, 1);
            i--;
        }
    }
    if (array.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

// returns false if empty
function cleanNullsArray(array) {
    if (array == null) {
        return false;
    }
        for (let i = 0; i < array.length; i++) {
            if (array[i] == null) {
                array.splice(i, 1);
            }
        }
        if (array.length < 1) {
            return false;
        }
        else {
            return true;
        }
    }


    function reposition3DArray(array) {
        for (let i = 0; i < array.length; i++) {
            let base = array[i][0][0];
            let totalHeight = 0;
            for (let j = 0; j < array[i].length; j++) {
                let totalLeft = 0;
                for (let k = 0; k < array[i][j].length; k++) {
                    array[i][j][k].image.style.left = parseInt(base.image.left) + totalLeft + 'px';
                    array[i][j][k].image.style.top = parseInt(base.image.top) + totalHeight + 'px';
                    totalLeft += array[i][j][k].image.width;
                }
                totalHeight += array[i][j][0].image.height;
            }
        }
        console.log("aaaaa");
    }

function locateObject(array3D, targetObject) {
    console.log(array3D);
        for (let i = 0; i < array3D.length; i++) {
            for (let j = 0; j < array3D[i].length; j++) {
                for (let k = 0; k < array3D[i][j].length; k++) {
                    ///console.log(targetObject);
                    console.log(array3D[i][j][k]);
                    if (array3D[i][j][k] === targetObject) {
                        
                        return [i, j, k]; // Return the coordinates if found
                    }
                }
            }
        }
        //console.log(targetObject);
        return null; // Return null if not found
    }

    function create3DArray(rows, cols, depth)
    {
        const array3D = [];
        for (let i = 0; i < rows; i++) {
            array3D[i] = [];
            for (let j = 0; j < cols; j++) {
                array3D[i][j] = new Array(depth);
            }
        }
        return array3D;
    }

