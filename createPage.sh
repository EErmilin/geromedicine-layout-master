#!/bin/bash

# THIS SCTIPT MAKES 'PAGENAME'.PUG IN ./SRC/TEMPLATES AND 'PAGENAME'.SCSS IN ./SRC/STYLES/PAGES
# THEN ADD '@import 'pagename'.scss' to ./SRC/STYLES/PAGES/_INDEX.SCSS
# JUST USE ./createPage.sh 'PAGENAME' IN ROOT DIRECTORY


cd src && cd templates && touch "$1.pug" && cd .. && cd styles/pages && touch "$1.scss" && echo "@import \"$1.scss\";" >> _index.scss