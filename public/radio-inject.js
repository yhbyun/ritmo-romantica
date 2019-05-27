const {ipcRenderer, remote} = require('electron')

onload = () => {
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true }

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type == 'childList') {
                const text = mutation.target.textContent.trim()

                if (mutation.target.id === 'titletext' ||
                    (mutation.target.id === 'status' && text === 'Status: On Air')) {
                    const msg = songMessage(artistElement.textContent, titleElement.textContent)
                    notifySongUpdated(msg)
                }
            }
        }
    };

    // Detect song change
    const titleElement = document.querySelector('#titletext')
    const artistElement = document.querySelector('#artisttext')
    const statusElement = document.querySelector('#status')

    // Create an observer instance linked to the callback function
    let observer = new MutationObserver(callback)
    // Start observing the target node for configured mutations
    observer.observe(titleElement, config)
    observer.observe(statusElement, config)

    if (statusElement.textContent.trim() === 'Status: On Air') {
        const msg = songMessage(artistElement.textContent, titleElement.textContent)
        notifySongUpdated(msg)
    }

    // mouse right button click
    document.addEventListener('contextmenu', () => ipcRenderer.send('radio-contextmenu'), false)
}

const songMessage = function (song, singer) {
    return song + ' - ' + singer;
}

const notifySongUpdated = function (msg) {
    // send song-updated message to main process
    if (msg !== ' - ') {
        ipcRenderer.send('song-updated', msg)
    }
}

playControl = {
    playSong() {
        document.querySelector('#playButton').click();
    },
    pauseSong() {
        document.querySelector('#pauseButton').click();
    }
}
