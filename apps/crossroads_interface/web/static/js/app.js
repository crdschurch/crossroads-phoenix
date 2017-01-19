import "phoenix_html"

// include all svg files in icons directory in the body of the document
var files = require.context('../icons', false, /.svg$/);
files.keys().forEach(files);

import 'imgix.js'
