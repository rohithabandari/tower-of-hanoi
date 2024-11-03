let delay = 1000; 
let outputElement = document.getElementById('output');

function startTowerOfHanoi() {
    const numDisks = parseInt(document.getElementById('numDisks').value);
    if (numDisks < 1 || numDisks > 10) {
        alert("Please enter a number of disks between 1 and 10.");
        return;
    }
    const moves = [];
    towerOfHanoi(numDisks, 'A', 'C', 'B', moves);
    animateMoves(moves);
}

function towerOfHanoi(n, source, target, auxiliary, moves) {
    if (n === 1) {
        moves.push({ disk: 1, from: source, to: target });
        return;
    }
    towerOfHanoi(n - 1, source, auxiliary, target, moves);
    moves.push({ disk: n, from: source, to: target });
    towerOfHanoi(n - 1, auxiliary, target, source, moves);
}

function animateMoves(moves) {
    outputElement.innerHTML = ''; // Clear previous output
    let index = 0;

    function step() {
        if (index < moves.length) {
            const { disk, from, to } = moves[index];
            outputElement.innerHTML += Move disk ${disk} from Tower ${from} to Tower ${to}<br>;
            moveDisk(disk, from, to);
            index++;
            setTimeout(step, delay);
        }
    }

    step();
}

function moveDisk(disk, from, to) {
    const diskElement = document.createElement('div');
    diskElement.className = 'disk disk-' + disk;
    const tower = document.getElementById('tower' + from);
    tower.appendChild(diskElement);
    
    // Animate the disk movement
    setTimeout(() => {
        const targetTower = document.getElementById('tower' + to);
        targetTower.appendChild(diskElement);
    }, delay);
}
