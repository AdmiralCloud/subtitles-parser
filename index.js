const XRegExp = require('xregexp')

const parser = (function () {
  let pItems = {}

  // https://github.com/slevithan/xregexp/blob/c3342b51c9f9d21ce740aba4d47794b139a8ee6f/tools/output/scripts.js
  const mapping = {
    lao: 'Lao',
    tam: 'Tamil',
    tha: 'Thai',
    hin: 'Devanagari',
    kan: 'Kannada'
  }

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
     * Now, the SRT
     *
     * @param  {String}  data SubRip suntitles string
     * @param  {Boolean} ms   Optional: use milliseconds for startTime and endTime
     * @return {Array}
     */
  pItems.fromSrt = function (data, options = {}) {
    const useMs = options.useMs
    const language = options.language

    let regex = '(\\d+)\\n' // Identifier (optional?, can it be a string?)
    regex += '(\\d{1,2}:\\d{2}:\\d{2},\\d{3}) --> (\\d{1,2}:\\d{2}:\\d{2},\\d{3})' // CUE
    regex += '(( \\S{1,}:[\\d|\\S]{1,}){0,})\\n' // OPTIONAL INSTRUCTIONS
    //regex += '(([\\pN\\pL\\pP\\pS\\p{Z}]{1,}\\n)([\\pN\\pL\\pP\\pS\\p{Z}]{1,}\\n{0,1}){0,})'
    regex += '(([\\pN\\pL\\pP\\pS\\p{Z}].*\\n){1,})'

    if (language && mapping[language]) {
      regex = regex.replace(/p{Z}/g, 'p{Z}\\p{' + mapping[language] + '}')
    }

    const items = []
    data = data.replace(/\r/g, '')
    XRegExp.forEach(data, XRegExp(regex, 'gu'), (match) => {
      let cueboxArray = match[4].trim().split(' ')
      let cuebox = {}
      let cueboxHasValue
      cueboxArray.forEach(item => {
        let split = item.split(':')
        if (split[1]) {
          cuebox[split[0]] = split[1]
          cueboxHasValue = true
        }
      })
      let item = {
        id: match[1].trim(),
        startTime: useMs ? timeMs(match[2].trim()) : match[2].trim(),
        endTime: useMs ? timeMs(match[3].trim()) : match[3].trim(),
        text: match[6].trim()
      }
      if (cueboxHasValue) {
        item.settings = {
          cuebox
        }
      }
      items.push(item)
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
