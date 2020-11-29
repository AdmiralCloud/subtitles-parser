const parser = require('../')
const fs = require('fs')
const should = require('should')

const srt = fs.readFileSync('./test/files/srt/latin.srt', { encoding: 'utf-8' });

describe('subtitles-parser', function() {

    describe('testing SubRip part', function() {
        var data;

        it('parser.fromSrt() should execute without crashes', function() {
             data = parser.fromSrt(srt);
        });

        it('parser.fromSrt() should return array', function() {
            data.should.be.an.instanceOf(Array);
        });

        it('parser.fromSrt() should contain valid subtitle objects', function() {
            for (var i in data) {
                var s = data[i];
                s.should.have.property('id');
                s.should.have.property('startTime');
                s.should.have.property('endTime');
                s.should.have.property('text');
            }
        });

        var originalData;
        it('parser.toSrt() should execute without crashes', function() {
             originalData = parser.toSrt(data);
        });

        it('parser.toSrt() should convert object back as it was before without changes', function() {
            (srt.trim() === originalData.trim()).should.be.ok;
        });

        var dataMs;
        it('parser.fromSrt() should successfully convert time to ms', function() {
            dataMs = parser.fromSrt(srt, true);
        });

        var originalDataMs;
        it('parser.toSrt() should execute without crashes when using ms', function() {
             originalDataMs = parser.toSrt(data);
        });

        it('parser.fromSrt() should convert object with ms back as it was before without changes', function() {
            (srt.trim() === originalDataMs.trim()).should.be.ok;
        });
    });
});

describe('non latin languages', () => {
    const languages = [
        { file: 'latin' },
        { file: 'hindi', lang: 'hin' },
        { file: 'kannada', lang: 'kan' },
        { file: 'thai', lang: 'tha' }
    ]
    languages.forEach(lang => {
        describe(`Language ${lang.file}`,  () => {
            const srt = fs.readFileSync(`./test/files/srt/${lang.file}.srt`, { encoding: 'utf-8' });
            const expectedJson = require(`./files/js/${lang.file}`)
        
            let data
            
            it('parser.fromSrt() should execute without crashes', function() {
                data = parser.fromSrt(srt, { language: lang.lang });
            });
        
            it('parser.fromSrt() should return array', function() {
                data.should.be.an.instanceOf(Array)
                data.should.have.length(expectedJson.length)
            });
        
            it('parser.fromSrt() should contain valid subtitle objects', function() {
                for (let i in expectedJson) {
                    let s = data[i]
                    let check = expectedJson[i]
        
                    s.should.have.property('id');
                    s.should.have.property('startTime', check.startTime);
                    s.should.have.property('endTime', check.endTime);
                    s.should.have.property('text', check.text);
                }
            });
        })
    })

})