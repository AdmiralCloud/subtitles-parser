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