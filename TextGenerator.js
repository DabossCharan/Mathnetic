function downloadTextFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function getFile(listOfBlocks) {
    let stringGen = "";
    for (let z = 0; z < listOfBlocks.length; z++) {
        for (let y = 0; y < listOfBlocks[z].length; y++) {
            for (let x = 0; x < listOfBlocks[z][y].length; x++) {
                if (listOfBlocks[z][y][x])
                    stringGen += listOfBlocks[z][y][x].getPrint();
            };
            stringGen += "\n";
        };
        stringGen += "\n\n//////////////////////////////////////////\n\n";
    };
    return stringGen;
}