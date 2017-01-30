import "phoenix_html"
import "bootstrap"
// include all svg files in icons directory in the body of the document
var files = require.context('../icons', false, /.svg$/);
files.keys().forEach(files);

// consider configuring webpack to expose this instead of using window
import open_login_dropdown from './utilities/login_dropdown';
//open_login_dropdown();
window.open_login_dropdown = open_login_dropdown
