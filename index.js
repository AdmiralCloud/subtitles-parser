const XRegExp = require('xregexp')

const parser = (function () {
  let pItems = {}

  /**
     * Converts SubRip subtitles into array of objects
     * [{
     *     id:        `Number of subtitle`
     *     startTime: `Start time of subtitle`
     *     endTime:   `End time of subtitle
     *     text: `Text of subtitle`
     * }]
     * 
     * The challenge is to distinguish between text that starts with numbers and new subtitle (which also start with a number)
     * 
     * Allow text to begin with an optional number, an optional character (see below) a space and text or just text
     * E.g.
     * 123 people
     * 123% of the revenue
     * The revenue
     * 
     * Allowed characters immediately after a number
     * ! - 0021
     * # - 0023
     * $ - 0024
     * % - 0025
     * & - 0026
     * * - 002a
     * + - 002b
     * § - 00a7
     *
     * @param  {String}  data SubRip suntitles string
     * @param  {Boolean} ms   Optional: use milliseconds for startTime and endTime
     * @return {Array}  
     */
  pItems.fromSrt = function (data, ms) {
    const useMs = !!ms
    let regex = '(\\d+)\\n(\\d{1,2}:\\d{2}:\\d{2},\\d{3}) --> (\\d{1,2}:\\d{2}:\\d{2},\\d{3})\\n'
        regex+= '((((\\d{0,}[\\u{0021}\\u{0023}\\u{0024}\\u{0025}\\u{0026}\\u{002a}\\u{002b}\\u{00a7}]{0,}\\s{1}){1,}[\\pL\\pP\\pS].*\\n)|([\\pL\\pP\\pS].*\\n)){1,})'
    const items = []

    data = data.replace(/\r/g, '')

    XRegExp.forEach(data, XRegExp(regex, 'gu'), (match, i) => {
      items.push({
        id: match[1].trim(),
        startTime: useMs ? timeMs(match[2].trim()) : match[2].trim(),
        endTime: useMs ? timeMs(match[3].trim()) : match[3].trim(),
        text: match[4].trim()
      })
    })

    return items
  }

  /**
     * Converts Array of objects created by this module to SubRip subtitles
     * @param  {Array}  data
     * @return {String}      SubRip subtitles string
     */
  pItems.toSrt = function (data) {
    if (!(data instanceof Array)) return ''
    let res = ''

    for (let i = 0; i < data.length; i++) {
      let s = data[i]

      if (!isNaN(s.startTime) && !isNaN(s.endTime)) {
        s.startTime = msTime(parseInt(s.startTime, 10))
        s.endTime = msTime(parseInt(s.endTime, 10))
      }

      res += s.id + '\r\n'
      res += s.startTime + ' --> ' + s.endTime + '\r\n'
      res += s.text.replace('\n', '\r\n') + '\r\n\r\n'
    }

    return res
  }

  const timeMs = function (val) {
    let regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/
    let parts = regex.exec(val)

    if (parts === null) {
      return 0
    }

    for (let i = 1; i < 5; i++) {
      parts[i] = parseInt(parts[i], 10)
      if (isNaN(parts[i])) parts[i] = 0
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4]
  }

  let msTime = function (val) {
    const measures = [ 3600000, 60000, 1000 ]
    let time = []

    for (let i in measures) {
      let res = (val / measures[i] >> 0).toString()

      if (res.length < 2) res = '0' + res
      val %= measures[i]
      time.push(res)
    }

    let ms = val.toString()
    if (ms.length < 3) {
      for (let i = 0; i <= 3 - ms.length; i++) ms = '0' + ms
    }

    return time.join(':') + ',' + ms
  }

  return pItems
})()

// ignore exports for browser
if (typeof exports === 'object') {
  module.exports = parser
}
