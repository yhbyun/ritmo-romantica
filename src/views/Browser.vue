<template>
    <div id="browser" class="w-full h-full">
        <nav id="navigation">
            <div id="back">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z"/></svg>
            </div>
            <div id="forward">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></svg>
            </div>
            <div id="refresh">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M1639 1056q0 5-1 7-64 268-268 434.5t-478 166.5q-146 0-282.5-55t-243.5-157l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138q-148-137-349-137-134 0-250 65t-186 179q-11 17-53 117-8 23-30 23h-199q-13 0-22.5-9.5t-9.5-22.5v-7q65-268 270-434.5t480-166.5q146 0 284 55.5t245 156.5l130-129q19-19 45-19t45 19 19 45z"/></svg>
            </div>
            <div id="omnibox">
                <input type="text" id="url">
            </div>
            <div id="fave">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"/></svg>
            </div>
            <div id="fave-popup" data-state="closed">
            </div>
            <div id="list">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M256 1312v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm1536 768v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5zm-1536-1152v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm1536 768v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5z"/></svg>
            </div>
            <div id="console">
               <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M649 983l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23zm1079 457v64q0 14-9 23t-23 9h-960q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h960q14 0 23 9t9 23z"/></svg>
            </div>
        </nav>
        <div id="views" class="w-full h-full">
            <webview id="view" class="w-full h-full" src="https://www.google.com/" autosize="on"></webview>
        </div>
    </div>
</template>

<script>
/* global __static */

import fetchFavicon from 'favicon-getter'
import jsonfile from 'jsonfile'
import path from 'path'
import uuid from 'uuid'

var Bookmark = function (id, url, faviconUrl, title) {
    this.id = id
    this.url = url
    this.icon = faviconUrl
    this.title = title
}

Bookmark.prototype.ELEMENT = function () {
    var a_tag = document.createElement('a')
    a_tag.href = this.url
    a_tag.className = 'link'
    a_tag.textContent = this.title
    var favimage = document.createElement('img')
    favimage.src = this.icon
    favimage.className = 'favicon'
    a_tag.insertBefore(favimage, a_tag.childNodes[0])
    return a_tag
}

let bookmarks = path.resolve(__static, './bookmarks.json')

export default {
    name: 'browser',
    mounted() {
        const back = document.querySelector('#back'),
            forward = document.querySelector('#forward'),
            refresh = document.querySelector('#refresh'),
            omni = document.querySelector('#url'),
            dev = document.querySelector('#console'),
            fave = document.querySelector('#fave'),
            list = document.querySelector('#list'),
            popup = document.querySelector('#fave-popup'),
            view = document.querySelector('#view')

        refresh.addEventListener('click', this.reloadView)
        back.addEventListener('click', this.backView)
        forward.addEventListener('click', this.forwardView)
        omni.addEventListener('keydown', this.updateURL)
        fave.addEventListener('click', this.addBookmark)
        list.addEventListener('click', this.openPopUp)
        popup.addEventListener('click', this.handleUrl)
        dev.addEventListener('click', this.handleDevtools)
        view.addEventListener('did-finish-load', this.updateNav)
    },
    methods: {
        reloadView() {
            const view = document.querySelector('#view')
            view.reload();
        },
        backView() {
            const view = document.querySelector('#view')
            view.goBack();
        },
        forwardView() {
            const view = document.querySelector('#view')
            view.goForward();
        },
        updateURL(event) {
            if (event.keyCode === 13) {
                const omni = document.querySelector('#url')
                const view = document.querySelector('#view')

                omni.blur()
                let val = omni.value
                let https = val.slice(0, 8).toLowerCase()
                let http = val.slice(0, 7).toLowerCase()
                if (https === 'https://') {
                    view.loadURL(val)
                } else if (http === 'http://') {
                    view.loadURL(val)
                } else {
                    view.loadURL('http://'+ val)
                }
            }
        },
        addBookmark() {
            const view = document.querySelector('#view')

            let url = view.src
            let title = view.getTitle()
            fetchFavicon(url).then(function (fav) {
                let book = new Bookmark(uuid.v1(), url, fav, title)
                jsonfile.readFile(bookmarks, function(err, curr) {
                    curr.push(book)
                    jsonfile.writeFile(bookmarks, curr, function (err) {
                    })
                })
            })
        },
        openPopUp() {
            const popup = document.querySelector('#fave-popup')

            let state = popup.getAttribute('data-state')
            if (state === 'closed') {
                popup.innerHTML = ''
                jsonfile.readFile(bookmarks, function(err, obj) {
                    if (obj.length !== 0) {
                        for (var i = 0; i < obj.length; i++) {
                            let url = obj[i].url
                            let icon = obj[i].icon
                            let id = obj[i].id
                            let title = obj[i].title
                            let bookmark = new Bookmark(id, url, icon, title)
                            let el = bookmark.ELEMENT()
                            popup.appendChild(el)
                        }
                    }
                    popup.style.display = 'block'
                    popup.setAttribute('data-state', 'open')
                })
            } else {
                popup.style.display = 'none'
                popup.setAttribute('data-state', 'closed')
            }
        },
        handleUrl(event) {
            const view = document.querySelector('#view')

            if (event.target.className === 'link') {
                event.preventDefault();
                view.loadURL(event.target.href);
            } else if (event.target.className === 'favicon') {
                event.preventDefault();
                view.loadURL(event.target.parentElement.href);
            }
        },

        handleDevtools() {
            const view = document.querySelector('#view')

            if (view.isDevToolsOpened()) {
                view.closeDevTools();
            } else {
                view.openDevTools();
            }
        },

        updateNav() {
            const omni = document.querySelector('#url')
            const view = document.querySelector('#view')

            omni.value = view.src
        }

    },
}
</script>

<style lang="scss" scoped>
@import '_reset.scss';

$white: #EEEEEE;
$blue:  #070F4E;
$black: #333333;
$buttons_Width: 180px;

.common-buttons {
    float: left;
    display: block;
    width: $buttons_Width / 6;
    font-size: 20px;
    color: $white;
    i, svg {
        cursor: pointer;
    }
}

#navigation {
    width: 100%;
    height: 28px;
    background: $blue;
    display: block;
    top: 0;
    left: 0;
    border-bottom: 2px solid darken($blue, 10%);
    box-sizing: border-box;
    padding-top: 3px;
    #back {
        @extend .common-buttons;
    }
    #forward {
        @extend .common-buttons;
    }
    #refresh {
        @extend .common-buttons;
    }
    #fave {
        @extend .common-buttons;
    }
    #list {
        @extend .common-buttons;
    }
    #omnibox {
        float: left;
        display: block;
        width: calc(100% - #{$buttons_Width});
        color: #333333;
        input {
            border: none;
            outline: none;
            height: 18px;
            width: 90%;
            border-radius: 2px;
            padding-left: 1px;
            color: $black;
            font-family: monospace;
            margin-top: -1px;
        }
    }
    #console {
        @extend .common-buttons;
    }
    #fave-popup {
        display: none;
        position: fixed;
        right: 1px;
        color: $white;
        top: 29px;
        width: 180px;
        height: 200px;
        z-index: 20;
        padding: 1px;
        overflow-y: auto;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: $blue;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        ::v-deep .link {
            width: 100%;
            height: 32px;
            color: $white;
            font-family: monospace;
            font-size: 13px;
            text-decoration: none;
            text-align: left;
            display: block;
            line-height: 32px;
        }
        ::v-deep .favicon {
            width: 32px;
            height: 32px;
            float: left;
            background: $white;
            margin-right: 4px;
        }
    }
}
</style>
