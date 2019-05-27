// translate string
translate = (str) => {
    const source = document.querySelector('#source')
    source.value = str + '\n'
}

// translate song tile & notify
translateSong = (song) => {
    console.log('translateSong', song)
    const songTitle = song.split('-')[1].trim()

    const translateResult = document.querySelector('.tlid-translation.translation')
    if (!translateResult) {
        console.error('Can\'t find translate result element')
        return;
    }

    let prevResult = ''
    prevResult = translateResult.textContent;
    console.log('prev result', prevResult)

    // Simulate key input
    const source = document.querySelector('#source')
    source.value = songTitle + '\n'

    let counter = 0;
    const timer = setInterval(() => {
        const translateResult = document.querySelector('.tlid-translation.translation')
        const result = translateResult.textContent

        counter++;
        console.log(`result ${result}, counter ${counter}`)

        // why `...` string is added ???
        if (prevResult && prevResult !== result && prevResult + '...' !== result) {
            clearInterval(timer)

            console.log('--> Notifying:  prev=' + prevResult, 'cur=' + result)

            new Notification('Now Playing', {
                body: song + '\n' + result
            })
            return
        }

        if (counter > 10) clearInterval(timer)
    }, 500)
}
