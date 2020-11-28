<a name="1.0.2"></a>

## [1.0.2](https://github.com/mmpro/subtitles-parser/compare/v1.0.1..v1.0.2) (2020-11-28 11:47:19)


### Bug Fix

* **App:** Updated packages | MP | [c83d311c5d6ba419ecaec5c4d069121f86016e90](https://github.com/mmpro/subtitles-parser/commit/c83d311c5d6ba419ecaec5c4d069121f86016e90)    
Updated packages
<a name="1.0.1"></a>

## [1.0.1](https://github.com/mmpro/subtitles-parser/compare/v1.0.0..v1.0.1) (2020-11-27 07:35:27)


### Bug Fix

* **App:** Support Hindi and Kannada | MP | [3cf7e1a9e782b672ba6c9651ba00700cb2cc7e5c](https://github.com/mmpro/subtitles-parser/commit/3cf7e1a9e782b672ba6c9651ba00700cb2cc7e5c)    
Support Hindi and Kannada
<a name="1.0.0"></a>
 
# [1.0.0](https://github.com/mmpro/subtitles-parser/compare/v0.0.3..v1.0.0) (2020-10-06 10:59:46)


### Feature

* **App:** fromSrt now supports object as seconds parameter | MP | [540c290b82e526408bf6d85c78df07ceda46d632](https://github.com/mmpro/subtitles-parser/commit/540c290b82e526408bf6d85c78df07ceda46d632)    
Instead of a boolean value (for useMs) the second value of fromSrt function now is an object with properties useMs and language (for special languages like Lao or Thai).
### Bug Fix

* **App:** Removed franc package | MP | [62c0e862e4b95fa6484189f6841c5c67796cfd5e](https://github.com/mmpro/subtitles-parser/commit/62c0e862e4b95fa6484189f6841c5c67796cfd5e)    
Subtitle parsing now support language parameter but not longer tries to auto-detect the language. That has to be done in your application.
### Documentation

* **App:** Updated README | MP | [b0e61c88b3d99c99c64d8c0dda4b0bb31ae016cc](https://github.com/mmpro/subtitles-parser/commit/b0e61c88b3d99c99c64d8c0dda4b0bb31ae016cc)    
Updated README
## BREAKING CHANGES
* **App:** Second parameter is no longer boolean but an object!
<a name="0.0.3"></a>

## [0.0.3](https://github.com/mmpro/subtitles-parser/compare/v0.0.2..v0.0.3) (2020-10-05 16:52:10)


### Bug Fix

* **App:** Improved handling of languages with special characters like Thai | MP | [3180cdcc62a22352ea61dd216cb6825ae149620f](https://github.com/mmpro/subtitles-parser/commit/3180cdcc62a22352ea61dd216cb6825ae149620f)    
Thai languages uses special characters for vocals and sounds. In order to create a working regex we need to identify the language first (using franc) and then use the appropriate add-on (e.g. p{Thai}) to make the regex work.
### Chores

* **App:** Updated packages | MP | [6a2306463aadd4db9b50f8e37476a161f78882bf](https://github.com/mmpro/subtitles-parser/commit/6a2306463aadd4db9b50f8e37476a161f78882bf)    
Updated packages
<a name="0.0.2"></a>

## [0.0.2](https://github.com/mmpro/subtitles-parser/compare/v0.0.1..v0.0.2) (2020-08-21 18:39:44)


### Bug Fix

* **App:** Typo fix | MP | [870dc9d45aabc08a35c499e57fb20ac37873c47c](https://github.com/mmpro/subtitles-parser/commit/870dc9d45aabc08a35c499e57fb20ac37873c47c)    
Typo fix
<a name="0.0.1"></a>

## [0.0.1](https://github.com/mmpro/ac-api-server/compare/..v0.0.1) (2020-08-21 18:38:24)


### Bug Fix

* **App:** Updated packages and added ac-semantic-release | MP | [1b0f47ed6cd204c53bc260c6086a21594abca42e](https://github.com/mmpro/ac-api-server/commit/1b0f47ed6cd204c53bc260c6086a21594abca42e)    
This package now uses ac-semantic-release for release management. Also updated packages.
### Documentation

* **example:** Add require for parser | [15abbd7f39707693225e92a2c08e04e99922e109](https://github.com/mmpro/ac-api-server/commit/15abbd7f39707693225e92a2c08e04e99922e109)    
Merge: 14aadcf 939514d  
Merge pull request #7 from kentcdodds/patch-1
* **example:** Add require for parser | [939514dc2890b60f1a0d3c6b97113f8e82e9cdd1](https://github.com/mmpro/ac-api-server/commit/939514dc2890b60f1a0d3c6b97113f8e82e9cdd1)    
So people aren't confused when copy/pasting from the docs :-)
undefined