
lint-check:
	./node_modules/.bin/eslint "index.js"

lint-fix:
	./node_modules/.bin/eslint "index.js" --fix

commit:
	@node ./node_modules/ac-semantic-release/lib/commit.js

test-release:
	DEBUGMODE=true node ./node_modules/ac-semantic-release/lib/release.js

.PHONY: check