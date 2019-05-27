let Lyric = class Lyric {
    constructor(lrc) {
        this.lrc = lrc
        this.lines = []

        this._init()
    }

    _init() {
        this._initLines()
    }

    _initLines() {
        const lines = this.lrc.split('\n')
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const txt = line.trim()
            this.lines.push({
                txt
            })
        }
    }
}

export default Lyric;
