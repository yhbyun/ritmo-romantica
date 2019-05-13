const {ipcRenderer, remote} = require('electron')

onload = () => {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true }

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type == 'childList') {
                const text = mutation.target.textContent.trim()
                // console.log(mutation.target, text)

                if (mutation.target.id === 'titletext' ||
                    (mutation.target.id === 'status' && text === 'Status: On Air')) {
                    const msg = songMessage(artistElement.textContent, titleElement.textContent)
                    notify(msg)
                }
            } else if (mutation.type == 'attributes') {
                // console.log('The ' + mutation.attributeName + ' attribute was modified.')
            }
        }
    };

    const titleElement = document.querySelector('#titletext')
    const artistElement = document.querySelector('#artisttext')
    const statusElement = document.querySelector('#status')

    // Create an observer instance linked to the callback function
    let observer = new MutationObserver(callback)
    // Start observing the target node for configured mutations
    observer.observe(titleElement, config)

    observer = new MutationObserver(callback)
    observer.observe(statusElement, config)

    if (statusElement.textContent.trim() === 'Status: On Air') {
        const msg = songMessage(artistElement.textContent, titleElement.textContent)
        notify(msg)
    }
}

const songMessage = function (song, singer) {
    return song + ' - ' + singer;
}

const notify = function (msg) {
    // send main process
    ipcRenderer.send('song-updated', msg)

    // html5 notification
    new Notification('Now Playing', {
        body: msg
    })
}