    class Peice
    {
        constructor(s, img2, array) {
            array[array.length] = new Array;
            array[array.length - 1][0] = new Array;
            this.symbol = s;
            this.imageFile = img2;
            this.image = document.createElement('img');
            let img = this.image;
            img.style.left = 0 + "px";
            img.style.top = 0 + "px";
            img.src = this.imageFile;
            img.style.width = 200 + "px";
            img.style.height = 100 + "px";
            img.style.s = s;
            img.classList.add("draggable")
            img.addEventListener('mousedown', (e) => {
                active = this;
                offsetX = e.clientX - this.image.offsetLeft;
                offsetY = e.clientY - this.image.offsetTop;
                this.image.style.cursor = 'grabbing';
                this.image.ondragstart = function () { return false; };
                let oLocate = locateObject(array, this)
                array[oLocate[0]][oLocate[1]][oLocate[2]] = null;
                array[array.length] = new Array;
                array[array.length - 1][0] = new Array;
                array[array.length - 1][0][0] = this;
                console.log(array);
            });


            document.getElementById('body').appendChild(img);
            array[array.length - 1][0][0] = this;
        }
        getImg(P) {
            return P.img;
        }

        getPrint()
        {
            return " " + this.symbol + " ";
        }
    };
    function locateObject(array3D, targetObject) {
        for (let i = 0; i < array3D.length; i++) {
            for (let j = 0; j < array3D[i].length; j++) {
                for (let k = 0; k < array3D[i][j].length; k++) {
                    if (array3D[i][j][k] === targetObject) {
                        return [i, j, k]; // Return the coordinates if found
                    }
                }
            }
        }
        return null; // Return null if not found
    }

